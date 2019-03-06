<template>
  <div class="shortcomment">
    <div class="shortcommenthead">
      {{shortComments.length}}条短评
      <i
        :class="showShortcomment ? 'icon-shouqi':'icon-zhankai'"
        @click="showShortComments"
      />
    </div>
    <ul v-if="showShortcomment">
      <li v-for="item in shortComments" :key="item.id">
        <img :src="replaceUrl(item.avatar)">
        <span class="author">{{item.author}}</span>
        <i class="icon-good_fill">
          <span>{{item.likes}}</span>
        </i>
        <article>{{item.content}}</article>
        <show-reply :reply="item.reply_to | filter"/>
        <span class="time">{{stamptime2time(item.time)}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import api from "../assets/js/api";
import ShowReply from "./ShowReply";

export default {
  components: {
    ShowReply
  },
  data() {
    return {
      shortComments: [],
      // isliked: false,
      showShortcomment: false
    };
  },
  created() {
    //获取短评data
    this.$axios(
      api.story +
        // this.$store.state.nowId
        this.$route.query.id +
        "/short-comments"
    ).then(res => {
      // console.log(res);
      this.shortComments = res.data.comments;
    });
  },
  // updated() {
  //   // this.$store.commit("getCommentNum", this.shortComments.length);
  //   this.$emit('getCommentnum', this.shortComments.length);
  // },
  filters: {
    filter(val) {
      if (!val) {
        return { noreply: "none" };
      } else {
        return val;
      }
    }
  },
  watch: {
    shortComments: {
      handler() {
        this.$emit("getCommentnum", this.shortComments.length);
      },
      deep: true
    }
  },
  methods: {
    replaceUrl(oldurl) {
      // console.log(oldurl);
      return oldurl.replace(
        /http\w{0,1}:\/\/p/g,
        "https://images.weserv.nl/?url=p"
      );
    },
    stamptime2time(unixtime) {
      let time = new Date(unixtime * 1000);
      return (
        time.getMonth() +
        1 +
        "-" +
        time.getDate() +
        " " +
        time.getHours() +
        ":" +
        time.getMinutes()
      );
    },
    showShortComments() {
      this.showShortcomment = !this.showShortcomment;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../assets/stylus/mixin.styl'

.shortcomment
  padding-bottom: calc((100vh / 9))

  .shortcommenthead
    height: pr(32)
    border-bottom: pr(1) solid rgb(215, 215, 215)
    line-height: pr(32)
    padding-left: pr(15)
    padding-right: pr(15)
    display: flex
    justify-content: space-between
    align-items: center

  &>i
    width: pr(16)
    height: pr(32)
    line-height: pr(32)

  ul
    padding: 0

  li
    border-bottom: pr(1) solid rgb(215, 215, 215)
    padding: pr(15) pr(20) pr(10) pr(65)

    & img
      position: absolute
      left: pr(15)
      width: pr(40)
      height: pr(40)
      border-radius: 50%

    & > i
      float: right

    & article
      margin-top: pr(5)
      line-height: pr(20)

  .author
    font-weight: 900
    font-size: pr(17)

  i.icon-good_fill
    color: rgb(180, 180, 180)

    & span
      float: right
      position: relative
      left: pr(5)
      color: rgb(180, 180, 180)
      font-size: pr(10)

  .time
    color: rgb(165, 165, 165)
    line-height: pr(14)
</style>