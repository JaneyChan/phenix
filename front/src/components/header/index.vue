<template>
    <div class="header-wrapper">
      <ul class="menu-list">
        <li class="menu-item active">首页</li>
        <li class="menu-item">归档</li>
        <li class="menu-item">Github</li>
      </ul>
    </div>
</template>

<script>
</script>

<style lang="less">
.menu-list {
  list-style: none;
  float: right;
  margin-top: 10px;
}
.menu-item {
  cursor: pointer;
  display: inline-block;
  margin: 0 8px;
  height: 24px;
  line-height: 24px;
  text-decoration: none;
  color: #34495e;
  border-bottom: 3px solid transparent;
  &:hover {
    border-bottom: 3px solid #42b983;
  }
  &.active {
    border-bottom: 3px solid #42b983;
  }
}
</style>
