<template>
  <div>
    <template v-for="(item, index) in options">
      <template v-if="values.includes(item.value)">
        <span
          v-if="
            (item.elTagType === 'default' || item.elTagType === '' || item.elTagType == null) && (item.elTagClass === '' || item.elTagClass == null)
          "
          :key="item.value"
          :index="index"
          :class="item.elTagClass"
          class="after:content-['、'] last:after:content-none"
        >
          {{ `${item.label}` }}
        </span>
        <van-tag
          v-else
          :key="`${item.value}`"
          :type="
            item.elTagType === 'primary'
              || item.elTagType === 'success'
              || item.elTagType === 'warning'
              || item.elTagType === 'danger'
              ? item.elTagType
              : item.elTagType === 'info' ? 'default' : 'primary'
          "
          :class="item.elTagClass"
        >
          {{ `${item.label}` }}
        </van-tag>
      </template>
    </template>
    <template v-if="unmatch && showValue">
      {{ unmatchArray }}
    </template>
  </div>
</template>

<script setup lang="ts">
interface Props {
  options: Array<DictDataOption>
  value?: number | string | Array<number | string>
  showValue?: boolean
  separator?: string
}
const props = withDefaults(defineProps<Props>(), {
  showValue: true,
  separator: ',',
})

const values = computed(() => {
  if (props.value === '' || props.value === null || typeof props.value === 'undefined')
    return []
  return Array.isArray(props.value) ? props.value.map(item => `${item}`) : String(props.value).split(props.separator)
})

const unmatch = computed(() => {
  if (props.options?.length === 0 || props.value === '' || props.value === null || typeof props.value === 'undefined')
    return false
  // 传入值为非数组
  let unmatch = false // 添加一个标志来判断是否有未匹配项
  values.value.forEach((item) => {
    if (!props.options.some(v => v.value === item)) {
      unmatch = true // 如果有未匹配项，将标志设置为true
    }
  })
  return unmatch // 返回标志的值
})

const unmatchArray = computed(() => {
  // 记录未匹配的项
  const itemUnmatchArray: Array<string | number> = []
  if (props.value !== '' && props.value !== null && typeof props.value !== 'undefined') {
    values.value.forEach((item) => {
      if (!props.options.some(v => v.value === item)) {
        itemUnmatchArray.push(item)
      }
    })
  }
  // 没有value不显示
  return handleArray(itemUnmatchArray)
})

function handleArray(array: Array<string | number>) {
  if (array.length === 0)
    return ''
  return array.reduce((pre, cur) => {
    return `${pre} ${cur}`
  })
}
</script>
