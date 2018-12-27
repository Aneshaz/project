<template>
  <div id="app">
    <button @click="changeNum('sub')">-</button>
    <span>{{this.$store.state.app.num}}</span>
    <button @click="changeNum('add')">+</button>
  </div>
</template>

<script>
export default {
  name: "app",
  mounted() {
    console.log(this.$store);
  },
  methods: {
    changeNum(type) {
      //this.$store.commit("changeNum", { payload: type });
      /* this.$store.commit({
        type: "app/changeNum",
        payload: type
      }); */
      this.$store
        .dispatch({
          type: "app/changeNumAsync",
          payload: type
        })
        .then(res => {
          console.log("异步操作完成！");
        });
    }
  }
};
</script>

<style lang="scss">
</style>
