<template>
  <div class="article-menu">
    <mt-popup v-model="popupVisible" position="bottom">
      <div class="title">分享这篇内容</div>
      <div class="share-content">
        <div class="btn-wrapper" v-for="(item,index) in shareBtns" :key="index">
          <div class="btn-cirlce" :style="{background:item.color}">
            <i :class="'icon-'+item.logo"/>
          </div>
          <span class="share-note">{{item.name}}</span>
        </div>
      </div>
      <div class="btn">收藏</div>
      <div class="btn" @click="popupVisible=false">取消</div>
    </mt-popup>
    <div class="article-bottom">
      <span class="icon-back" @click="goBack"></span>
      <span class="icon-next" @click="nextArticle"></span>
      <span class="icon-good" :style="{color:like ? '#0099f7': 'grey'}" @click="thumbUp">
        <!-- :class="{good_blue: extraData.like}" -->
        <span class="top-num">{{extraData.popularity}}</span>
      </span>
      <span class="icon-share" @click="showShare"></span>
      <span class="icon-comment" @click="openComment">
        <span class="top-num">{{extraData.comments}}</span>
      </span>
    </div>
  </div>
</template>

<script>
import api from "../assets/js/api";

export default {
  data() {
    return {
      id: 0,
      like: false,
      extraData: {},
      popupVisible: false,
      shareBtns: [
        { color: "rgb(3, 211, 76)", logo: "weixin", name: "微信好友" },
        { color: "rgb(61, 218, 33)", logo: "friends", name: "微信朋友圈" },
        { color: "rgb(35, 96, 202)", logo: "qq", name: "QQ" },
        { color: "rgb(255, 0, 0)", logo: "weibo", name: "新浪微博" },
        { color: "rgb(238, 25, 0)", logo: "fuzhi", name: "复制链接" },
        { color: "rgb(1, 160, 241)", logo: "message", name: "Message" },
        { color: "rgb(40, 192, 68)", logo: "yinxiangbiji", name: "印象笔记" },
        {
          color: "rgb(0, 159, 222)",
          logo: "tengxunweibo",
          name: "腾讯微博"
        }
      ]
    };
  },
  created() {
    //从store获取当前id
    this.id = this.$store.state.nowId || this.$route.params.id;
    //针对id获取对应的评论数据
    this.$axios(api.storyExtra + this.id).then(res => {
      this.extraData = res.data;
    });
  },
  watch: {
    $route: "reloadmenu"
  },
  methods: {
    goBack() {
      this.$router.push({
        name: "home"
      });
    },
    nextArticle() {
      //将store里的nextiId变为nowId
      this.$store.commit("next2now");
      this.$router.push({
        name: "article",
        params: { id: this.$store.state.nowId }
      });
    },
    reloadmenu() {
      //传递给父组件article重新加载
      this.$emit("reloadArticle");
      //自身重新加载created()
      this.id = this.$store.state.nowId;
      this.$axios(api.storyExtra + this.id).then(res => {
        this.extraData = res.data;
      });
    },
    thumbUp() {
      this.like = !this.like;
      if (this.like) {
        this.extraData.popularity++;
      } else {
        this.extraData.popularity--;
      }
    },
    showShare() {
      this.popupVisible = !this.popupVisible;
    },
    openComment() {
      this.$router.push({
        name: "comments",
        query:{id:this.$route.params.id}
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../assets/stylus/mixin.styl'
@import '../../node_modules/mint-ui/lib/popup/style.css'

.article-menu
  position: absolute
  height: 100vh
  background: rgba(255, 255, 0, 0.3)
  bottom: 0

  &>>>.mint-popup
    width: 100%
    background: rgb(240, 240, 240)
    padding: pr(15)
    padding-bottom: pr(10)
    box-shadow: 0 pr(-0.5) pr(1) rgba(0, 0, 0, 0.2)
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center

    .title
      font-size: pr(18)
      margin-bottom: pr(5)

    .share-content
      font-size: pr(14)
      width: 100%
      display: flex
      flex-wrap: wrap
      justify-content: space-around
      align-items: center
      margin-bottom: pr(10)

      .btn-wrapper
        margin: pr(5) 0
        width: 25%
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center

        .btn-cirlce
          width: pr(50)
          height: pr(50)
          border-radius: 50%
          margin: pr(5)
          display: flex
          justify-content: center
          align-items: center
          font-size: pr(30)
          color: white

    .btn
      width: 100%
      height: pr(40)
      margin: pr(5) 0
      background: white
      text-align: center
      line-height: pr(40)

  .article-bottom
    position: fixed
    bottom: 0
    height: pr(60)
    width: 100vw
    background: rgba(255, 255, 255, 1)
    padding: pr(15)
    display: flex
    justify-content: space-around
    box-shadow: 0 pr(-0.5) pr(1) rgba(0, 0, 0, 0.2)
    font-size: pr(25)
    color: grey
    &>span
      position relative 
    
    .top-num
      display: inline-block
      position: absolute
      right: pr(-15)
      top: pr(-7)
      font-size: pr(10)
      text-align: center

    .icon-comment span
      color white
      background: rgb(34, 140, 255)
      width: pr(25)
      height pr(13)
      line-height pr(13)
</style>