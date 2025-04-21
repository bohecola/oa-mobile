<template>
  <WarpBackground class="w-full h-full flex items-center justify-center warp-background">
    <h1 class="text-center text-2xl font-bold">
      招聘考试
    </h1>

    <van-form
      ref="Form"
      label-width="auto"
      label-align="top"
      input-align="left"
      required="auto"
      scroll-to-error
      class="py-4"
    >
      <van-cell-group inset>
        <van-field
          v-model.trim="form.userName"
          name="userName"
          label="姓名"
          placeholder="请输入"
          :rules="[
            { required: true, message: '请输入姓名', trigger: 'onBlur' },
          ]"
        />

        <van-field
          v-model.trim="form.phonenumber"
          name="phonenumber"
          label="手机号"
          placeholder="请输入"
          type="tel"
          :rules="[
            { required: true, message: '请输入手机号', trigger: 'onBlur' },
            { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'onBlur' },
          ]"
        />
      </van-cell-group>

      <div class="m-4">
        <van-button
          type="primary"
          block
          :loading="loading"
          @click="onSubmit"
        >
          确定
        </van-button>
      </div>
    </van-form>
  </WarpBackground>
</template>

<script setup lang='ts'>
import { isNil } from 'lodash-es'
import type { FormInstance } from 'vant'
import type { GetPaperIdParams } from '@/api/exam/interviewOrganizeUser/types'
import { getPaperId } from '@/api/exam/interviewOrganizeUser'

const { proxy } = getCurrentInstance() as ComponentInternalInstance
const { msgWarning } = proxy.$modal

const loading = ref(false)

const Form = ref<FormInstance>()

const form = reactive<GetPaperIdParams>({
  userName: undefined,
  phonenumber: undefined,
})

function onSubmit() {
  Form.value?.validate()
    .then(async () => {
      loading.value = true
      const { data } = await getPaperId(form)
      loading.value = false

      if (isNil(data))
        return msgWarning('您暂未被邀请参加考试，请联系管理员')

      proxy.$router.push({
        path: `/external-exam`,
        query: {
          paperId: data.paperId,
          iouId: data.id,
          userName: data.userName,
          phonenumber: data.phonenumber,
        },
      })
    })
    .catch((err) => {
      console.error(err)
    })
}
</script>
