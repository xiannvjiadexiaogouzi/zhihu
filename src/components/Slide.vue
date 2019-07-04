<template>
  <div class="slide">
    <div class="slide-item-wrapper" ref="itemWrapper">
      <div
        class="slide-item"
        v-for="(item,index) in pics"
        :key="index"
        :ref="'slideItem'+index"
        @click="openArticle($event, item.id)"
      >
        <img :src="replaceUrl(item.image)" alt>
        <div class="title">{{item.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../assets/js/api";

export default {
  components: {},
  data() {
    return {
      pics: [],
      index: 0,
      step: 0,
      userScrolling: false, //正在上下滚动
      dragging: false //拖动状态
    };
  },
  created() {
    this.getData();
    this.dragState = {}; //创建dragState拖动状态对象
  },
  mounted() {
    // console.log(this.$el);
    let element = this.$el; //.slide 这个节点
    // 为当前组件的dom节点 注册touch时间
    element.addEventListener("touchstart", event => {
      // if (this.prevent) event.preventDefault();
      // if (this.stopPropagation) event.stopPropagation();
      // if (this.animating) return; // 如果当前在执行移动动画, 直接返回
      // this.dragging = true; // 设置dragging状态标识
      // this.userScrolling = false; // 重置
      this.doOnTouchStart(event);
    });
    element.addEventListener("touchmove", event => {
      // if (!this.dragging) return;
      // if (this.timer) this.clearTimer(); // 将当前自动播放停止
      this.doOnTouchMove(event);
    });

    element.addEventListener("touchend", event => {
      if (this.userScrolling) {
        // 纵向滚动，重置状态并返回
        this.dragging = false;
        this.dragState = {};
        return;
      }
      // if (!this.dragging) return;
      // this.initTimer(); // 启动自动播放定时器
      this.doOnTouchEnd(event);
      this.dragging = false; // 重置拖动状态
    });
  },
  updated() {
    this.initialMove();
  },
  computed: {},
  methods: {
    //获取轮播热门文章信息
    getData() {
      this.$axios(api.newsLatest)
        .then(res => {
          // console.log(res);
          this.pics = res.data.top_stories;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // initialSlide() {
    //   // 获取屏幕width
    //   let pr = num => num / 100;
    //   let screenWidth = window.screen.width;
    //   let picWidth = screenWidth - 2 * pr(30);
    //   let picMargin = pr(10) / 2;
    //   let itemWidth = picWidth + picMargin * 2;
    //   let picNum = this.pics.length;
    //   this.$refs.itemWrapper.style.width = itemWidth * picNum + "rem";
    // },
    // update 后初始化 move 信息
    initialMove() {
      this.step = this.$refs.slideItem0[0].offsetWidth;
      let add = window.getComputedStyle(this.$refs.slideItem0[0])["marginLeft"];
      add = parseFloat(add);
      this.step += add * 2;
    },
    //滑动事件
    doOnTouchStart() {
      let el = this.$el; //.slide节点
      let dragState = this.dragState; // Slide.vue的状态，非绑定，客户端不能改变
      let touch = event.touches[0];
      // 设置dragstate的信息(也就是当前滑动的信息数据)
      dragState.startTime = new Date();
      dragState.startLeft = touch.pageX;
      dragState.startTop = touch.pageY;
      dragState.startTopAbsolute = touch.clientY;
      //每次滑动wrapper的起始点
      let wrapperStart = this.$refs.itemWrapper.style.transform;
      dragState.wrapperStart =
        parseFloat(wrapperStart.replace(/[^-?0-9\.]/g, "")) || 0;

      dragState.pageWidth = this.step;

      dragState.dragPage = el.children[0];
    },
    doOnTouchMove(event) {
      // if (this.noDrag) return;

      let dragState = this.dragState;
      let touch = event.touches[0];
      //记录当前滑动位置信息
      dragState.currentLeft = touch.pageX;
      dragState.currentTop = touch.pageY;
      dragState.currentTopAbsolute = touch.clientY;
      //计算滑动的距离
      let offsetLeft = dragState.currentLeft - dragState.startLeft;
      let offsetTop = dragState.currentTopAbsolute - dragState.startTopAbsolute;
      let distanceX = Math.abs(offsetLeft);
      let distanceY = Math.abs(offsetTop);
      // 判断是 竖向滚动,还是横向滚动
      if (distanceX < 5 || (distanceX >= 5 && distanceY >= 1.73 * distanceX)) {
        this.userScrolling = true; // 判定当前用户在上下滚动,就不执行drag动作
        return;
      } else {
        this.userScrolling = false;
        event.preventDefault(); // 阻止默认事件的触发,也就是点击事件的触发
      }
      // 设置最大的拖拽距离在当前dom里面
      offsetLeft = Math.min(
        Math.max(-dragState.pageWidth + 1, offsetLeft),
        dragState.pageWidth - 1
      );

      let towards = offsetLeft < 0 ? "next" : "prev"; // 拖动的方向的确定
      //随touch拖动移动
      this.translate(dragState.dragPage, dragState.wrapperStart, offsetLeft);
    },
    translate(element, start, offset, speed, callback) {
      let dis = start + offset;
      if (speed) {
        this.animating = true; // 当前正在执行动画,此时不能拖拽
        element.style.webkitTransition =
          "-webkit-transform " + speed + "ms ease-in-out"; // transition过渡状态
        setTimeout(() => {
          element.style.webkitTransform = `translateX(${dis}px)`;
        }, 50);

        let called = false;

        let transitionEndCallback = () => {
          if (called) return;
          called = true;
          this.animating = false; // 停止动画
          element.style.webkitTransition = "";
          element.style.webkitTransform = "";
          if (callback) {
            callback.apply(this, arguments); // 调用回调
          }
        };

        once(element, "webkitTransitionEnd", transitionEndCallback); // 此事件只执行一次
        // 防止低版本android, 无法触发此事件
        setTimeout(transitionEndCallback, speed + 100); // webkitTransitionEnd maybe not fire on lower version android.
      } else {
        element.style.transition = "all 0s linear";
        element.style.transform = `translateX(${dis}px)`;
      }
    },
    doOnTouchEnd() {
      // if (this.noDrag) return;

      let dragState = this.dragState;

      let dragDuration = new Date() - dragState.startTime;
      let towards = null; // 决定下面进入哪个页面, null: 当前页面, prev: 前一个页面, next: 下一个页面

      let offsetLeft = dragState.currentLeft - dragState.startLeft;
      let offsetTop = dragState.currentTop - dragState.startTop;
      let pageWidth = dragState.pageWidth;
      let index = this.index;
      let pageCount = this.pics.length;

      // 判断当前是否是 tap事件(轻触事件)
      if (dragDuration < 300) {
        let fireTap = Math.abs(offsetLeft) < 5 && Math.abs(offsetTop) < 5;
        if (isNaN(offsetLeft) || isNaN(offsetTop)) {
          fireTap = true;
        }
        if (fireTap) {
          // this.$children[this.index].$emit("tap"); // 当前轮播图item发送给外部的tab事件
        }
      }
      // 触发时长小于300ms,并且没有执行touchmove事件, 不处理
      if (dragDuration < 300 && dragState.currentLeft === undefined) return;

      if (dragDuration > 300 || Math.abs(offsetLeft) > pageWidth / 3) {
        // console.log(offsetLeft);
        towards = offsetLeft < 0 ? "next" : "prev";
      }

      //判断towards
      // 向前或向后 都回到当前页面
      if (
        (index === 0 && towards === "prev") ||
        (index === pageCount - 1 && towards === "next")
      ) {
        towards = null;
      }

      //判断index
      if (towards === "next") index++;
      if (towards === "prev") index--;
      this.index = index;

      //动画的方式切换到指定的item
      this.moveAnimation(index);

      this.dragState = {}; // 清空dragState
    },
    moveAnimation(index) {
      let t = -1;
      let dis = this.step * index * t;

      this.$refs.itemWrapper.style.transition = "all 0.25s linear";
      this.$refs.itemWrapper.style.transform = "translate(" + dis + "px)";
    },
    //关于图片盗链问题的, 替换原有的url
    replaceUrl(oldurl) {
      // console.log(oldurl);
      return oldurl.replace(
        /http\w{0,1}:\/\/p/g,
        "https://images.weserv.nl/?url=p"
      );
    },
    openEffect(e) {
      let target = e.target || e.srcElement;
      if (target.className !== "slide-item") {
        target = target.parentNode;
      }
      if (target.className == "slide-item") {
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
    },
    openArticle(e, id) {
      //取得现在的id
      this.$store.commit("getId", id);
      //打开对应文章页面
      this.openEffect(e);
      setTimeout(() => {
        this.$router.push({
          name: "article",
          params: {
            id
          }
        });
      }, 300);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../assets/stylus/mixin.styl'

.slide
  height: pr(250)
  overflow: hidden
  width: 100%
  margin: 0 auto
  position: relative
  overflow-x: auto

  &::-webkit-scrollbar
    width: 0 !important
    height: 0 !important

  .slide-item-wrapper
    position: absolute
    overflow: hidden
    height: 100%
    padding: 0 pr(22.5)
    display: flex
    transition: all 0.5s linear

    .slide-item
      width: calc(100vw - 0.6rem)
      height: 95%
      margin: 0 pr(7.5)
      border-radius: 10px
      overflow: hidden
      position: relative
      box-shadow: 0 2px 4px 4px rgba(0, 0, 0, 0.1)
      transition: all 0.5s ease

      &>img
        margin: 0
        width: calc(100vw - 0.6rem)

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
        // transition all 0.25s linear
</style>