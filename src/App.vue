<template>
  <div id="app">
    <transition :name="trans" mode="">
      <router-view />
    </transition>
  </div>
</template>

<script>
import Home from "./views/Home.vue";

export default {
  name: "app",
  data(){
    return{
      trans: '',
    }
  },
  watch: {
    $route(to, from){
      if(to.meta.index > from.meta.index){
        this.trans = 'move2right';
      }else{
        this.trans = 'move2left';
      }
    }
  },
  methods: {},
};
</script>

<style scoped>
@import "./assets/css/index.css";

</style>