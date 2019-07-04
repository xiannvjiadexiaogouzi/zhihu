<template>
  <div class="article">
    <header v-if="articleData.type === 0">
      <img
        v-if="articleData.image"
        :src="replaceUrl(articleData.image)"
        :alt="articleData.image_source"
        @load="loadImg"
      >
      <div class="layer"></div>
      <span class="title title-postion">{{articleData.title}}</span>
      <span class="source">图片：{{articleData.image_source}}</span>
    </header>
    <div class="article-body" v-html="articleData.body"/>
    <bottom-menu @reloadArticle="reload"/>
  </div>
</template>

<script>
import { Indicator } from "mint-ui";

import api from "../assets/js/api";
import BottomMenu from "@/components/ArticleBottomMenu";
// import articlecss from this.articleData.css[0];

export default {
  components: {
    BottomMenu
  },
  data() {
    return {
      articleData: {},
      cssStyle: {}
    };
  },
  created() {
    //从articlelist点进来
    let id = this.$store.state.nowId || this.$route.params.id;
    // console.log(id);
    this.$axios(api.news + id).then(res => {
      this.articleData = res.data;
      this.articleData.body = this.replaceUrl(this.articleData.body);
    });
  },
  mouted() {
  },
  methods: {
    replaceUrl(oldurl) {
      // console.log(oldurl);
      return oldurl.replace(
        /http\w{0,1}:\/\/p/g,
        "https://images.weserv.nl/?url=p"
      );
    },
    replaceBodyUrl(oldurl) {
      // console.log(oldurl);
      return oldurl.replace(
        /src="http\w{0,1}:\/\/p/g,
        "https://images.weserv.nl/?url=p"
      );
    },
    loadImg() {
      Indicator.close();
    },
    reload() {
      //从上一篇点下一篇
      this.$axios(api.news + this.$store.state.nowId).then(res => {
        this.articleData = res.data;
        this.articleData.body = this.replaceUrl(this.articleData.body);
      });
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.$nextTick(() => {
        Indicator.open({
          text: "加载中...",
          spinnerType: "fading-circle"
        });
        setTimeout(() => {
          Indicator.close();
        }, 2000);
      });
    }
  }
};
</script>


<style lang="stylus" scoped>
@import '../../node_modules/mint-ui/lib/spinner/style.css'
@import '../../node_modules/mint-ui/lib/indicator/style.css'
@import '../assets/stylus/mixin.styl'

.article
  font-size: pr(16)

  header
    height: 200px
    overflow: hidden
    position: absolute

  img
    width: 100vw
    position: relative
    bottom: 50%

  .layer
    width: 100%
    height: 100%
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.7),
      rgba(255, 255, 255, 0.2)
    )
    position: absolute
    top: 0

  &>span
    padding-left: pr(5)
    padding-right: pr(5)

  .title-postion
    display: block
    width: 100vw
    position: absolute
    /* bottom: calc(100vh * (2 / 3 + 0.1 / 3)); */
    bottom: 10%

  .title
    color: rgb(255, 255, 255)
    font-size: pr(20)
    font-weight: bolder
    padding: pr(10)
    text-shadow: 0px pr(2) pr(2) rgb(2, 2, 2)
    line-height: pr($line)

  .source
    display: block
    width: 100vw
    // height: calc(100vh * (0.1 / 3))
    position: absolute
    /* bottom: calc(100vh * (2 / 3)); */
    bottom: pr(10)
    font-size: pr(10)
    text-align: right
    padding-right: pr(10)
    color: rgba(200, 200, 200, 1)

  .article-body
    padding-bottom: pr(60)
</style>