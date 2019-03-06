<template>
  <div class="reply" v-if="reply">
    <p class="errormsg" v-if="reply.status===1">{{reply.error_msg}}</p>
    <div v-if="reply.status===0" :class="{reply: showReply}">
      <span class="author">//{{reply.author}}</span>：
      <span class="reply-content">{{reply.content}}</span>
    </div>
    <span class="show-reply" v-if="reply.status===0" @click="showContent">{{showBtn}}</span>
  </div>
</template>

<script>
export default {
  props: {
    reply: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showReply: true,
      showBtn: "展开"
    };
  },
  methods: {
    showContent() {
      this.showBtn = this.showBtn === "展开" ? "收起" : "展开";
      this.showReply = !this.showReply;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../assets/stylus/mixin.styl'

.reply
  margin: pr(5) 0
  line-height pr(20)

  .errormsg
    margin: 0 !important
    height: pr(20)
    width: 100%
    background: rgb(245, 245, 245)

  .reply
    height: pr(20)
    overflow: hidden
    white-space: nowrap
    text-overflow: ellipsis

  .reply-content
    color: rgb(180, 180, 180)

  .show-reply
    float: right
    width: pr(40)
    text-align: center
    background: rgb(213, 227, 244)
</style>