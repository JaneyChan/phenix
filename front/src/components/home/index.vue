<template>
    <div class="article-wrapper">
      <div class="home-list">
        <div class="home-card" v-for="article in articles" :key="article.id">
          <router-link class="home-head" :to="'/article/' + article.id">{{ article.title }}</router-link>
          <p class="home-date">{{ parseTime(article.createTime) }}</p>
          <div class="home-summary">{{ article.content && article.content.slice(0, 200) }}</div>
          <router-link class="more" :to="'/article/' + article.id">Read more</router-link>
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
        }
      })
    }
  }
}
</script>

<style lang="less">
.home-list {
  padding-top: 10px;
}
.home-card {
  padding-bottom: 30px;
  .home-head {
    display: block;
    color: #34495e;
    font-size: 1.6em;
    font-weight: bold;
    margin-bottom: 0;
    padding-top: 0.5em;
    text-decoration: none;
  }
  .home-date {
    color: #7f8c8d;
    margin: 10px 0;
    font-size: 0.9em;
  }
  .home-summary {
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
    text-decoration: none;
  }
}
</style>
