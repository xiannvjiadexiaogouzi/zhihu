<template>
  <div id="welcome" v-if="hide">
    <img src="../assets/img/wel2.jpg" :class="{scale:loadScale}">
    <div class="wel-bottom">
      <logo/>
      <span>
        <h2>知乎日报</h2>
        <p>每天三次, 每次七分钟</p>
      </span>
    </div>
  </div>
</template>

<script>
import Logo from "./Logo";

export default {
  components: {
    Logo
  },
  data() {
    return {
      hide: true,
      loadScale: false
    };
  },
  created() {
    setTimeout(() => {
      this.loadScale = true;
      window.document.body.style.overflow = "hidden";
      document.addEventListener(
        "touchmove",
        () => {
          e => {
            e.preventDefault();
          };
        },
        false
      );
    }, 500);
    // setTimeout(() => {
    //   this.hide = false;
    // }, 4200);
  },
  methods: {}
};
</script>

<style lang="stylus" scoped>
@import '../assets/stylus/mixin.styl'

#welcome
  font-size: pr(16)
  z-index: 3
  position: absolute
  overflow: hidden

  .wel-bottom
    height: 15vh
    width: 100vw
    background: rgba(24, 24, 24, 1)
    position: absolute
    bottom: 0
    color: rgb(255, 255, 255)

  img
    width: 100%
    height: 90vh

  span
    display: inline-block
    position: absolute
    margin-top: pr(32)
    margin-left: -pr(-15)

    &>h2
      font-size: pr(24)
      margin-bottom: pr(15)

    &>p
      font-size: pr(20)

  .scale
    transition: transform 3.5s 0s
    -webkit-transition: transform 3.5s 0s
    transform: scale(1.1)
</style>
