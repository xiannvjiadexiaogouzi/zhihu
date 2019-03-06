<template>
  <div class="head-menu">
    <i class="icon-menu"></i>
    <span class>今日热闻</span>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
@import '../assets/stylus/mixin.styl'

.head-menu
  width: 100%
  height: pr(50)
  color: rgb(255, 255, 255)
  position: absolute
  display flex
  z-index: 2
  padding pr(10) pr(10)

  &>i
    font-size pr(30)
  span
    position absolute
    display: inline-block
    width: 100vw
    top 0
    left 0
    font-size: pr(20)
    font-weight: 400
    text-align: center
    margin-top: pr(15)
</style>
