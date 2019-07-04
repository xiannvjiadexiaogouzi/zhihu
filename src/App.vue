<template>
  <div id="app">
    <transition :name="trans" mode>
      <router-view class="view"/>
    </transition>
  </div>
</template>

<script>
import Home from "./views/Home.vue";

export default {
  name: "app",
  components: {
    Home
  },
  data() {
    return {
      trans: ""
    };
  },
  watch: {
    $route(to, from) {
      if (to.name === "home" && from.name === null) {
        this.trans = "";
      } else {
        this.trans =
          to.meta.index > from.meta.index ? "move2right" : "move2left";
      }
    }
  },
  methods: {}
};
</script>

<style lang='stylus' scoped>
@import './assets/css/index.css'

.view
  position: absolute
  width: 100%
  // transition all 0.5s 0.25s
</style>