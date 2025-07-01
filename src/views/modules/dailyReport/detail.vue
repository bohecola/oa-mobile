<template>
  <div>
    <NavBar />
    <div class="py-2 content overflow-y-auto">
      <van-form
        ref="Form"
        v-loading="loading"
        class="reset-label"
        label-width="auto"
        label-align="top"
        input-align="left"
        readonly
      >
        <van-cell-group inset>
          <DictSelect
            v-model="form.deptId"
            label="项目部"
            name="deptId"
            :options="deptList"
          />

          <DateSelect
            v-model="form.operateDate"
            label="日期"
            name="operateDate"
          />

          <template v-for="item in form.recordResultList" :key="item.itemId">
            <!-- 文本 -->
            <van-field
              v-if="item.dataType === '0'"
              v-model="item.result"
              type="textarea"
              name="result"
              placeholder="请输入"
              :label="item.description"
              :rows="1"
              autosize
            />

            <!-- 数值 -->
            <van-field-number
              v-if="item.dataType === '1'"
              v-model="item.result"
              name="result"
              :label="item.description"
            />

            <!-- 勾选 -->
            <van-field
              v-if="item.dataType === '2'"
              name="result"
              :label="item.description"
            >
              <template #input>
                <van-switch
                  v-model="item.result"
                  active-value="是"
                  inactive-value="否"
                  disabled
                />
              </template>
            </van-field>

            <!-- 下拉 -->
            <DictSelect
              v-if="item.dataType === '3'"
              v-model="item.result"
              name="result"
              :label="item.description"
              :options="transformOptions(item.remark)"
            />

            <!-- 文件 -->
            <van-field
              v-if="item.dataType === '5'"
              name="result"
              :label="item.description"
            >
              <template #input>
                <UploadFile
                  v-model="item.result"
                  is-multiple
                  readonly
                />
              </template>
            </van-field>

            <!-- 日期 -->
            <DateSelect
              v-if="item.dataType === '7'"
              v-model="item.result"
              name="result"
              :label="item.description"
            />

            <!-- 拍摄 -->
            <van-field
              v-if="item.capture === 'Y'"
              name="result"
            >
              <template #input>
                <UploadFile
                  v-model="item.files"
                  is-multiple
                  readonly
                />
              </template>
            </van-field>
          </template>
        </van-cell-group>
      </van-form>

      <BottomLine />
    </div>
  </div>
</template>

<script setup lang='ts'>
import type { RouteParamValue } from 'vue-router'
import { useForm } from './form'

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 参数
const { id } = proxy.$route.params as Record<string, RouteParamValue>

// 表单
const { Form, form, deptList, loading, transformOptions, getForms, view } = useForm()

// 挂载
onMounted(async () => {
  // 表单集合
  await getForms()

  // 查看
  await view(id)
})
</script>

<style lang="scss" scoped>
$topHeight: calc(var(--van-nav-bar-height) + env(safe-area-inset-top));

.content {
  height: calc(100vh - $topHeight);
}
</style>
