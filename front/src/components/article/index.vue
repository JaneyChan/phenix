<template>
    <div class="article-wrapper">
        <div v-if="article.id" class="article-content">
            <div class="header">
              <div class="header-title">{{ article.title }}</div>
              <div class="header-date">{{ parseTime(article.createTime) }}</div>
            </div>
            <div v-html="markdown(article.content || '')" class="markdown"></div>
        </div>
    </div>
</template>

<script>
import marked from '@/utils/marked'
import { parseTime } from '@/utils/index'

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
    let params = this.$route.params
    if (!params.id) {
      return
    }
    this.$http.get('/front/article/' + params.id)
      .then((res) => {
        if (res.data.success) {
          this.article = res.data.data
        }
      })
  },
  methods: {
    parseTime (time) {
      return parseTime(time, 'yyyy-MM-dd hh:mm')
    },
    markdown (value) {
      return marked(value)
    }
  }
}
</script>

<style lang="less">

.article-content {
  margin-top: 10px;
  .header {
    text-align: center;
    margin-top: 3rem;
    margin-bottom: 4rem;
    .header-title {
      letter-spacing: 0.01em;
      font-size: 2em;
      font-weight: 700;
      color: #2bbc8a;
    }
    .header-date {
      color: #7f8c8d;
      margin: 10px 0;
      font-size: 0.9em;
    }
  }
}

</style>
