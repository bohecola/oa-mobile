<template>
  <div>
    <NavBar :title="title" />

    <van-tabs v-model:active="active" lazy-render @change="handleTabChange">
      <van-tab
        v-for="item in tabs"
        :key="item.title"
        :title="item.title"
        :name="item.category"
      >
        <form action="/">
          <van-search
            placeholder="搜索"
            readonly
            @focus="onFocus()"
          />
        </form>
        <div class="h-[calc(100vh-var(--van-tabs-line-height)-var(--van-nav-bar-height)-var(--van-search-input-height)-20px)] overflow-y-auto">
          <component :is="item.component" :ref="setSubCompRef(item.category)" />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang='ts'>
import { isEmpty } from 'lodash-es'
import MyInitiated from './components/my-initiated.vue'
import MyToDo from './components/my-to-do.vue'
import MyCompleted from './components/my-completed.vue'
import MyCc from './components/my-cc.vue'
import NavBar from '@/components/NavBar/index.vue'

const { proxy } = getCurrentInstance() as ComponentInternalInstance
const active = ref(proxy.$route.query.category as string ?? 'my-initiated')
const componentRefs = ref<Record<string, any>>({})

const tabs = [
  { title: '我发起的', category: 'my-initiated', component: MyInitiated },
  { title: '我的待办', category: 'my-to-do', component: MyToDo },
  { title: '我的已办', category: 'my-completed', component: MyCompleted },
  { title: '我的抄送', category: 'my-cc', component: MyCc },
]

const title = computed(() => tabs.find(tab => tab.category === active.value)?.title)

function setSubCompRef(category: string) {
  return (el: any) => {
    if (el) {
      componentRefs.value[category] = el
    }
  }
}

function handleTabChange(name: string) {
  proxy.$router.replace({
    path: proxy.$route.path,
    query: {
      category: name,
    },
  })

  if (isEmpty(componentRefs.value[name])) {
    nextTick(() => {
      componentRefs.value[name]?.refetch()
    })
  }
}

function onFocus() {
  proxy.$router.push({
    path: '/approval-search',
    query: {
      category: active.value,
    },
  })
}

onMounted(() => {
  nextTick(() => {
    componentRefs.value[active.value]?.refetch()
  })
})
</script>
