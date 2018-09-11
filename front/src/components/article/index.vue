<template>
    <div class="article-wrapper">
        <div v-if="article.id" class="article-content">
            <div class="header">
              <div class="header-title">{{ article.title }}</div>
              <div class="header-date">
                创建于：{{ parseTime(article.createTime) }}
                &nbsp;&nbsp;|&nbsp;&nbsp;
                更新于：{{ parseTime(article.updateTime) }}
              </div>
            </div>
            <v-markdown :value="article.content" />
        </div>
    </div>
</template>

<script>
import Markdown from '@/components/markdown'
import { parseTime } from '@/utils/index'

export default {
  components: {
    'v-markdown': Markdown
  },
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
    this.$http.get('/api/article/' + params.id)
      .then((res) => {
        if (res.data.success) {
          this.article = res.data.data
        }
      })
  },
  methods: {
    parseTime (time) {
      return parseTime(time, 'yyyy-MM-dd')
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
    margin-bottom: 2rem;
    .header-title {
      margin-bottom: 1.2rem;
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
