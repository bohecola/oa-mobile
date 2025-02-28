<template>
  <div class="p-2">
    <van-form label-width="auto">
      <van-cell-group class="!mb-3" inset>
        <van-field label="流程ID" input-align="right">
          <template #input>
            <span>xxxx</span>
          </template>
        </van-field>
        <van-field label="发起人" input-align="right">
          <template #input>
            <span>xxxx</span>
          </template>
        </van-field>
        <van-field label="部门" input-align="right">
          <template #input>
            xxxx
          </template>
        </van-field>
        <van-field label="发起时间" input-align="right">
          <template #input>
            <span>xxxx</span>
          </template>
        </van-field>
      </van-cell-group>
    </van-form>

    <van-form required="auto" label-width="auto" label-align="top" @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="form.value1"
          name="value1"
          label="字段1"
          placeholder="字段1"
          :rules="[{ required: true, message: '请填写字段1' }]"
        />
        <van-field name="switch" label="开关" :rules="[{ required: true, message: '请选择' }]">
          <template #input>
            <YesNoSwitch v-model="form.checked" />
          </template>
        </van-field>
        <van-field name="checkbox" label="复选框" :rules="[{ required: true, message: '请选择' }]">
          <template #input>
            <van-checkbox v-model="form.checkbox" shape="square" />
          </template>
        </van-field>
        <van-field name="checkboxGroup" label="复选框组" :rules="[{ required: true, message: '请选择' }]">
          <template #input>
            <van-checkbox-group v-model="form.checkboxGroup" direction="horizontal">
              <van-checkbox name="1" shape="square">
                复选框 1
              </van-checkbox>
              <van-checkbox name="2" shape="square">
                复选框 2
              </van-checkbox>
            </van-checkbox-group>
          </template>
        </van-field>
        <van-field name="radio" label="单选框" :rules="[{ required: true, message: '请选择' }]">
          <template #input>
            <van-radio-group v-model="form.radio" direction="horizontal">
              <van-radio name="1">
                单选框 1
              </van-radio>
              <van-radio name="2">
                单选框 2
              </van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field name="uploader" label="文件上传" :rules="[{ required: true, message: '请选择' }]">
          <template #input>
            <UploadFile v-model="form.uploader" />
          </template>
        </van-field>
        <van-field v-model="form.dailyType" name="dailyType" label="日常事务类型选择" placeholder="请选择" :rules="[{ required: true, message: '请选择' }]" is-link @click="DailyTypeSelectRef?.open">
          <template #input>
            <DailyTypeSelect ref="DailyTypeSelectRef" v-model="form.dailyType" />
          </template>
        </van-field>
        <van-field name="user" label="人员选择" :rules="[{ required: true, message: '请选择' }]" readonly is-link @click="UserSelectRef?.open">
          <template #input>
            <UserSelect ref="UserSelectRef" v-model="form.user" />
          </template>
        </van-field>
        <van-field name="contractId" label="合同选择示例" :rules="[{ required: true, message: '请选择' }]" readonly is-link @click="open">
          <template #input>
            <van-tag
              type="primary"
              size="large"
            >
              {{ '合同名称2' }}
            </van-tag>
            <van-popup
              v-model:show="visible"
              position="bottom"
              class="h-full w-full"
              teleport="body"
              safe-area-inset-bottom
            >
              <NavBar
                title="选择合同"
                :is-left-click-back="false"
                @click-left="() => visible = false"
              />

              <form action="/">
                <van-search
                  v-model="searchText"
                  placeholder="搜索"
                  show-action
                >
                  <template #action>
                    <div @click="() => {}">
                      搜索
                    </div>
                  </template>
                </van-search>
              </form>

              <div class="p-4 h-[calc(100vh-var(--van-nav-bar-height)-var(--van-search-input-height)-20px-theme(space.14)-env(safe-area-inset-top)-env(safe-area-inset-bottom))] overflow-y-auto">
                <van-cell :class="[{ '!bg-[var(--van-primary-color)]': false }]">
                  <template #title>
                    <span :class="`${false ? 'text-white' : ''}`">合同名称1</span>
                  </template>
                  <template #label>
                    <div class="grid grid-cols-2">
                      <span>合同编号：XXxxxxxxx</span>
                      <span>申请人：xxx</span>
                      <span>合同类型：xxxx</span>
                      <span>合同类别：xxxx</span>
                      <span>合同金额：xxxx</span>
                      <span>项目类别：xxxx</span>
                      <span>开始日期：xxxx</span>
                      <span>结束日期：xxxx</span>
                      <span>状态：xxxx</span>
                    </div>
                  </template>
                </van-cell>
                <van-cell class="!bg-[var(--van-primary-color)]">
                  <template #title>
                    <span :class="`${true ? 'text-white' : ''}`">合同名称2</span>
                  </template>
                  <template #label>
                    <div class="grid grid-cols-2">
                      <span>合同编号：XXxxxxxxx</span>
                      <span>申请人：xxx</span>
                      <span>合同类型：xxxx</span>
                      <span>合同类别：xxxx</span>
                      <span>合同金额：xxxx</span>
                      <span>项目类别：xxxx</span>
                      <span>开始日期：xxxx</span>
                      <span>结束日期：xxxx</span>
                      <span>状态：xxxx</span>
                    </div>
                  </template>
                </van-cell>
              </div>

              <!-- 底部面板 -->
              <div class="px-3 flex flex-col justify-center w-full h-14 whitespace-nowrap border-t">
                <!-- 操作按钮 -->
                <div class="flex items-center justify-between gap-2">
                  <span class="text-sm">
                    已选择 {{ 1 }}
                  </span>
                  <div class="w-[70vw] overflow-x-auto flex gap-2">
                    <van-tag
                      v-for="selected in [{ name: '合同名称2' }]"
                      :key="selected.name"
                      type="primary"
                      size="medium"
                      closeable
                      @close="() => {}"
                    >
                      {{ selected.name }}
                    </van-tag>
                  </div>

                  <van-button class="ml-2" type="primary" size="small" @click="visible = false">
                    确定
                  </van-button>
                </div>
              </div>
            </van-popup>
          </template>
        </van-field>
      </van-cell-group>

      <div>
        <div class="px-4 py-2 text-sm flex justify-between items-center">
          <span class="text-[--van-cell-group-title-color]">子表</span>
          <van-button icon="plus" type="primary" size="small" @click="handleAdd" />
        </div>

        <TableCard v-for="(item, index) in form.itemList" :key="item.id" :title="`子表数据${item.id}`" class="mx-4 mb-2">
          <van-field
            v-model="item.name"
            :rules="[
              {
                required: true,
                message: '物品名称不能为空',
                trigger: 'onBlur',
              },
            ]"
            label="物品名称"
            placeholder="请输入物品名称"
          />
          <van-field
            v-model.number="item.num"
            :rules="[
              {
                required: true,
                message: '数量不能为空',
                trigger: 'onBlur',
              },
            ]"
            label="数量"
            placeholder="请输入数量"
          />
          <van-field
            v-model.number="item.amount"
            :rules="[
              {
                required: true,
                message: '金额不能为空',
                trigger: 'onBlur',
              },
            ]"
            label="金额"
            placeholder="请输入金额"
          />
          <van-field
            v-model.number="item.amount"
            :rules="[
              {
                required: true,
                message: '金额不能为空',
                trigger: 'onBlur',
              },
            ]"
            label="金额"
            placeholder="请输入金额"
          />
          <van-field
            v-model.number="item.amount"
            :rules="[
              {
                required: true,
                message: '金额不能为空',
                trigger: 'onBlur',
              },
            ]"
            label="金额"
            placeholder="请输入金额"
          />
          <van-field
            v-model.number="item.amount"
            :rules="[
              {
                required: true,
                message: '金额不能为空',
                trigger: 'onBlur',
              },
            ]"
            label="金额"
            placeholder="请输入金额"
          />
          <van-field
            v-model.number="item.amount"
            :rules="[
              {
                required: true,
                message: '金额不能为空',
                trigger: 'onBlur',
              },
            ]"
            label="金额"
            placeholder="请输入金额"
          />
          <van-field
            v-model.number="item.amount"
            :rules="[
              {
                required: true,
                message: '金额不能为空',
                trigger: 'onBlur',
              },
            ]"
            label="金额"
            placeholder="请输入金额"
          />
          <van-field
            v-model.number="item.amount"
            :rules="[
              {
                required: true,
                message: '金额不能为空',
                trigger: 'onBlur',
              },
            ]"
            label="金额"
            placeholder="请输入金额"
          />
          <van-field
            v-model.number="item.amount"
            :rules="[
              {
                required: true,
                message: '金额不能为空',
                trigger: 'onBlur',
              },
            ]"
            label="金额"
            placeholder="请输入金额"
          />
          <van-field
            v-model.number="item.amount"
            :rules="[
              {
                required: true,
                message: '金额不能为空',
                trigger: 'onBlur',
              },
            ]"
            label="金额"
            placeholder="请输入金额"
          />
          <van-field
            v-model.number="item.amount"
            :rules="[
              {
                required: true,
                message: '金额不能为空',
                trigger: 'onBlur',
              },
            ]"
            label="金额"
            placeholder="请输入金额"
          />

          <template #footer>
            <div class="flex justify-end">
              <van-button icon="delete" type="danger" size="small" :disabled="form.itemList.length === 1" @click="handleDelete(item, index)" />
            </div>
          </template>
        </TableCard>
      </div>

      <div style="margin: 16px;" class="flex justify-end gap-2">
        <van-button class="flex-[1]" round block type="default" native-type="submit">
          暂存
        </van-button>
        <van-button class="flex-[3]" round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang='ts'>
import { cloneDeep, uniqueId } from 'lodash-es'
import DailyTypeSelect from '../modules/daily/components/DailyTypeSelect.vue'
import UserSelect from '@/components/UserSelect/index.vue'

const DailyTypeSelectRef = ref<InstanceType<typeof DailyTypeSelect>>()
const UserSelectRef = ref<InstanceType<typeof UserSelectRef>>()

const visible = ref(false)
const searchText = ref(undefined)

const defaultItem = {
  id: undefined,
  name: undefined,
  num: undefined,
  amount: undefined,
}

const form = ref({
  value1: undefined,
  checked: undefined,
  checkbox: undefined,
  checkboxGroup: [],
  radio: undefined,
  uploader: undefined,
  dailyType: undefined,
  user: undefined,
  itemList: [
    createItem(),
  ],
})

function createItem() {
  const id = uniqueId()
  const item = cloneDeep(defaultItem)
  item.id = id
  return item
}

function handleAdd() {
  const item = createItem()
  form.value.itemList.push(item)
}

function handleDelete(item: any, index: number) {
  form.value.itemList.splice(index, 1)
}

function open() {
  visible.value = true
}

function close() {
  visible.value = false
}

function onSubmit(values: any) {
  console.log('submit', values, form.value)
}
</script>
