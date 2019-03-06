<template>
  <div class="long-comment">
    <div class="longcomment">
      <div class="longcommenthead">{{longComments.length}}条长评</div>
      <ul>
        <li v-for="item in longComments" :key="item.id">
          <img :src="replaceUrl(item.avatar)">
          <span class="author">{{item.author}}</span>
          <i class="icon-good_fill">
            <span>{{item.likes}}</span>
          </i>
          <article>{{item.content}}</article>
          <show-reply :reply="item.reply_to | filter"/>
          <span class="time">{{stamptime2time(item.time)}}</span>
        </li>
        <img src v-if="!longComments.length">
      </ul>
    </div>
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
      longComments: []
      //   isliked: false,
    };
  },
  created() {
    //获取长评data
    this.$axios(
      api.story +
        // this.$store.state.nowId
        this.$route.query.id +
        "/long-comments"
    ).then(res => {
      // console.log(res);
      this.longComments = res.data.comments;
    });
  },
  // updated() {
  //   // this.$store.commit("getCommentNum", this.longComments.length);
  //   this.$emit("getCommentnum", this.longComments.length);
  // },
  filters: {
    filter(val) {
      if (!val) {
        return {
          noreply: "none"
        };
      } else {
        return val;
      }
    }
  },
  watch: {
    longComments: {
      handler() {
        this.$emit("getCommentnum", this.longComments.length);
      },
      deep: true
    }
  },

  computed: {},
  methods: {
    goback() {
      this.$router.go(-1);
    },
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
    }
    // like() {
    //   this.isliked = !this.isliked;
    // },
  }
};
</script>

<style lang="stylus" scoped>
@import '../assets/stylus/mixin.styl'

.long-comment
  font-size pr(16)
  .longcommenthead
    height: pr(32)
    border-bottom: pr(1) solid rgb(215, 215, 215)
    line-height: pr(32)
    padding-left: pr(15)

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
      line-height pr(20)


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
    line-height pr(14)
</style>