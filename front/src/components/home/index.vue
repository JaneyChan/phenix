<template>
    <div class="article-wrapper">
      <div class="article-list">
        <div class="article-card" v-for="article in articles" :key="article.id">
          <div class="article-head">{{ article.title }}</div>
          <p class="article-date">{{ parseTime(article.createTime) }}</p>
          <div class="article-summary">{{ article.content && article.content.slice(0, 200) }}</div>
          <div class="more">Read more</div>
        </div>
      </div>
      <v-pagination :offset="offset" :limit="limit" :total="total" :onChange="getAllArticles"></v-pagination>
    </div>
</template>

<script>
import Patination from '@/components/pagination'
import { parseTime } from '@/utils/index'

export default {
  data () {
    return {
      articles: [],
      offset: 0,
      limit: 10,
      total: 0
    }
  },
  components: {
    'v-pagination': Patination
  },
  created () {
    this.getAllArticles()
  },
  methods: {
    parseTime (time) {
      return parseTime(time, 'yyyy-MM-dd hh:mm')
    },
    getAllArticles (offset = 0) {
      this.$http.post('/front/articles', {
        offset,
        limit: this.limit,
        total: 13
      }).then((res) => {
        if (res.data.success) {
          this.articles = res.data.data.list
          this.offset = res.data.data.offset
          this.limit = res.data.data.limit
          this.total = res.data.data.total
          console.log('this.articles : ' + res.data.data.list)
        }
      })
    }
  }
}
</script>

<style lang="less">
.article-list {
  padding-top: 10px;
}
.article-card {
  padding-bottom: 30px;
  .article-head {
    font-size: 1.6em;
    font-weight: bold;
    margin-bottom: 0;
    padding-top: 0.5em;
  }
  .article-date {
    color: #7f8c8d;
    margin: 10px 0;
    font-size: 0.9em;
  }
  .article-summary {
    margin: 10px 0;
    color: #34495e;
    line-height: 1.5;
  }
  .more {
    display: inline-block;
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
    color: #42b983;
  }
}
</style>
