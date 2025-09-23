<template>
  <div>
    <NavBar />

    <div class="py-2 scroll-container-middle">
      <van-form
        ref="Form"
        v-loading="isLoading"
        label-width="auto"
        label-align="top"
        input-align="left"
        required="auto"
        scroll-to-error
      >
        <van-cell-group inset>
          <van-field
            v-model.trim="form.title"
            label="标题"
            name="title"
            placeholder="请输入标题"
            :rules="rules.title"
          />

          <van-field
            v-model="form.content"
            label="内容"
            name="content"
            type="textarea"
            placeholder="请输入内容"
            :rules="rules.content"
            rows="1"
            autosize
          />

          <DateSelect
            v-model="form.startDate"
            label="开始日期"
            name="startDate"
            :rules="rules.startDate"
            clearable
          />

          <DateSelect
            v-model="form.endDate"
            label="完成日期"
            name="endDate"
            :rules="rules.endDate"
            clearable
          />

          <AuthSelect
            v-model="form.authList"
            :visible-config="{
              dept: { label: false, value: false },
              role: { label: false, value: false },
              user: { label: false, value: true },
            }"
          />
        </van-cell-group>
      </van-form>
    </div>

    <div class="op-bottom-base">
      <van-button
        v-if="['0'].includes(form?.status) || isNil(form.status)"
        class="flex-[1]"
        :disabled="isLoading"
        @click="handleSubmit('draft')"
      >
        保存
      </van-button>

      <van-button
        type="primary"
        class="flex-[4]"
        :disabled="isLoading"
        @click="handleSubmit('publish')"
      >
        {{ ['1', '3'].includes(form?.status) ? '确定' : '发布' }}
      </van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import AuthSelect from './components/AuthSelect.vue'
import { useForm } from './form'
import { useFormHelper } from '@/hooks'
import { useStore } from '@/store'

const { isAdd, isEdit } = useFormHelper()

const { user } = useStore()

const { Form, form, rules, isLoading, setDraft, setPublish, submit, view } = useForm()

function handleSubmit(type: 'draft' | 'publish') {
  switch (type) {
    case 'draft':
      setDraft()
      break
    case 'publish':
      setPublish()
      break
  }

  submit()
}

onMounted(() => {
  // 新增
  if (isAdd) {
    form.value.authList = [{ relIds: String(user.info.userId), relType: 'user' }]
  }

  // 编辑
  if (isEdit) {
    const { id } = useRoute().params

    view(id as string)
  }
})
</script>
