<template>
  <div>
    <!-- TODO 未打开 Popup 时，数据回显、挂载时请求数据、注意重复请求 -->
    <div class="flex flex-wrap justify-end gap-2">
      <van-tag
        v-for="selected in selectedList"
        :key="selected.userId"
        type="primary"
        size="large"
      >
        {{ selected.nickName }}
      </van-tag>
    </div>
    <van-popup
      v-model:show="visible"
      position="bottom"
      class="h-full"
      teleport="body"
      @closed="popupClosed"
    >
      <!-- class="h-[calc(100vh-var(--van-nav-bar-height))] overflow-y-auto" -->
      <!-- <NavBar
          title="选择联系人"
          :fixed="true"
          :is-left-click-back="false"
          @click-left="close"
        /> -->
      <!-- :sticky-offset-top="46" -->
      <div v-loading="loading" class="">
        <!-- 搜索 -->
        <van-search
          v-model="searchText"
          placeholder="搜索"
          :show-action="isSearchFocused"
          @focus="handleSearchFocus"
          @cancel="handleSearchCancel"
        />
        <!-- 索引栏 -->
        <div v-show="!isSearchFocused">
          <van-index-bar
            class="index-bar"
            :sticky="true"
            :index-list="indexList"
          >
            <template v-for="(list, key, index) in userListMap" :key="index">
              <van-index-anchor :index="key.toLocaleUpperCase()" />
              <UserCell
                v-for="user in list"
                :key="user.userId"
                :is-active="selectedIdList.includes(user.userId)"
                :user="user"
                @click="handleUserCellClick(user)"
              />
            </template>
          </van-index-bar>
          <!-- 底线 -->
          <bottom-line v-if="!loading" />
          <!-- 底部面板占位元素 -->
          <div
            :style="{
              height: `${BottomSelectPanelHeight}px`,
            }"
          />
        </div>
        <!-- 搜索列表 -->
        <div v-show="isSearchFocused" class="h-[calc(100vh-var(--van-search-input-height)-20px-128px)] pb-10 overflow-y-auto">
          <UserCell
            v-for="user in searchList"
            :key="user.userId"
            :is-active="selectedIdList.includes(user.userId)"
            :user="user"
            @click="handleUserCellClick(user)"
          />
        </div>
      </div>

      <!-- 底部选择面板 -->
      <div ref="BottomSelectPanel" class="w-full h-32 bg-[--bg-secondary-color] p-3 flex flex-col justify-between gap-2">
        <div v-if="multiple" class="text-sm">
          已选择 {{ selectedNum }} 人
        </div>
        <div v-if="hasSelected" class="flex gap-2 flex-wrap overflow-y-auto">
          <van-tag
            v-for="selected in selectedList"
            :key="selected.userId"
            type="primary"
            size="large"
            closeable
            @close="handleRemoveUser(selected)"
          >
            {{ selected.nickName }}
          </van-tag>
        </div>
        <!-- 操作按钮 -->
        <div class="flex justify-end gap-2">
          <van-button
            class="w-20"
            type="default"
            size="small"
            round
            @click="close"
          >
            取消
          </van-button>
          <van-button
            class="w-20"
            type="success"
            size="small"
            round
            @click="confirm"
          >
            确定
          </van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang='ts'>
import { cloneDeep, isArray, isNumber, isObject, isString } from 'lodash-es'
import UserCell from './cell.vue'
import type { SysUserMobileVO } from '@/api/system/user/types'
import { service } from '@/service'

const props = withDefaults(
  defineProps<{
    modelValue?: SysUserMobileVO['userId'] | SysUserMobileVO['userId'][] | SysUserMobileVO | SysUserMobileVO[]
    multiple?: boolean
    valueType?: 'value' | 'object'
  }>(),
  {
    multiple: false,
    valueType: 'value',
  },
)

const emit = defineEmits(['confirm', 'update:modelValue'])

const BottomSelectPanel = ref<HTMLDivElement>()
const BottomSelectPanelHeight = ref(0)

const visible = ref(false)
const loading = ref(false)
const userListMap = ref<Record<string, SysUserMobileVO[]>>({})

// 选择列表
const selectedList = ref<SysUserMobileVO[]>([])
const selectedIdList = computed(() => selectedList.value.map((e => e.userId)))
const selectedNum = computed(() => selectedList.value.length)
const hasSelected = computed(() => selectedList.value.length > 0)
const userList = computed(() => Object.values(userListMap.value).flat())

// 搜索
const searchText = ref('')
const isSearchFocused = ref(false)
const searchList = computed(() => {
  const hasSearchText = searchText.value !== ''

  if (hasSearchText) {
    return userList.value.filter(e => e.nickName?.includes(searchText.value))
  }

  return []
})

// 索引列表
const indexList = computed(() => Object.keys(userListMap.value).map(e => e.toLocaleUpperCase()))

// 打开
function open() {
  userListMap.value = {}
  visible.value = true
  getList()
}

// 关闭
function close() {
  visible.value = false
}

// 弹窗关闭动画结束后
function popupClosed() {
  searchText.value = ''
}

// 请求人员列表
async function getList() {
  try {
    loading.value = true
    const { data } = await service.system.user.getUserMobileList()
    userListMap.value = data
  }
  finally {
    loading.value = false
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
  const payload = getValues()
  emit('confirm', payload)
  emit('update:modelValue', payload)
}

// 判断是否为字符串或数字类型数组
function isStringOrNumberArray(arr: any[]) {
  return arr.every(e => isString(e) || isNumber(e))
}

// 转换 modelValue 为 id 数组
function transformValue(value: typeof props.modelValue) {
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
    return props.valueType === 'value' ? item.userId : item
  }
  // 多选
  else {
    return props.valueType === 'value' ? cloneList.map(e => e.userId) : cloneList
  }
}

function handleSearchFocus() {
  isSearchFocused.value = true
}

function handleSearchCancel() {
  isSearchFocused.value = false
  searchText.value = ''
}

// 回显
watch(
  [() => props.modelValue, userList],
  ([value]) => {
    console.log(value, 'user-select:watch')

    // 绑定值转为 id 数组
    const ids = transformValue(value)

    // 根据 id 数组计算已选择的列表
    selectedList.value = userList.value.filter(e => ids.includes(e.userId))

    // 设置底部选择面板占位元素的高度
    nextTick(() => {
      BottomSelectPanelHeight.value = BottomSelectPanel.value?.getBoundingClientRect().height ?? 0
    })
  },
)

defineExpose({
  open,
})
</script>

<style lang="css">
.safe {
  --safe-area-inset-bottom: env(safe-area-inset-bottom);
  padding-bottom: var(--safe-area-inset-bottom)
}
</style>
