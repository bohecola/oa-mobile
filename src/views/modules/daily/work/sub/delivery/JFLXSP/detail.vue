<template>
  <ProjectSelect
    v-model="form.ww_projectId"
    v-model:contract-no-str="form.ww_contractNo"
    v-show-field="['ww_projectId', includeFields]"
    name="ww_projectId"
    label="项目"
  />

  <van-field
    v-model="form.ww_contractNo"
    v-show-field="['ww_contractNo', includeFields]"
    name="ww_contractNo"
    label="合同编号"
  />

  <BaseDetail :include-fields="includeFields" />

  <van-field v-show-field="['ww_fileMap', includeFields]" label="附件列表">
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
            <UploadFile v-model="item.ossIdList" value-type="array" readonly />
          </template>
        </van-field>
      </div>
    </template>
  </van-field>
</template>

<script setup lang="ts">
import BaseDetail from '../../../../components/BaseDetail.vue'
import { useFileMapHelper } from './helper'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import ProjectSelect from '@/views/modules/business/components/ProjectSelect.vue'

withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['ww_projectId', 'ww_contractNo', 'ww_fileMap', 'reason'],
  },
)

// 文件列表
const { fileList, fileDictLoading, file_dict, viewFileList } = useFileMapHelper({ dictType: 'oa_daily_work_jflxsp_files' })

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)

onMounted(() => {
  // 回显附件列表
  viewFileList(form.value.ww_fileMap)
})
</script>
