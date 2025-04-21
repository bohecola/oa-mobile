<template>
  <div>
    <div v-if="['effective', 'expired'].includes(paperStatus)">
      <h1 class="text-center text-2xl font-bold tracking-widest">
        {{ paper.paperName }}
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
          <div v-if="paperStatus === 'expired'" class="py-3 px-5 text-center text-xs opacity-50 flex flex-col gap-2">
            <div>试卷有效时间</div>
            <div>{{ `${paper.startTime} ~ ${paper.endTime}` }}</div>
          </div>

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
            @click="onSubmit"
          >
            {{ paperStatus === 'effective' ? '确定' : '查询考试成绩' }}
          </van-button>
        </div>
      </van-form>
    </div>

    <div v-else-if="['notEffective'].includes(paperStatus)" class="bg-[--bg-card]">
      <van-cell-group :border="false">
        <div class="py-3 px-5 text-center text-xs opacity-50 flex flex-col gap-2">
          <div>当前考试暂未开始，请在试卷有效时间内参加考试</div>
          <div class="mt-3">
            试卷有效时间
          </div>
          <div>{{ `${paper.startTime} ~ ${paper.endTime}` }}</div>
        </div>
      </van-cell-group>
    </div>
  </div>
</template>

<script setup lang='ts'>
import type { FormInstance } from 'vant'
import type { PaperStatus } from '../helper'
import type { PaperVO } from '@/api/exam/paper/types'
import type { DoExamQrCodeParams } from '@/api/exam/exam/types'

defineProps<{
  paperStatus: PaperStatus
  paper?: PaperVO
}>()

const emit = defineEmits(['submit'])

const { proxy } = getCurrentInstance() as ComponentInternalInstance

const { paperId, iouId, userName, phonenumber } = proxy.$route.query

const Form = ref<FormInstance>()

const form = reactive<DoExamQrCodeParams>({
  paperId: paperId as string,
  iouId: iouId as string,
  userName: userName as string,
  phonenumber: phonenumber as string,
})

function onSubmit() {
  Form.value?.validate()
    .then(() => {
      emit('submit', form)
    })
    .catch((err) => {
      console.error(err)
    })
}

defineExpose({
  doManualLogin: onSubmit,
})
</script>
