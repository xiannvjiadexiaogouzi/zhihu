<template>
    <div>
        <canvas width="60px" height="60px" ref='cavs'/>
    </div>

</template>

<script>
export default {
  data() {
    return {
      pi: Math.PI,
      k: 0.25,
    };
  },
  mounted() {
    let canvas = this.$refs.cavs;
    let c = canvas.getContext("2d");

    let draw = () => {
      c.beginPath();
      c.arc(30, 30, 17, 0.5 * this.pi, 2 * this.k * this.pi, false);
      c.strokeStyle = "rgb(255, 255, 255)";
      c.lineWidth = 7;
      c.stroke();
      c.closePath();
    };

    let circle = setInterval(() => { //一定要写成箭头函数, 否则不执行
      if (this.k < 1) {
        this.k += 0.01;
        draw();
      } else {
        clearInterval(circle);
      }
    }, 50);
  },
  methods: {}
};
</script>

<style scoped>
div {
  display: inline-block;
  margin: 30px;
}
canvas {
  border: 2px solid rgb(255, 255, 255);
  border-radius: 20%;
}
</style>

