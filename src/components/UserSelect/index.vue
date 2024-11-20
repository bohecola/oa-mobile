<template>
  <van-skeleton v-if="!popupOnly" :loading="echoLoading" class="!p-0">
    <template #template>
      <div class="w-full h-[var(--van-cell-line-height)] flex items-center justify-end">
        <van-skeleton-paragraph />
      </div>
    </template>

    <!-- 回显列表 -->
    <div v-if="existSelectedList" class="flex flex-wrap justify-end gap-2">
      <van-tag
        v-for="selected in selectedList"
        :key="selected.userId"
        type="primary"
        size="large"
      >
        {{ selected.nickName }}
      </van-tag>
    </div>
    <span v-else class="text-[var(--van-field-placeholder-text-color)]">请选择</span>
  </van-skeleton>
  <!-- 弹窗 -->
  <van-popup
    v-model:show="visible"
    position="bottom"
    class="h-full w-full"
    teleport="body"
    safe-area-inset-bottom
    @closed="popupClosed"
  >
    <NavBar
      v-if="!isSearchFocused"
      title="选择联系人"
      :is-left-click-back="false"
      @click-left="close"
    />

    <div v-loading="listLoading">
      <!-- 搜索 注: form[action="/"] 作用：IOS 键盘显示搜索按钮 -->
      <form action="/">
        <van-search
          v-model="searchText"
          placeholder="搜索"
          :show-action="isSearchFocused"
          @focus="handleSearchFocus"
          @cancel="handleSearchCancel"
        />
      </form>
      <div v-show="!isSearchFocused" class="h-[calc(100vh-var(--van-nav-bar-height)-var(--van-search-input-height)-20px-theme(space.14)-env(safe-area-inset-bottom))] overflow-y-auto">
        <van-index-bar
          class="pb-28"
          :sticky="true"
          :index-list="indexList"
        >
          <template v-for="(list, key, index) in userListMap" :key="index">
            <van-index-anchor :index="key" />
            <UserCell
              v-for="user in list"
              :key="user.userId"
              :is-active="selectedIdList.includes(user.userId)"
              :user="user"
              @click="handleUserCellClick(user)"
            />
          </template>
        </van-index-bar>
      </div>
      <!-- 搜索列表 -->
      <div
        v-show="isSearchFocused"
        class="h-[calc(100vh-var(--van-search-input-height)-20px-theme(space.14)-env(safe-area-inset-bottom))] overflow-y-auto"
      >
        <div class="pb-28">
          <UserCell
            v-for="user in searchList"
            :key="user.userId"
            :is-active="selectedIdList.includes(user.userId)"
            :user="user"
            @click="handleUserCellClick(user)"
          />
        </div>
      </div>
    </div>

    <!-- 底部面板 -->
    <div class="px-3 flex flex-col justify-center w-full h-14 whitespace-nowrap border-t">
      <!-- 操作按钮 -->
      <div class="flex items-center justify-between gap-2">
        <span class="text-sm">
          已选择 {{ selectedNum }}
        </span>
        <div class="w-[70vw] overflow-x-auto flex gap-2">
          <van-tag
            v-for="selected in selectedList"
            :key="selected.userId"
            type="primary"
            size="medium"
            closeable
            @close="handleRemoveUser(selected)"
          >
            {{ selected.nickName }}
          </van-tag>
        </div>

        <van-button class="ml-2" type="primary" size="small" @click="confirm">
          确定
        </van-button>
      </div>
    </div>
  </van-popup>
</template>

<script setup lang='ts'>
import { cloneDeep, isArray, isEmpty, isNumber, isObject, isString } from 'lodash-es'
import UserCell from './user-cell.vue'
import type { SysUserMobileVO } from '@/api/system/user/types'
import { service } from '@/service'

type UserSelectValue = SysUserMobileVO['userId'] | SysUserMobileVO['userId'][]

const props = withDefaults(
  defineProps<{
    modelValue?: SysUserMobileVO['userId'] | SysUserMobileVO['userId'][] | SysUserMobileVO | SysUserMobileVO[]
    multiple?: boolean
    valueType?: 'value' | 'object'
    popupOnly?: boolean
    enableDataTransform?: boolean
  }>(),
  {
    multiple: false,
    popupOnly: false,
    valueType: 'value',
    enableDataTransform: true,
  },
)

const emit = defineEmits(['confirm', 'update:modelValue'])

const visible = ref(false)
const listLoading = ref(false)
const echoLoading = ref(false)

// 用户列表
const userListMap = ref<Record<string, SysUserMobileVO[]>>({})
const userList = computed(() => Object.values(userListMap.value).flat())

// 选择列表
const selectedList = ref<SysUserMobileVO[]>([])
const selectedIdList = computed(() => selectedList.value.map((e => e.userId)))
const selectedNum = computed(() => selectedList.value.length)
const existSelectedList = computed(() => selectedList.value.length > 0)

// 搜索
const searchText = ref('')
const isSearchFocused = ref(false)
const searchList = computed(() => {
  const hasSearchText = searchText.value !== ''

  if (hasSearchText) {
    return userList.value.filter(e => e.nickName?.includes(searchText.value) || e.pinyin?.includes(searchText.value.toLocaleLowerCase()))
  }

  return []
})

// 索引列表
const indexList = computed(() => Object.keys(userListMap.value))

// 打开
function open() {
  userListMap.value = {}
  visible.value = true
  getList()
}

// 关闭
async function close() {
  visible.value = false
  selectedList.value = await getSeletedList(props.modelValue)
}

// 弹窗关闭动画结束后
function popupClosed() {
  handleSearchCancel()
}

// 请求人员列表
async function getList() {
  try {
    listLoading.value = true
    const { data } = await service.system.user.getUserMobileList()
    userListMap.value = data
  }
  finally {
    listLoading.value = false
  }
}

// 选择
function handleUserCellClick(user: SysUserMobileVO) {
  const index = selectedIdList.value.findIndex(e => e === user.userId)
  const isSelected = index !== -1
  // 单选
  if (!props.multiple) {
    selectedList.value = isSelected ? [] : [user]
  }
  // 多选
  else {
    if (isSelected) {
      selectedList.value.splice(index, 1)
    }
    else {
      selectedList.value.push(user)
    }
  }
}

// 移除
function handleRemoveUser(user: SysUserMobileVO) {
  const index = selectedIdList.value.findIndex(e => e === user.userId)
  if (index > -1) {
    selectedList.value.splice(index, 1)
  }
}

// 确定
function confirm() {
  visible.value = false
  const values = getValues()
  const payload = props.enableDataTransform && props.valueType === 'value' ? serialize(values as UserSelectValue) : values
  emit('confirm', payload)
  emit('update:modelValue', payload)
}

function serialize(value: UserSelectValue) {
  if (!isEmpty(value) || isNumber(value)) {
    if (props.multiple) {
      return (value as (string | number)[]).join(',')
    }
    else {
      return value as string | number
    }
  }
  else {
    return undefined
  }
}

function deserialize(value: string | number) {
  if (value) {
    if (props.multiple) {
      // 兼容 id 为 100、101 这种 number 类型的情况
      return (value as string).split(',').map(e => (e.length < 19 ? Number(e) : e))
    }
    else {
      return value
    }
  }
  else {
    return undefined
  }
}

// 判断是否为字符串或数字类型数组
function isStringOrNumberArray(arr: any[]) {
  return arr.every(e => isString(e) || isNumber(e))
}

// 转换 modelValue 为 id 数组
function transformValue(value: typeof props.modelValue) {
  if (isEmpty(value)) {
    return []
  }

  if (isArray(value)) {
    if (isStringOrNumberArray(value)) {
      return value
    }
    else {
      return (value as SysUserMobileVO[]).map(e => e.userId)
    }
  }
  else {
    if (isObject(value)) {
      return [value.userId]
    }
    else {
      return [value]
    }
  }
}

// 根据类型获取选中值
function getValues() {
  const cloneList = cloneDeep(selectedList.value)
  // 单选
  if (!props.multiple) {
    const [item] = cloneList
    return props.valueType === 'value' ? item?.userId : item
  }
  // 多选
  else {
    return props.valueType === 'value' ? cloneList.map(e => e.userId) : cloneList
  }
}

// 搜索框 focus
function handleSearchFocus() {
  isSearchFocused.value = true
}

// 搜索框 cancel
function handleSearchCancel() {
  isSearchFocused.value = false
  searchText.value = ''
}

// 获取已选择的用户列表
async function getSeletedList(value: typeof props.modelValue) {
  // 绑定值转为 id 数组
  const ids = transformValue(value)

  // 查询列表过滤
  if (isEmpty(userList.value)) {
    echoLoading.value = true
    const { data } = await service.system.user
      .getUserMobileList({ userIds: ids.join(',') })
      .finally(() => echoLoading.value = false)
    return Object.values(data).flat().filter(e => ids.includes(e.userId))
  }
  // 已有列表过滤
  else {
    // 根据 id 数组计算已选择的列表
    return userList.value.filter(e => ids.includes(e.userId))
  }
}

// 回显
watch(
  () => props.modelValue,
  async (value) => {
    if (!isEmpty(value) || isNumber(value)) {
      selectedList.value = await getSeletedList(
        props.enableDataTransform && props.valueType === 'value'
          ? deserialize(value as (string | number))
          : value,
      )
    }
    else {
      selectedList.value = []
    }
  },
  {
    immediate: true,
  },
)

defineExpose({
  open,
})
</script>
