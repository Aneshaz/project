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
      this.$store.commit({
        type: "changeNum",
        payload: type
      });
    }
  }
};
</script>

<style lang="scss">
</style>
