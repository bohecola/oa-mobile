<template>
  <div>
    <NavBar :title="title" />

    <form action="/">
      <van-search
        v-model.trim="keywords"
        show-action
        placeholder="搜索标题"
        @search="search"
      >
        <template #action>
          <div @click="search">
            搜索
          </div>
        </template>
      </van-search>
    </form>

    <div class="h-[calc(100vh-var(--van-nav-bar-height)-var(--van-search-input-height)-20px)] overflow-y-auto">
      <component :is="currentTab.component" :ref="setSubCompRef(currentTab.category)" :keywords="keywords" />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { isEmpty } from 'lodash-es'
import MyInitiated from './components/my-initiated.vue'
import MyToDo from './components/my-to-do.vue'
import MyCompleted from './components/my-completed.vue'
import MyCc from './components/my-cc.vue'

const { proxy } = getCurrentInstance() as ComponentInternalInstance

const tabs = [
  { title: '我发起的', category: 'my-initiated', component: MyInitiated },
  { title: '我的待办', category: 'my-to-do', component: MyToDo },
  { title: '我的已办', category: 'my-completed', component: MyCompleted },
  { title: '我的抄送', category: 'my-cc', component: MyCc },
]

const keywords = ref('')
const componentRefs = ref<Record<string, any>>({})

const title = computed(() => tabs.find(tab => tab.category === proxy.$route.query.category)?.title)

const currentTab = computed(() => tabs.find(tab => tab.category === proxy.$route.query.category))

function setSubCompRef(category: string) {
  return (el: any) => {
    if (el) {
      componentRefs.value[category] = el
    }
  }
}

function search() {
  if (isEmpty(keywords.value)) {
    return
  }

  nextTick(() => {
    componentRefs.value[currentTab.value.category]?.refetch()
  })
}
</script>
