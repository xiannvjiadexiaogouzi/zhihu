<template>
  <div class="comments">
    <header>
      <span>{{commentNum}}条点评</span>
    </header>
    <long-comment @getCommentnum="changeCommentNum"/>
    <short-comment @getCommentnum="changeCommentNum"/>
    <footer>
      <span class="icon-back" @click="goback"/>
      <span class="writeboard" @click="openWriteboard">
        <i class="writeboard"/>
        写点评
      </span>
    </footer>
  </div>
</template>

<script>
import LongComment from "../components/LongComment";
import ShortComment from "../components/ShortComment";

export default {
  components: {
    LongComment,
    ShortComment
  },
  data() {
    return {
      commentNum: 0
    };
  },
  computed: {},
  methods: {
    changeCommentNum(num) {
      this.commentNum += num;
    },
    goback() {
      this.$router.go(-1);
    },
    openWriteboard() {
      this.$router.push({
        name: "writeboard"
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../assets/stylus/mixin.styl'

.comments
  font-size: pr(16)

  header
    background: rgb(0, 160, 239)
    color: aliceblue
    height: pr(60)
    width: 100vw
    padding: pr(15)

    &>span
      display: inline-block
      width: 100%
      font-size: pr(20)
      font-weight: 900
      text-align: center
      line-height: pr(30)

  footer
    height: pr(60)
    width: 100vw
    background: rgb(60, 60, 60)
    position: fixed
    bottom: 0
    display: flex
    justify-content center
    align-items center
    padding pr(15)
    /* margin-top: 1em; */

    .icon-back
      color #dbdbdb 
      font-size pr(25)
      position absolute
      left pr(15)

    .writeboard
      display: inline-block
      line-height: pr(30)
      text-align: center
      display: flex
      justify-content: center
      align-items: center
      color: #dbdbdb

    .writeboard i
      width: pr(20)
      height: pr(20)
      display: inline-block
      background: url('../assets/png/board.png') no-repeat center
      margin: 0 pr(16) 0 0
</style>