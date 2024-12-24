<template>
  <van-field v-show-field="['bb_userId', includeFields]" name="bb_userId" label="调薪人员" input-align="right">
    <template #input>
      <UserSelect v-model="form.bb_userId" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['customizeApprover', includeFields]" name="customizeApprover" label="审核人" input-align="right">
    <template #input>
      <UserSelect v-model="form.customizeApprover" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['bb_effectiveDate', includeFields]" name="bb_effectiveDate" label="调薪生效日期" input-align="right">
    <template #input>
      {{ parseTime(form.bb_effectiveDate, '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <van-field v-show-field="['bb_changeSalaryAfter', includeFields]" name="bb_changeSalaryAfter" label="调薪后基本工资" input-align="right">
    <template #input>
      {{ form.bb_changeSalaryAfter }}
      <span v-if="!isNil(form.bb_changeSalaryAfter)" class="ml-3 text-red-400 ">{{ toCnMoney(form.bb_changeSalaryAfter) }}</span>
    </template>
  </van-field>

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import BaseDetail from '../../../../components/BaseDetail.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['customizeApprover', 'bb_userId', 'bb_effectiveDate', 'bb_changeSalaryAfter', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()
</script>
