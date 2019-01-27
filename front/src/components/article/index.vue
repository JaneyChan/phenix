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
        <ul class="article-copyright">
          <li>本文作者：JaneChan</li>
          <li>本文链接：
            <a :href="this.location" target="_black">{{ this.location }}</a>
          </li>
          <li>版权声明： 本博客所有文章除特别声明外，均采用
            <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_black">CC BY-NC-SA 4.0</a>
            许可协议。转载请注明出处！
          </li>
        </ul>
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
      },
      location: ''
    }
  },
  created () {
    let params = this.$route.params
    if (!params.routeName) {
      return
    }
    this.$http.get('/api/article/' + params.routeName)
      .then((res) => {
        if (res.data.success) {
          this.article = res.data.data
          this.location = window.location.href
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
.article-copyright {
  margin: 2em 0 0;
  padding: 0.5em 1em;
  border-left: 3px solid #2bbc8a;
  list-style: none;
  li {
    line-height: 28px;
    a {
      color: #2c3e50;
      text-decoration: none;
      border-bottom: 1px solid #2c3e50;
      word-wrap: break-word;
    }
  }
}
</style>
