<template>
  <div class="h-screen overflow-hidden bg-white flex flex-col">
    <NavBar title="公告接收列表" />

    <div class="shrink-0 border-b border-[#edf0f3]">
      <div class="grid grid-cols-2">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          class="relative h-10 text-sm"
          :class="activeTab === tab.value ? 'text-[#20242a]' : 'text-[#9aa0a6]'"
          @click="activeTab = tab.value"
        >
          {{ tab.label }}
          <span
            v-if="activeTab === tab.value"
            class="absolute bottom-0 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-[#1989fa]"
          />
        </button>
      </div>
    </div>

    <main class="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
      <div>
        <div
          v-for="person in currentUsers"
          :key="person.name"
          class="ml-4 flex h-14 items-center border-b border-[#edf0f3]"
        >
          <div
            class="mr-4 grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-full bg-[#168fff] text-sm text-white"
          >
            <img
              v-if="person.avatar"
              :src="person.avatar"
              :alt="person.name"
              class="h-full w-full object-cover"
            >
            <span v-else>{{ person.name.slice(0, 1) }}</span>
          </div>
          <div class="text-sm text-[#20242a]">
            {{ person.name }}
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const activeTab = ref<'unread' | 'read'>('unread')

const unreadUsers = []

const readUsers = [
  { name: '何程' },
  { name: '穆宝亮' },
  { name: '刘玟才' },
  { name: '黄光伟' },
  { name: '寇天坤' },
  { name: '周海洋' },
  { name: '王亮亮' },
  { name: '李超' },
  { name: '白鹏飞' },
  { name: '胡元' },
  { name: '牛俊虎' },
  { name: '陈浩东' },
  { name: '张明' },
  { name: '李娜' },
  { name: '王磊' },
  { name: '赵敏' },
  { name: '陈晨' },
  { name: '刘洋' },
  { name: '孙浩' },
  { name: '周倩' },
  { name: '吴迪' },
  { name: '郑伟' },
  { name: '冯雪' },
  { name: '蒋欣' },
  { name: '韩旭' },
  { name: '马超' },
  { name: '何静' },
  { name: '罗峰' },
  { name: '梁爽' },
  { name: '宋佳' },
  { name: '唐雨' },
  { name: '许鹏' },
  { name: '邓琳' },
  { name: '姚远' },
  { name: '沈涛' },
  { name: '任洁' },
  { name: '高翔' },
  { name: '贾宁' },
  { name: '潘越' },
  { name: '苏航' },
]

const readCount = readUsers.length
const unreadCount = unreadUsers.length

const tabs = computed(() => [
  { label: `未读 ${unreadCount}`, value: 'unread' as const },
  { label: `已读 ${readCount}`, value: 'read' as const },
])

const currentUsers = computed(() => activeTab.value === 'unread' ? unreadUsers : readUsers)
</script>
