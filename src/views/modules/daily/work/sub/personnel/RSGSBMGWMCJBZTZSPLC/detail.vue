<template>
  <DictSelect
    v-model="form.w_changeType"
    v-show-field="['w_changeType', includeFields]"
    label="变更类型"
    name="w_changeType"
    :options="oa_post_change_type"
  />

  <van-field
    v-model.trim="form.w_postName"
    v-show-field="['w_postName', includeFields]"
    label="岗位名称"
    name="w_postName"
  />

  <van-field
    v-model="form.w_adjustedContent"
    v-show-field="['w_adjustedContent', includeFields]"
    label="调整内容"
    name="w_adjustedContent"
    type="textarea"
    rows="1"
    autosize
  >
    <template #label>
      <div class="flex items-baseline">
        <span>调整内容</span>
        <span v-if="form.w_changeType === '4'" class="text-xs text-red-400">
          （人员岗位变更释放已告知本人）
        </span>
      </div>
    </template>
  </van-field>

  <BaseDetail :include-fields="includeFields" :desc="desc" />
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import BaseDetail from '../../../../components/BaseDetail.vue'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'

withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['w_changeType', 'w_postName', 'w_adjustedContent', 'reason', 'ossIdList'],
  },
)

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance
// 字典
const { oa_post_change_type } = toRefs(proxy?.useDict('oa_post_change_type'))
// 表单
const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
// 附件描述
const desc = computed(() => {
  if (isNil(form.value.w_changeType)) {
    return undefined
  }
  const item = oa_post_change_type.value.find(item => item.value === form.value.w_changeType)
  return item?.remark
})
</script>
