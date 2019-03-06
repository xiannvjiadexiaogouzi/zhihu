<template>
  <div class="home">
    <!-- <div class="wel-wrapper">
      <welcome/>
    </div> -->
    <headmenu/>
    <slide/>
    <article-list/>
  </div>
</template>

<script>
// @ is an alias to /src
import Welcome from "@/components/Welcome";
import Headmenu from "@/components/Headmenu";
import Slide from "@/components/Slide";
import ArticleList from "@/components/ArticleList";

export default {
  name: "home",
  components: {
    Welcome,
    Headmenu,
    Slide,
    ArticleList
  },
  methods: {}
};
</script>

<style lang="stylus" scoped>
.home
  position relative
  .wel-wrapper
    position absolute
    width 100vw
    height 100vh
    
</style>
