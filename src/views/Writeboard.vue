<template>
  <div class="writeboard">
    <header>
        <i class="icon-back"  @click="goback"/>
        <span>写点评</span>
        <span class="upload">发布</span>
    </header>
    <textarea placeholder="不友善言论会被删除，深度讨论会被优先展示" autofocus="autofocus"></textarea>
  </div>
</template>

<script>
export default {
  methods: {
    goback() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../assets/stylus/mixin.styl'
.writeboard
  font-size pr(16)
  header
    background: rgb(0, 160, 239)
    color: aliceblue
    height: pr(60)
    width: 100vw
    padding: pr(15)
    display flex
    justify-content space-between
    align-items center
    font-size pr(20)
    &>i
      font-size pr(25)
  textarea
    padding: pr(15)
    width: 100%
    height 50vh
    outline: none
    font-size: pr(18)
    border none
</style>

