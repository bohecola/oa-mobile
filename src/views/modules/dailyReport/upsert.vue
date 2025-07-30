<template>
  <div>
    <NavBar />
    <div class="py-2 content overflow-y-auto">
      <van-form
        ref="Form"
        v-loading="loading"
        label-width="auto"
        label-align="top"
        input-align="left"
        required="auto"
        scroll-to-error
      >
        <van-cell-group inset>
          <DictSelect
            v-model="form.deptId"
            label="项目部"
            name="deptId"
            :options="deptList"
            :rules="rules.deptId"
            @change="onDeptChange"
          />

          <DateSelect
            v-model="form.operateDate"
            label="日期"
            name="operateDate"
            :rules="rules.operateDate"
            clearable
          />

          <template v-for="item in form.recordResultList" :key="item.itemId">
            <!-- 文本 -->
            <van-field
              v-if="item.dataType === '0'"
              v-model="item.result"
              type="textarea"
              name="result"
              :label="item.description"
              :rows="1"
              :rules="getItemRules(item)"
              placeholder="请输入"
              autosize
              clearable
            />

            <!-- 数值 -->
            <van-field-number
              v-if="item.dataType === '1'"
              v-model="item.result"
              name="result"
              :label="item.description"
              :rules="getItemRules(item)"
              clearable
            />

            <!-- 勾选 -->
            <van-field
              v-if="item.dataType === '2'"
              name="result"
              :label="item.description"
              :rules="getItemRules(item)"
            >
              <template #input>
                <van-switch
                  v-model="item.result"
                  active-value="是"
                  inactive-value="否"
                />
              </template>
            </van-field>

            <!-- 下拉 -->
            <DictSelect
              v-if="item.dataType === '3'"
              v-model="item.result"
              name="result"
              :label="item.description"
              :rules="getItemRules(item)"
              :options="transformOptions(item.remark)"
              clearable
            />

            <!-- 文件 -->
            <van-field
              v-if="item.dataType === '5'"
              name="result"
              :label="item.description"
              :rules="getItemRules(item)"
            >
              <template #input>
                <UploadFile
                  v-model="item.result"
                  is-multiple
                />
              </template>
            </van-field>

            <!-- 日期 -->
            <DateSelect
              v-if="item.dataType === '7'"
              v-model="item.result"
              name="result"
              :label="item.description"
              :rules="getItemRules(item)"
              clearable
            />

            <!-- 拍摄 -->
            <van-field
              v-if="item.capture === 'Y'"
              name="result"
              :rules="getItemRules(item)"
            >
              <template #input>
                <UploadFile
                  v-model="item.files"
                  is-multiple
                />
              </template>
            </van-field>
          </template>
        </van-cell-group>
      </van-form>

      <BottomLine />
    </div>

    <div class="p-2 pb-safe-offset-2 w-full flex gap-2 bg-[--bg-card]">
      <van-button type="default" class="flex-[1]" @click="handleSave">
        保存
      </van-button>
      <van-button type="primary" class="flex-[4]" @click="handleSubmit">
        提交
      </van-button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import type { RouteParamValue } from 'vue-router'
import dayjs from 'dayjs'
import { useForm } from './form'

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 参数
const { id } = proxy.$route.params as Record<string, RouteParamValue>

// 表单
const { isEdit, Form, form, rules, formList, deptList, loading, transformOptions, getItemRules, getForms, setCurrentForm, submit, view } = useForm()

// 切换
function onDeptChange(value: string) {
  // 目标表单
  const target = formList.value.find(e => e.deptId === value)
  // 设置表单
  setCurrentForm(target)
}

// 保存按钮点击
function handleSave() {
  form.value.status = '0'
  submit()
}

// 提交按钮点击
function handleSubmit() {
  form.value.status = '1'
  submit()
}

// 挂载
onMounted(async () => {
  // 拉取表单集合
  await getForms()

  // 编辑
  if (isEdit) {
    // 回显
    await view(id)
  }
  // 新增
  else {
    // 取第一条数据
    const [first] = formList.value

    // 作为默认数据
    setCurrentForm(first)

    // 设置开始时间
    form.value.starttime = dayjs().format('YYYY-MM-DD HH:mm:ss')
  }
})
</script>

<style lang="scss" scoped>
$topHeight: calc(var(--van-nav-bar-height) + env(safe-area-inset-top));
$bottomHeight: calc(var(--van-button-default-height) + env(safe-area-inset-bottom) + theme('spacing.2') * 2);

.content {
  height: calc(100vh - $topHeight - $bottomHeight);
}
</style>
