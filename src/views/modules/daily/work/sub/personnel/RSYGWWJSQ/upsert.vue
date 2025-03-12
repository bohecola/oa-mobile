<template>
  <!-- <el-row :gutter="20">
      <el-col v-show-field="['n_userId', includeFields]" :span="24">
        <el-form-item prop="n_userId" label="申请人">
          <UserSelectPro v-model="form.n_userId" :multiple="false"  />
        </el-form-item>
      </el-col>
    </el-row> -->

  <DatePicker v-model="form.n_mounth" v-show-field="['n_mounth', includeFields]" name="n_mounth" label="申请月份" :columns-type="['year', 'month']" />

  <van-field v-show-field="['n_giftGoldCategory', includeFields]" name="n_giftGoldCategory" label="礼（慰问）金类别" input-align="left">
    <template #input>
      <DictSelect v-model="form.n_giftGoldCategory" dict-type="oa_daily_work_rsygwwjsq_gift_gold_category" multiple />
    </template>
  </van-field>

  <van-field-number
    v-model.number="form.n_amount"
    v-show-field="['n_amount', includeFields]"
    label="本月礼（慰问）金合计"
    name="n_amount"
    :rules="[{ required: true, message: '不能为空', trigger: 'onBlur' }]"
    clearable
  />

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import BaseDetail from '../../../../components/BaseDetail.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['n_userId', 'n_mounth', 'n_giftGoldCategory', 'n_amount', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)
</script>
