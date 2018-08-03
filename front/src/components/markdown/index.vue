<template>
  <div v-html="markdown(value || '')" class="markdown"></div>
</template>

<script>
import marked from '@/utils/marked'

export default {
  props: {
    value: {
      type: String
    }
  },
  methods: {
    markdown (value) {
      return marked(value)
    }
  }
}
</script>

<style lang="less">
</style>
