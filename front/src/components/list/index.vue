<template>
    <div class="article-wrapper">
      <div class="article-list">
        <div class="article-card" v-for="article in articles" :key="article.id">
          <div class="article-head">{{ article.title }}</div>
          <p class="article-date">{{ article.createTime}}</p>
          <div class="article-summary">{{ article.content && article.content.slice(0, 200) }}</div>
          <div class="more">Read more</div>
        </div>
      </div>
    </div>
</template>

<script>
import marked from '@/utils/marked'

export default {
  data () {
    return {
      articles: []
    }
  },
  created () {
    this.$http.get('/front/articles')
      .then((res) => {
        if (res.data.success) {
          this.articles = res.data.data
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
.article-list {
  padding-top: 30px;
}
.article-card {
  padding-bottom: 20px;
  .article-head {
    font-size: 1.6em;
    font-weight: bold;
    margin-bottom: 0;
    padding-top: 1em;
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
    &:hover {
      transform: translateX(10px);
    }
  }
}
</style>
