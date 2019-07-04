<template>
  <div class="article-list">
    <div
      class="list-wrapper"
      v-infinite-scroll="loadmore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <div class="oneday-wrapper" v-for="(item,index) in stories" :key="index">
        <div class="date">
          <div class="day">{{adjustDay(item.date)}}</div>
          {{adjustDate(item.date)}}
        </div>
        <ul class="list">
          <li
            v-for="(news,index) in item.stories"
            :key="index"
            @click="openArticle($event, news.id)"
            :class="index === 0 ? 'first' : ''"
          >
            <!-- 第一篇文章 -->
            <div class="first-news" v-if="index === 0">
              <img v-lazy="replaceUrl(news.images[0])" :alt="news.title">
              <div class="title">{{news.title}}</div>
            </div>
            <!-- 其余文章列表 -->
            <div class="border" v-if="index > 0">
              <div>{{news.title}}</div>
              <img v-lazy="replaceUrl(news.images[0])" :alt="news.title">
            </div>
          </li>
        </ul>
      </div>

      <!-- 加载项 -->
      <div class="loading" v-show="loading">
        <mt-spinner type="fading-circle"/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import api from "../assets/js/api";

export default {
  name: "articleList",
  components: {},
  props: {
    searchDate: {
      type: Date,
      required: true
    }
  },
  watch: {
    searchDate() {
      let str = this.searchDate.toLocaleDateString();
      str = str.replace(/\/|\-/g, "/");
      let arr = str.split("/");
      arr.forEach((el,i) => {
        if (el.length < 2) {
          arr[i] = "0" + el;
        }
      });
      let date = arr.join('');
      this.getTimeData(date);
    }
  },
  data() {
    return {
      stories: [],
      date: "",
      loading: false,
      dateRange: []
    };
  },
  created() {
    this.$store.commit("CLEAR_ID_LIST", []);
    this.getLatestData();
  },
  methods: {
    //最新列表数据
    getLatestData() {
      this.$axios(api.newsLatest).then(res => {
        // console.log(res);
        this.stories.push(res.data);
        // this.getidList(res.data.stories);
        this.date = res.data.date;
        // this.$emit('deliverDate', res.data.date);
        this.today = res.data.date;
        this.getIdList(res.data.stories);
      });
    },
    //获取之前文章列表数据
    getBeforeData(daterange) {
      if (daterange) {
      }
      this.$axios(api.newsBefore + this.date).then(res => {
        if (!res.data.status) {
          this.date = res.data.date;
          this.stories.push(res.data);
          this.getIdList(res.data.stories);
        }
      });
    },
    //加载更多
    loadmore() {
      // if (this.dateRange && this.date == this.dateRange[0]) {
      //   this.loading = false;
      //   return;
      // }
      if (!this.loading) {
        this.loading = true;
        setTimeout(() => {
          this.getBeforeData();
          this.loading = false;
        }, 2000);
      }
    },
    //按时间查找
    getTimeData(searchDate) {
      if (!searchDate) {
        // this.dateRange = [];
        this.getLatestData();
      }
      this.date = searchDate;
      // this.dateRange = daterange;
      this.stories = [];
      this.loadmore();
    },
    //显示列表时间栏
    adjustDate(date) {
      if (this.today == date) return "Today";
      let y = date.substr(0, 4) + "年";
      let m = date.substr(4, 2) + "月";
      let d = date.substr(6, 2) + "日";
      return m + d;
    },
    //显示列表时间栏 - day
    adjustDay(date) {
      let y = parseInt(date.substr(0, 4));
      let m = parseInt(date.substr(4, 2)) - 1;
      let d = parseInt(date.substr(6, 2));
      let newDate = new Date(y, m, d);
      let day = newDate.getDay();
      switch (day) {
        case 0:
          return "星期日";
        case 1:
          return "星期一";
        case 2:
          return "星期二";
        case 3:
          return "星期三";
        case 4:
          return "星期四";
        case 5:
          return "星期五";
        case 6:
          return "星期六";
      }
    },
    //替换图片
    replaceUrl(oldurl) {
      return oldurl.replace(
        /http\w{0,1}:\/\/p/g,
        "https://images.weserv.nl/?url=p"
      );
    },
    //打开文章
    openArticle(e, id) {
      this.$store.commit("getId", id);
      this.openEffect(e);
      setTimeout(() => {
        this.$router.push({
          name: "article",
          params: {
            id
          }
        });
      }, 300);
    },
    //获取idlist
    getIdList(list) {
      let arr = [];
      list.forEach(el => {
        arr.push(el.id);
      });
      this.$store.commit("GET_ID_LIST", arr);
    },
    //点击图片特效
    openEffect(e) {
      let target = e.target || e.srcElement;
      if (target.className !== "border" || target.className !== "first-news") {
        target = target.parentNode;
      }
      if (target.className == "border" || target.className == "first-news") {
        target.style.transform = "scale(0.9)";
        target.style.boxShadow = "0 5px 6px 4px rgba(0, 0, 0, 0.3)";
        setTimeout(() => {
          target.style.transform = "scale(1)";
          if (target.className == "first-news") {
            target.style.boxShadow = "0 2px 4px 4px rgba(0, 0, 0, 0.1)";
          } else {
            target.style.boxShadow = "";
          }
        }, 250);
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../assets/stylus/mixin.styl'

.article-list
  background: rgb(255, 255, 255)
  font-size: pr(16)

  // line-height pr()
  .list-wrapper
    padding: 0 pr(30)

    div.oneday-wrapper
      margin: pr(8) 0
      // background lightyellow
      border-radius: 10px

      .date
        // background: rgb(0, 157, 243)
        width: 100%
        padding: pr(5) 0
        font-weight: 600
        font-size: pr(25)
        margin: pr(5) 0

        .day
          color: rgb(142, 141, 147)
          font-size: pr(16)
          font-weight: 400
          margin: pr(5) 0

      ul.list
        padding-bottom: pr(10)
        border-bottom: pr(1) solid rgba(2, 2, 2, 0.1)

        &>li
          line-height: pr(24)

          &.first>.first-news
            background: lightyellow
            width: 100%
            height: pr(300)
            position: relative
            overflow: hidden
            border-radius: 10px
            box-shadow: 0 2px 4px 4px rgba(0, 0, 0, 0.1)
            transition: all 0.5s ease

            &>img
              position: absolute
              width: 100%

            &>.title
              position: absolute
              // background lightgreen
              font-size: pr(20)
              font-weight: 900
              padding: 0 5%
              line-height: pr(25)
              bottom: 5%
              color: white
              text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.7)

          .border
            width: 100%
            height: 100%
            display: flex
            justify-content: space-between
            align-items: center
            border-radius: 10px
            transition: all 0.5s ease
            transform: scale(1)

            &>div
              padding: pr(10) 0
              margin-right: pr(10)
              height: pr(100)
              width: 100%
              display: flex
              align-items: center
              vertical-align: middle
              border-bottom: pr(1) solid rgba(2, 2, 2, 0.1)

            &>img
              padding: pr(10)
              flex: none
              width: pr(100)
              height: pr(100)

          &:last-child .border>div
            border: none

    .loading
      height: pr(50)
      padding: pr(10)
      display: flex
      justify-content: center
      align-items: center
</style>
