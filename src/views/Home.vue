<template>
  <div class="home">
    <div class="headmenu">
      <div class="title">今日热文</div>
      <div class="search" @click="openSearch">
        <i :class="searchDate.getTime() === endDate.getTime() ? 'icon-rili' : 'icon-rili active'"/>
      </div>
    </div>
    <div class="slide-wrapper">
      <slide/>
    </div>
    <div class="list-wrapper">
      <articlelist :searchDate="searchDate" @deliverDate="deliverDate"/>
    </div>
    <div class="pick-wrapper">
      <mt-datetime-picker
        ref="picker"
        type="date"
        v-model="pickerDate"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        :startDate="startDate"
        :endDate="endDate"
        @confirm="handleDate"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Slide from "@/components/Slide";
import Articlelist from "@/components/Articlelist";

export default {
  name: "home",
  components: {
    Slide,
    Articlelist
  },
  data() {
    return {
      pickerDate: new Date(),
      searchDate: new Date(),
      startDate: new Date(2013, 2, 20),
      endDate: new Date()
    };
  },
  // computed:{
  //   searchDate(){
  //     // console.log(this.pickerDate)
  //     // return this.pickerDate
  //   }
  // },
  methods: {
    openSearch($event) {
      let target = $event.target || $event.srcElement;
      this.$refs.picker.open();
    },
    handleDate(date) {
      date.setTime(date.getTime() + 3600 * 1000 * 24);
      this.searchDate = date;
    },
    deliverDate(date) {
      let y = parseInt(date.substr(0, 4));
      let m = parseInt(date.substr(4, 2)) - 1;
      let d = parseInt(date.substr(6, 2));
      let newDate = new Date(y, m, d);
      this.pickerDate = newDate;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../assets/stylus/mixin.styl'

.home
  position: relative

  .headmenu
    padding: pr(10) pr(30)
    margin-bottom: pr(2)
    display: flex
    justify-content: space-between

    .title
      font-weight: 600
      font-size: pr(27)

    .search
      font-size: pr(27)
      font-weight: 900
      color: #000

    .active
      color: $blue

  .list-wrapper
    height: 100%
    // overflow auto
</style>
