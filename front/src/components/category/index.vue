<template>
    <div class="article-wrapper">
      <div class="category-card" v-for="item in list" :key="item.id">
        <div class="category-name">{{ item.name }}</div>
        <ul class="cate_art-list">
          <li class="cate_art-name" v-for="article in item.articles" :key="article.id">
            <router-link class="cate_art-link" :to="'/article/' + article.id">{{ article.title }}</router-link>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import Patination from '@/components/pagination'
import { parseTime } from '@/utils/index'

export default {
  data () {
    return {
      list: []
    }
  },
  components: {
    'v-pagination': Patination
  },
  created () {
    this.getArticlesByCategory()
  },
  methods: {
    parseTime (time) {
      return parseTime(time, 'yyyy-MM-dd hh:mm')
    },
    getArticlesByCategory () {
      this.$http.get('/api/category/articles').then((res) => {
        if (res.data.success) {
          this.list = res.data.data
        }
      })
    }
  }
}
</script>

<style lang="less">

.category-card {
  padding-bottom: 10px;
  color: #34495e;
  .category-name {
    margin: 1em 0;
    font-weight: bold;
    font-size: 1.4em;
  }
  .cate_art-list {
    padding-left: 40px;
  }
  .cate_art-name {
    font-size: 16px;
    margin: 10px 0;
    font-weight: bold;
    .cate_art-link {
      color: #42b983;
      text-decoration: none;
    }
  }
}
</style>
