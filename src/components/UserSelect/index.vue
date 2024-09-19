<template>
  <van-popup
    v-model:show="visible"
    position="bottom"
    class="h-full"
    closeable
    teleport="body"
  >
    <div v-loading="loading">
      <van-index-bar
        class="index-bar"
        :sticky="true"
        :index-list="indexList"
      >
        <template v-for="(list, key, index) in userListMap" :key="index">
          <van-index-anchor :index="key.toLocaleUpperCase()" />
          <van-cell
            v-for="user in list"
            :key="user.userId"
            :class="[{ '!bg-[var(--van-primary-color)]': selectedIdList.includes(user.userId) }]"
            title-class="w-full"
            @click="handleUserClick(user)"
          >
            <template #title>
              <div :class="`flex items-center ${selectedIdList.includes(user.userId) ? 'text-white' : ''}`">
                <span class="w-[12ch] truncate">
                  {{ user.nickName }}
                </span>
                <span class="text-xs opacity-60 truncate">{{ user.deptName }}</span>
              </div>
            </template>
          </van-cell>
        </template>
      </van-index-bar>
      <bottom-line v-if="!loading" />
      <!-- 底部面板高度占位元素 -->
      <div
        :style="{
          height: `${BottomSelectPanelHeight}px`,
        }"
      />
    </div>
    <!-- 底部选择面板 -->
    <div ref="BottomSelectPanel" class="fixed bottom-0 w-full min-h-10 bg-[--bg-secondary-color] z-10">
      <div class="p-3 flex flex-col gap-2">
        <div v-if="multiple" class="text-sm">
          已选择 {{ selectedNum }} 人
        </div>
        <div v-if="hasSelected" class="flex gap-2 flex-wrap">
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
        <div class="flex justify-end gap-2">
          <van-button
            class="w-20"
            type="default"
            size="small"
            round
            @click="visible = false"
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
    </div>
  </van-popup>
</template>

<script setup lang='ts'>
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

// 索引列表
const indexList = computed(() => Object.keys(userListMap.value).map(e => e.toLocaleUpperCase()))

// 打开
function open() {
  userListMap.value = {}
  visible.value = true
  getList()
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
function handleUserClick(user: SysUserMobileVO) {
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
  const payload = getValuesByType()
  emit('confirm', payload)
  emit('update:modelValue', payload)
}

// 获取选中值
function getValues() {
  // 单选
  if (!props.multiple) {
    return selectedList.value[0]
  }
  // 多选
  else {
    return selectedList.value
  }
}

// 根据类型获取选中值
function getValuesByType() {
  const values = getValues()
  // 返回选中 value | value[]
  if (props.valueType === 'value') {
    // 单选
    if (!props.multiple) {
      return (values as SysUserMobileVO).userId
    }
    // 多选
    else {
      return (values as SysUserMobileVO[]).map(e => e.userId)
    }
  }
  // 返回选中 object | object[]
  return values
}

// 单选回显数据查询
function findUser(value: SysUserMobileVO['userId'] | SysUserMobileVO) {
  if (props.valueType === 'value') {
    return userList.value.find(e => e.userId === value)
  }
  return userList.value.find(e => e.userId === (value as SysUserMobileVO).userId)
}

// 多选回显数据查询
function filterUsers(values: SysUserMobileVO['userId'][] | SysUserMobileVO[]) {
  if (props.valueType === 'value') {
    return userList.value.filter(e => (values as SysUserMobileVO['userId'][]).includes(e.userId))
  }
  return userList.value.filter(e => (values as SysUserMobileVO[]).map(e => e.userId).includes(e.userId))
}

// 回显
watch(
  [() => props.modelValue, userList],
  ([value]) => {
    console.log(value, 'user-select:watch')
    // 单选
    if (!props.multiple) {
      const user = findUser(value)
      selectedList.value = user ? [user] : []
    }
    // 多选
    else {
      selectedList.value = filterUsers(value as SysUserMobileVO['userId'][] | SysUserMobileVO[])
    }

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
