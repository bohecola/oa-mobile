<template>
  <van-form
    v-if="readonly"
    class="reset-label"
    label-width="auto"
    label-align="top"
    input-align="left"
    readonly
  >
    <van-cell-group inset class="!mt-3">
      <van-field :model-value="data?.id" label="流程ID" />

      <!-- 流程回显 -->
      <template v-if="!isNil(data?.initiator)">
        <van-field :model-value="data.initiator.nickName" label="发起人" />
        <DeptSelect :model-value="data.initiator.deptId" label="部门" />
        <van-field :model-value="parseTime(data.initiator.createTime, '{y}-{m}-{d}')" label="发起时间" />
      </template>

      <!-- 业务回显 -->
      <template v-else>
        <van-field :model-value="data?.createByName" label="发起人" />
        <van-field :model-value="data?.createDeptName" label="部门" />
        <van-field :model-value="parseTime(data?.createTime, '{y}-{m}-{d}')" label="发起时间" />
      </template>
    </van-cell-group>
  </van-form>

  <van-form
    v-else
    class="reset-label"
    label-width="auto"
    label-align="top"
    input-align="left"
  >
    <van-cell-group inset class="!mt-3">
      <van-field v-if="!isNil(data?.id)" label="流程ID" :model-value="data?.id" readonly />
      <van-field :model-value="data?.initiator?.nickName ?? data?.createByName ?? user.info.nickName" label="发起人" readonly />
      <DictSelect v-model="deptId" label="部门" :options="deptOptions" :readonly="deptReadonly" @change="onDeptChange" />
      <van-field :model-value="parseTime(data?.initiator?.createTime ?? data?.createTime ?? new Date(), '{y}-{m}-{d}')" label="发起时间" readonly />
    </van-cell-group>
  </van-form>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { isEmpty, isNil } from 'lodash-es'
import { getUserDept } from '@/api/system/dept'
import { useStore } from '@/store'

const props = defineProps<{
  data: any
  readonly: boolean
  resetForm?: () => void
}>()

const emit = defineEmits(['update:deptId'])

const { user } = useStore()

const { proxy } = getCurrentInstance() as ComponentInternalInstance

const deptId = ref<any>(undefined)

const deptOptions = ref<DictDataOption[]>([])

// 是否新增
const isAdd = computed(() => proxy.$route.query.type === 'add')

// 部门只读（发起人只存在于一个部门中）
const deptReadonly = computed(() => {
  if (isEmpty(deptOptions.value)) {
    return true
  }

  const [deptObj] = deptOptions.value
  const isOne = deptOptions.value.length === 1
  const isSame = deptObj?.value === String(user.info.deptId)

  return isOne && isSame
})

// 发起人信息
function createInitiator(): Initiator {
  const { data } = props

  const { userId, nickName, maxPostLevel } = user.info

  const createTime = dayjs().format('YYYY-MM-DD HH:mm:ss')

  if (!isNil(data?.initiator) && !isAdd.value) {
    return {
      ...data.initiator,
      // createTime,
    }
  }

  const initialValue = {
    deptId: deptId.value,
    deptName: deptOptions.value.find(e => e.value === deptId.value)?.label,
    userId,
    nickName,
    maxPostLevel,
    createTime,
  }

  return initialValue
}

// 部门切换
function onDeptChange(value?: any) {
  const { resetForm } = props

  emit('update:deptId', value)

  resetForm?.()
}

// 挂载
onMounted(async () => {
  const { data } = await getUserDept(user.info.userId)

  deptOptions.value = data.map(e => ({ label: e.deptName, value: String(e.deptId) }))

  if (isAdd.value) {
    deptId.value = String(user.info.deptId)
    emit('update:deptId', deptId.value)
  }
})

defineExpose({
  deptId,
  createInitiator,
})
</script>
