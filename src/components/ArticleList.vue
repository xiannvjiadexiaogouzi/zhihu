<template>
  <div ref="scrollwrapper" class="article-list">
    <div
      class="wrapper"
      v-infinite-scroll="loadmore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <ul v-for="(item,index) in stories" :key="index">
        <div v-if="item.date" :class="{timespan: item.date}">{{date2str(item.date)}}</div>
        <li v-for="(news,index) in item.stories" :key="index" @click="openArticle(news.id)">
          <!-- <div class="wrapper" v-if="item.images[0]"> -->
          <div>
            <span>{{news.title}}</span>
            <img v-lazy="replaceUrl(news.images[0])" :alt="news.title">
          </div>
          <!-- </div> -->
        </li>
      </ul>
      <!-- 加载项 -->
      <div class="loading" v-show="loading">
        <i class="el-icon-loading"/>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../assets/js/api";

export default {
  data() {
    return {
      loading: false,
      date: Number,
      stories: [], //总列表
      page: 0
    };
  },
  created() {
    this.$store.commit('CLEAR_ID_LIST',[])
    this.getTodayData();
    //将数据传入store ??
  },
  // mounted() {
  //   //监视scroll事件
  //   window.onscroll = this.loadmore;
  // },
  // updated() {
  //   //此时this.stories才会更新
  //   this.$store.commit("getidList", this.getidList);
  // },
  computed: {
    today() {
      let today = new Date();
      let y = today.getFullYear().toString();
      let m = (today.getMonth() + 1).toString();
      m = m.length === 1 ? "0" + m : m;
      let d = today.getDate().toString();
      d = d.length === 1 ? "0" + d : d;
      today = y + m + d;
      return today;
    }
  },
  // watch: {
  //   data: {
  //     handler(e) {
  //       //处理this.stories, 先处理时间, 后stories
  //       let obj = {};
  //       obj.date = this.data[this.page].date;
  //       this.stories.push(obj);
  //       this.stories = this.stories.concat(this.data[this.page].stories);
  //       // this.$nextTick(() => {
  //       this.$store.commit("getidList", this.getidList);
  //       this.page++;
  //       // });
  //     },
  //     deep: true
  //   }
  // },

  // stories: {
  //   handler() {
  //     this.$store.commit("getidList", this.getidList);
  //   },
  //   deep: true
  // },

  methods: {
    getTodayData() {
      this.$axios(api.newsLatest).then(res => {
        // console.log(res);
        let obj = {};
        obj.date = res.data.date;
        obj.stories = res.data.stories;
        this.stories.push(obj);
        this.date = this.today;
        this.getidList(res.data.stories);
      });
    },

    replaceUrl(oldurl) {
      return oldurl.replace(
        /http\w{0,1}:\/\/p/g,
        "https://images.weserv.nl/?url=p"
      );
    },
    openArticle(id) {
      //取得现在的id以及下一个id
      this.$store.commit("getId", id);
      //打开对应文章页面
      this.$router.push({
        name: "article",
        params: {
          id
        }
      });
      // console.log(id);
    },
    getidList(arr) {
      let list = [];
      arr.forEach(el => {
        if (el.id) {
          list.push(el.id);
        }
      });
      this.$store.commit("GET_ID_LIST", list);
    },
    date2str(d) {
      let y = d.substr(0, 4),
        m = d.substr(4, 2),
        date = d.substr(6, 2),
        day = new Date(y, m - 1, date).getDay();
      switch (day) {
        case 0:
          day = "日";
          break;
        case 1:
          day = "一";
          break;
        case 2:
          day = "二";
          break;
        case 3:
          day = "三";
          break;
        case 4:
          day = "四";
          break;
        case 5:
          day = "五";
          break;
        case 6:
          day = "六";
          break;
      }
      return m + "月" + date + "日" + " 星期" + day;
    },
    // 原先使用 vueScroller+原生来判断scroll
    // //判定scroll
    // scroller() {
    //   let scrollHeight =
    //       document.body.scrollTop || document.documentElement.scrollTop,
    //     windowHeight = window.innerHeight,
    //     bodyHeight = document.body.offsetHeight;
    //   // console.log(scrollHeight + ":" + windowHeight + ":" + bodyHeight);
    //   //判断高度移动高度+容器高度>=内容高度
    //   return scrollHeight + windowHeight >= bodyHeight;
    // },

    //加载更多
    loadmore() {
      // if (this.scroller()) {
      //   this.judgeDate(this.date);
      // console.log("more");
      if (!this.loading) {
        this.loading = true;
        setTimeout(() => {
          this.$axios(api.newsBefore + this.date).then(res => {
            // console.log(res);
            if (!res.data.status) {
              this.stories.push(res.data);
              this.date--;
              this.getidList(res.data.stories);
            }
            //     let obj = res.data;
            //     this.data.push(obj);
            //     this.$nextTick(() => {
            //       this.judgeDate(this.date);
            this.loading = false;
            //     });
            //     // //处理数据
            //     // this.$nextTick(() => {
            //     //   let dataObj = {};
            //     //   dataObj.date = this.data[this.page].date;
            //     //   this.stories.push(dataObj);
            //     //   this.stories = this.stories.concat(this.data[this.page].stories);
            //     //   this.$store.commit("getidList", this.getidList);
            //     // });
          });
        }, 2000);
      }
      // }
    },
    judgeDate(date) {
      //分成年、月、日
      let strDate = date.toString();
      let y = strDate.substr(0, 4);
      let m = strDate.substr(4, 2);
      let d = strDate.substr(6, 2);
      //日到00 -> 月-1，日变成上月最后一天
      if (d === "00") {
        d = new Date(y, m - 1, 0).getDate().toString();
        m = (m - 1).toString();
      }
      //判断是否为两位数字
      d = d.length === 1 ? "0" + d : d;
      m = m.length === 1 ? "0" + m : m;
      this.date = y + m + d;
    }
  }
};
</script>


<style lang="stylus" scoped>
@import '../assets/stylus/mixin.styl'

.article-list
  .wrapper
    display: flex
    flex-direction: column

  ul
    padding: 0 pr(15)
    list-style: none

  li
    box-sizing: border-box
    padding: pr(15) 0
    font-size: pr(16)
    line-height: pr(24)
    font-weight: 400
    border-bottom: pr(1) solid rgba(2, 2, 2, 0.1)
    display: flex
    justify-content: space-between

    &>div
      width: 100%

      &>span
        display: inline-block
        width: 75%

      &>img
        float: right
        width: 20%
        height: 100%

  .timespan
    display: flex
    justify-content: center
    align-items: center
    background: rgb(0, 157, 243)
    width: 100vw
    margin: 0 pr(-15)
    height: pr(35)
    text-align: center
    color: rgb(255, 255, 255)
    font-size: pr(16)
    font-weight: 600
    padding: 0

  .loading
    height: pr(60)
    padding: pr(5)
    display: flex
    justify-content: center
    align-items: center

    &>i
      line-height: pr(60)
      font-size: pr(20)
      margin: 0 auto
</style>