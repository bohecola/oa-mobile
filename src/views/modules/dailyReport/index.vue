<template>
  <div>
    <NavBar :is-left-click-back="false" @click-left="$router.push('/apps')" />

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        v-model:error="error"
        :finished="finished"
        :finished-text="finishedText"
        :error-text="errorText"
        @load="onLoad"
      >
        <van-cell
          v-for="item in list"
          :key="(item as any).id"
          :title="(item as any).id"
          @click="onItemClick(item)"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script setup lang='ts'>
import { useList } from '@/hooks'

const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 工程管理中心相关配置
const { ptms_project_config } = toRefs(proxy.useDict('ptms_project_config'))

// 获取配置 => product_plan_task_scheme_day
function getPtmsProjectConfig() {
  return Object.fromEntries(ptms_project_config.value.map(e => [e.label, e.value]))
}

const queryParams = ref<any>({})

const { refreshing, loading, list, error, finished, finishedText, errorText, onRefresh, onLoad } = useList({
  query: queryParams,
  request: () => Promise.resolve({ data: [{ id: 1 }, { id: 2 }], msg: '', code: 200 }) as any,
})

function onItemClick(item: any) {
  const config = getPtmsProjectConfig()
}
</script>
