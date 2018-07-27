<template>
    <div class="article-wrapper">
        <div class="article">
            <div class="header">{{ article.title }}</div>
            <div v-html="markdown(article.content || '')" class="markdown"></div>
        </div>
    </div>
</template>

<script>
import marked from '@/utils/marked'

export default {
  data () {
    return {
      article: {
        title: '',
        content: ''
      }
    }
  },
  created () {
    this.$http.post('/front/article', { id: 1 })
      .then((res) => {
        if (res.data.success) {
          this.article = res.data.data
        }
      })
  },
  methods: {
    markdown (value) {
      return marked(value)
    }
  }
}
</script>

<style lang="less">

.article-wrapper {
    text-align: left;
    .article {
        margin-top: 10px;
        .header {
            letter-spacing: 0.01em;
            font-size: 2em;
            font-style: normal;
            font-weight: 700;
            color: #2bbc8a;
            margin-top: 3rem;
            margin-bottom: 2rem;
            display: block;
            -moz-osx-font-smoothing: grayscale;
            -webkit-font-smoothing: antialiased;
        }
    }
}

</style>
