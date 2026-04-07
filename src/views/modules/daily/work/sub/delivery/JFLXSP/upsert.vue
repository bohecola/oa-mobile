<template>
  <ProjectSelect
    v-model="form.ww_projectId"
    v-model:contract-no-str="form.ww_contractNo"
    v-show-field="['ww_projectId', includeFields]"
    name="ww_projectId"
    label="项目"
    :rules="computedRules.ww_projectId"
    :params="{
      businessType: '1,2',
    }"
    clearable
  />

  <van-field
    v-model="form.ww_contractNo"
    v-show-field="['ww_contractNo', includeFields]"
    name="ww_contractNo"
    label="合同编号"
  />

  <BaseUpsert :include-fields="includeFields" />

  <van-field v-show-field="['ww_fileMap', includeFields]" label="附件列表" required>
    <template #input>
      <div v-loading="fileDictLoading" class="w-full">
        <van-field
          v-for="item in fileList"
          :key="item.dictValue"
        >
          <template #label>
            <DictTag :value="item.dictValue" :options="file_dict" />
          </template>
          <template #input>
            <UploadFile v-model="item.ossIdList" value-type="array" />
          </template>
        </van-field>
      </div>
    </template>
  </van-field>
</template>

<script setup lang="ts">
import BaseUpsert from '../../../../components/BaseUpsert.vue'
import { useFileMapHelper } from './helper'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import ProjectSelect from '@/views/modules/business/components/ProjectSelect.vue'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['ww_projectId', 'ww_contractNo', 'ww_fileMap', 'reason'],
  },
)

// 文件列表
const { fileList, fileDictLoading, file_dict, viewFileList, transformFileListToMap } = useFileMapHelper({ dictType: 'oa_daily_work_jflxsp_files' })

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)

// 表单
const form = inject<Ref<DailyWorkForm>>('form')
// 校验
const computedRules = inject<Ref<FormRules<DailyWorkForm>>>('computedRules')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

watch(
  fileList,
  (value) => {
    form.value.ww_fileMap = transformFileListToMap(value)
  },
  { deep: true },
)

onMounted(() => {
  // 回显附件列表
  viewFileList(form.value.ww_fileMap)
})
</script>
