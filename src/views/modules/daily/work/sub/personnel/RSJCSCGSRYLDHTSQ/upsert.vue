<template>
  <van-field
    v-model="form.t_userId"
    v-show-field="['t_userId', includeFields]"
    label="被解除劳动合同员工"
    name="t_userId"
    is-link
    :rules="computedRules.t_userId"
    @click="UserSelectRef?.open"
  >
    <template #input>
      <UserSelect ref="UserSelectRef" v-model="form.t_userId" @confirm="onUserSelectValueChange" />
    </template>
  </van-field>

  <van-field v-show-field="['t_deptId', includeFields]" label="所在部门/项目部" name="t_deptId" :rules="computedRules.t_deptId">
    <template #input>
      <DeptSelect v-model="form.t_deptId" />
    </template>
  </van-field>

  <van-field v-show-field="['t_postIds', includeFields]" label="岗位" name="t_postIds" :rules="computedRules.t_postIds">
    <template #input>
      <PostSelect v-model="form.t_postIds" :dept-id="form.t_deptId" multiple />
    </template>
  </van-field>

  <van-field v-show-field="['t_isFormal', includeFields]" label="是否已转正" name="t_isFormal" :rules="computedRules.t_isFormal">
    <template #input>
      <YesNoSwitch v-model="form.t_isFormal" />
    </template>
  </van-field>

  <BaseUpsert :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseUpsert from '../../../../components/BaseUpsert.vue'
import UserSelect from '@/components/UserSelect/index.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import type { UserVO } from '@/api/system/user/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import PostSelect from '@/views/modules/personnel/components/PostSelect.vue'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['t_userId', 't_deptId', 't_isFormal', 't_postIds', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

const UserSelectRef = ref<InstanceType<typeof UserSelect> | null>()

const computedRules = inject<Ref<FormRules<DailyWorkForm>>>('computedRules')

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)

// 附件必选
const updateRuleRequired = inject<UpdateRuleRequiredFn>('updateRuleRequired')
updateRuleRequired('ossIdList', true)

function onUserSelectValueChange(val: UserVO) {
  form.value.needDepts = val?.deptId as string
  form.value.maxPostLevel = val?.maxPostLevel

  form.value.t_deptId = val?.deptId
  form.value.t_postIds = val?.postIdStr
  console.log(form.value.t_postIds, 'val')
  // TODO 是否已转正、选人之后未查到数据
}

//  TODO
// const msg = (
// <div>
//   <p>根据《劳动合同法》的规定可以合法解除的事由：</p>
//   <p>一、员工有下列情形之一的，公司可以解除劳动合同，无需支付任何补偿：</p>
//   <p>(一)在试用期间被证明不符合录用条件的；</p>
//   <p>(二)严重违反公司的规章制度的；</p>
//   <p>(三)严重失职，营私舞弊，给公司造成重大损害的；</p>
//   <p>(四)员工同时与其他公司建立劳动关系，对完成本单位的工作任务造成严重影响，或者经公司提出，拒不改正的；</p>
//   <p>(五)因以员工欺诈、胁迫的手段或者乘人之危，使公司在违背真实意思的情况下订立或者变更劳动合同，致使劳动合同无效的；</p>
//   <p>(六)被依法追究刑事责任的。</p>
//   <br />
//   <p>二、有下列情形之一的，公司提前三十日以书面形式通知员工本人或者额外支付员工一个月工资后，可以解除劳动合同，支付经济补偿：</p>
//   <p>(一)员工患病或者非因工负伤，在规定的医疗期满后不能从事原工作，也不能从事由公司另行安排的工作的；</p>
//   <p>(二)员工不能胜任工作，经过培训或者调整工作岗位，仍不能胜任工作的；</p>
//   <p>(三)劳动合同订立时所依据的客观情况发生重大变化，致使劳动合同无法履行，经公司与员工协商，未能就变更劳动合同内容达成协议的。</p>
//   <br />
//   <p>
//     三、因为依照企业破产法规定进行重整的；生产经营发生严重困难的；企业转产、重大技术革新或者经营方式调整，经变更劳动合同后，仍需裁减人员的；其他因劳动合同订立时所依据的客观经济情况发生重大变化，致使劳动合同无法履行的。
//   </p>
//   <p>公司需裁减部分人员的，提前三十日向工会或者全体职工说明情况，听取工会或者职工的意见后，裁减人员方案经向劳动行政部门报告，可以裁减人员。</p>
//   <br />
//   <p>四、其他法律法规规定可以解除的情形。</p>
// </div>
// )

// 风险提示
// function showMsg() {
//   ElMessageBox({
//     title: '风险提示',
//     message: msg,
//     customStyle: {
//       padding: '24px',
//       minWidth: '900px',
//     },
//   })
// }
</script>
