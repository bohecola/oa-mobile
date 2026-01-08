<template>
  <DictSelect
    v-model="form.w_changeType"
    v-show-field="['w_changeType', includeFields]"
    label="变更类型"
    name="w_changeType"
    :rules="computedRules.w_changeType"
    :options="oa_post_change_type"
    @change="onChangeTypeChange"
  />

  <van-field
    v-if="showPostName"
    v-model.trim="form.w_postName"
    v-show-field="['w_postName', includeFields]"
    label="岗位名称"
    name="w_postName"
    :rules="computedRules.w_postName"
    placeholder="请输入"
  />

  <van-field
    v-if="showAdjustedContent"
    v-model="form.w_adjustedContent"
    v-show-field="['w_adjustedContent', includeFields]"
    label="调整内容"
    name="w_adjustedContent"
    placeholder="请输入"
    type="textarea"
    rows="1"
    :rules="computedRules.w_adjustedContent"
    autosize
  >
    <template #label>
      <div class="flex items-baseline">
        <span>调整内容</span>
        <span v-if="form.w_changeType === '4'" class="text-xs text-red-400">
          （人员岗位变更需已告知本人）
        </span>
      </div>
    </template>
  </van-field>

  <BaseUpsert :include-fields="includeFields" :desc="desc" />
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import BaseUpsert from '../../../../components/BaseUpsert.vue'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'

const props = withDefaults(
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
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()
// 校验规则
const computedRules = inject<Ref<FormRules<DailyWorkForm>>>('computedRules')
// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)
// 附件必选
const updateRuleRequired = inject<UpdateRuleRequiredFn>('updateRuleRequired')

// 变更类型 => 展示调整内容枚举
const changeTypeAdjustedContentEnum = ['2', '3', '4', '5']
// 变更类型 => 校验附件枚举
const changeTypeOssEnum = ['1', '3', '4', '5']

// 展示新增岗位名称
const showPostName = computed(() => form.value.w_changeType === '1')
// 展示调整内容
const showAdjustedContent = computed(() => changeTypeAdjustedContentEnum.includes(form.value.w_changeType))
// 附件描述
const desc = computed(() => {
  if (isNil(form.value.w_changeType)) {
    return undefined
  }
  const item = oa_post_change_type.value.find(item => item.value === form.value.w_changeType)
  return item?.remark
})

// 变更类型切换
function onChangeTypeChange(value: string) {
  // 新增岗位名称校验
  updateRuleRequired('w_postName', value === '1')
  // 调整内容校验
  updateRuleRequired('w_adjustedContent', changeTypeAdjustedContentEnum.includes(value))
  // 附件校验
  updateRuleRequired('ossIdList', changeTypeOssEnum.includes(value))
  // 重置字段
  if (value === '1') {
    form.value.w_adjustedContent = undefined
  }
  else {
    form.value.w_postName = undefined
  }
}
</script>
