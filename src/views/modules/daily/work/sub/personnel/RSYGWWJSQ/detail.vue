<template>
  <!-- <el-row :gutter="20">
    <el-col v-show-field="['n_userId', includeFields]" :span="24">
      <el-form-item prop="n_userId" label="申请人">
        <UserSelectPro v-model="form.n_userId" :multiple="false" readonly />
      </el-form-item>
    </el-col>
  </el-row> -->

  <van-field v-show-field="['n_mounth', includeFields]" name="n_mounth" label="申请月份" input-align="left">
    <template #input>
      {{ parseTime(form.n_mounth, '{y}-{m}') }}
    </template>
  </van-field>

  <van-field v-show-field="['n_giftGoldCategory', includeFields]" name="n_giftGoldCategory" label="礼（慰问）金类别" input-align="left">
    <template #input>
      <DictSelect v-model="form.n_giftGoldCategory" dict-type="oa_daily_work_rsygwwjsq_gift_gold_category" multiple readonly />
    </template>
  </van-field>

  <van-field v-show-field="['n_amount', includeFields]" name="n_amount" label="本月礼（慰问）金合计" input-align="left">
    <template #input>
      {{ form.n_amount }}
      <span v-if="!isNil(form.n_amount)" class="ml-3 text-red-400">{{ toCnMoney(form.n_amount) }}</span>
    </template>
  </van-field>

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
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
