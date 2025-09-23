<template>
  <div class="w-full">
    <DeptSelect
      v-if="visibleConfig.dept.value"
      v-model="deptVO.relIds"
      label="部门"
      name="relIds"
      multiple
      @change="handleChange"
    />

    <DictSelect
      v-if="visibleConfig.role.value"
      v-model="roleVO.relIds"
      label="角色"
      multiple
      :options="roleOptions"
      @change="handleChange"
    />

    <van-field
      v-if="visibleConfig.user.value"
      label="参与人员"
      :is-link="!readonly"
      @click="UserSelectRef?.open"
    >
      <template #input>
        <UserSelect
          ref="UserSelectRef"
          v-model="userVO.relIds"
          multiple
          :readonly="readonly"
          @confirm="handleChange"
        />
      </template>
    </van-field>
  </div>
</template>

<script setup lang="ts">
import { cloneDeep } from 'lodash-es'
import { listRole } from '@/api/system/role'
import UserSelect from '@/components/UserSelect/index.vue'
import type { AuthVO } from '@/api/system/objectAuth/types'

const props = withDefaults(
  defineProps<{
    modelValue: AuthVO[]
    readonly?: boolean
    visibleConfig?: VisibleConfig
  }>(),
  {
    visibleConfig: () => ({
      dept: { label: true, value: true },
      role: { label: true, value: true },
      user: { label: true, value: true },
    }),
  },
)

const emit = defineEmits(['update:modelValue', 'change'])

const UserSelectRef = ref<InstanceType<typeof UserSelect>>()

interface ItemVisibleConfig { label: boolean, value: boolean }

interface VisibleConfig {
  dept: ItemVisibleConfig
  role: ItemVisibleConfig
  user: ItemVisibleConfig
}

const defaultDeptVO = { relType: 'dept', relIds: undefined }
const defaultRoleVO = { relType: 'role', relIds: undefined }
const defaultUserVO = { relType: 'user', relIds: undefined }

const deptVO = ref<AuthVO>(cloneDeep(defaultDeptVO))
const roleVO = ref<AuthVO>(cloneDeep(defaultRoleVO))
const userVO = ref<AuthVO>(cloneDeep(defaultUserVO))

const roleOptions = ref<DictDataOption[]>([])

function handleChange() {
  const data = [deptVO.value, roleVO.value, userVO.value]
  emit('change', data)
  emit('update:modelValue', data)
}

// 回显
function handleView(data: AuthVO[]) {
  deptVO.value = data?.find(e => e.relType === 'dept') ?? cloneDeep(defaultDeptVO)
  roleVO.value = data?.find(e => e.relType === 'role') ?? cloneDeep(defaultRoleVO)
  userVO.value = data?.find(e => e.relType === 'user') ?? cloneDeep(defaultUserVO)
}

watch(
  () => props.modelValue,
  (value) => {
    handleView(value)
  },
)

onMounted(async () => {
  const { rows } = await listRole()
  roleOptions.value = rows.map(e => ({ label: e.roleName, value: e.roleId as string }))
})
</script>
