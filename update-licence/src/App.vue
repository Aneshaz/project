<template>
  <div id="app">
    <h2>补换驾照</h2>
    <button @click="login">点击登录</button>
  </div>
</template>

<script>
const JSBridge = require("./utils/JSBridge.js");

export default {
  name: "app",
  data() {
    return {};
  },
  methods: {
    login() {
      JSBridge.invoke("app", "login", {
        loginCallBackName: res => {
          console.log("res...", res);
        }
      });
    }
  }
};
</script>

<style lang="scss">
</style>
