<template>
  <div class="w-full h-full flex items-center justify-center warp-background">
    <div v-if="currentStep === 'first'" class="-translate-y-24" :class="{ hidden: reLogin === 'true' }">
      <h1 class="text-center text-[42px] font-bold">
        <div class="w-full">
          <span class="text-[--van-primary-color]">招聘</span>
          <LineShadowText
            class="italic px-1"
            :shadow-color="app.currentColorMode === 'dark' ? 'white' : 'black'"
          >
            考试
          </LineShadowText>
        </div>
      </h1>
      <van-form
        ref="Form"
        label-width="auto"
        label-align="top"
        input-align="left"
        required="auto"
        class="py-4"
        scroll-to-error
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

        <div class="m-4 translate-y-2">
          <van-button
            type="primary"
            block
            round
            @click="onSubmit(currentStep)"
          >
            确定
          </van-button>
        </div>
      </van-form>
    </div>

    <div v-if="currentStep === 'second'" class="p-2 bg-[--bg-card] rounded">
      <div class="text-sm py-2 px-4 opacity-50">
        试卷列表
      </div>

      <div class="max-h-[50vh] overflow-y-auto">
        <van-cell
          v-for="item in iouList"
          :key="item.id"
          class="!w-[70vw]"
          title-class="!flex-[2]"
          value-class="!flex-[1]"
          is-link
          @click="handleClick(item)"
        >
          <template #title>
            <div class="text-base">
              {{ item.paperName }}
            </div>
          </template>

          <template v-if="!isNil(item.totalScore)" #label>
            <div class="flex items-baseline">
              <span class="text-xs">成绩</span>
              <span class="ml-1 italic font-bold text-base text-blue-500">{{ item.totalScore }}</span>
            </div>
          </template>

          <template #value>
            <span v-if="isNil(item.status)">未考试</span>
            <template v-else>
              <span v-if="item.status === '0'" class="text-[#409EFF]">考试中</span>
              <span v-if="item.status === '2'" class="text-[#67C23A]">已结束</span>
            </template>
          </template>
        </van-cell>
      </div>

      <div class="text-sm py-2 px-4 flex items-center justify-between">
        <div class="flex gap-2 italic opacity-50">
          <span>{{ iouList[0]?.userName }}</span>
          <span>{{ iouList[0]?.phonenumber }}</span>
        </div>

        <van-button type="primary" size="mini" class="w-12" round @click="handleBack">
          返回
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup lang='tsx'>
import { isEmpty, isNil } from 'lodash-es'
import type { FormInstance } from 'vant'
import type { LocationQueryValue } from 'vue-router'
import type { GetPaperIdParams, InterviewOrganizeUserVO } from '@/api/exam/interviewOrganizeUser/types'
import { getPaperId } from '@/api/exam/interviewOrganizeUser'
import { useStore } from '@/store'

type Step = 'first' | 'second' | 'done'

const { app } = useStore()

const { proxy } = getCurrentInstance() as ComponentInternalInstance
const { userName, phonenumber, reLogin } = proxy.$route.query as Record<string, LocationQueryValue>

const { msgError, confirm, loading, closeLoading } = proxy.$modal

const Form = ref<FormInstance>()

const form = reactive<GetPaperIdParams>({
  userName,
  phonenumber,
})

const currentStep = ref<Step>('first')
const iouList = ref<InterviewOrganizeUserVO[]>([])

function onSubmit(_: Step = 'first') {
  Form.value?.validate()
    .then(async () => {
      loading()
      const { data } = await getPaperId(form)
      closeLoading()

      if (isEmpty(data)) {
        return msgError('您暂未被邀请参加考试，请联系管理员')
      }

      iouList.value = data
      currentStep.value = 'second'
    })
    .catch((err) => {
      console.error(err)
    })
}

function renderPaperName(item: InterviewOrganizeUserVO) {
  let actionText: string

  if (isNil(item.status))
    actionText = '开始'
  if (item.status === '0')
    actionText = '继续'
  if (item.status === '2')
    actionText = '查看'

  return (
    <div>
      确定要
      <span>{actionText}</span>
      <span class="mx-1 text-[--van-primary-color]">
        { item.paperName }
      </span>
      考试吗？
    </div>
  )
}

function handleClick(item: InterviewOrganizeUserVO) {
  confirm(renderPaperName(item)).then(() => {
    proxy.$router.push({
      path: `/external-exam`,
      query: {
        paperId: item.paperId,
        iouId: item.id,
        userName: item.userName,
        phonenumber: item.phonenumber,
      },
    }).catch(() => {})
  })
}

function handleBack() {
  proxy.$router.replace('/wechat-exam-entry').then(() => {
    location.reload()
  })
}

onMounted(() => {
  if (reLogin === 'true') {
    if (isNil(userName) && isNil(phonenumber))
      return

    onSubmit()
  }
})
</script>
