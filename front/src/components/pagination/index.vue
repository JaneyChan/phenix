<template>
  <div class="pagination">
    <div v-if="offset > 0" @click.stop="onChange(offset - limit > 0 ? offset - limit : 0)"><span class="page-arrow">←</span> Prev</div>
    <div class="next" v-if="offset + limit < total" @click.stop="onChange(offset + limit)">Next <span class="page-arrow">→</span></div>
  </div>
</template>

<script>
export default {
  props: {
    offset: {
      type: Number,
      required: true
    },
    limit: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    onChange: {
      type: Function
    }
  }
}

</script>

<style lang="less">
.pagination {
  margin: 1.5rem 1rem;
  font-weight: 600;
  div {
    cursor: pointer;
    color: #42b983;
    .page-arrow {
      color: #34495e;
    }
    &.next {
      float: right;
    }
  }
}
</style>
