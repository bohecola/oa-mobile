<template>
  <div>
    <NavBar :title="title" />

    <van-tabs v-model:active="active" lazy-render @click-tab="handleTabClick">
      <van-tab
        v-for="item in tabs"
        :key="item.title"
        :title="item.title"
        :name="item.category"
      >
        <component :is="item.component" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang='ts'>
import MyInitiated from './components/my-initiated.vue'
import MyToDo from './components/my-to-do.vue'
import MyCompleted from './components/my-completed.vue'
import MyCc from './components/my-cc.vue'
import NavBar from '@/components/NavBar/index.vue'

const route = useRoute()
const router = useRouter()
const active = ref(route.query.category as string ?? 'my-initiated')

const tabs = [
  { title: '我发起的', category: 'my-initiated', component: MyInitiated },
  { title: '我的待办', category: 'my-to-do', component: MyToDo },
  { title: '我的已办', category: 'my-completed', component: MyCompleted },
  { title: '我的抄送', category: 'my-cc', component: MyCc },
]

const title = computed(() => tabs.find(tab => tab.category === active.value)?.title)

function handleTabClick({ name }: any) {
  router.replace({
    path: route.path,
    query: {
      category: name,
    },
  })
}
</script>
