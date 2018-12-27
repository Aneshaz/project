<template>
  <div class="stationPage">
    <div class="foundSwiper">
      <div class="tab">
        <router-link to="/index/found/recommend">个性推荐</router-link>
        <router-link to="/index/found/station">主播电台</router-link>
      </div>
      <div class="banner">
        <swiper-parent :banner="banner"></swiper-parent>
      </div>
    </div>
    <nav class="nav">
      <a href="#">
        <i class="icon iconfont icon-gongzuo"></i>
        <span>电台分类</span>
      </a>
      <a href="#">
        <i class="icon iconfont icon-zixun"></i>
        <span>电台排行</span>
      </a>
      <a href="#">
        <i class="icon iconfont icon-27"></i>
        <span>DI电音</span>
      </a>
      <a href="#">
        <i class="icon iconfont icon-tianmao1"></i>
        <span>小冰电台</span>
      </a>
    </nav>
  </div>
</template>
<script>
import swiperParent from "./swiperParent";

export default {
  name: "Station",
  data() {
    return {
      banner: [
        {
          id: 1,
          url: "banner1.jpg"
        },
        {
          id: 2,
          url: "banner2.jpg"
        },
        {
          id: 3,
          url: "banner3.jpg"
        },
        {
          id: 4,
          url: "banner4.jpg"
        }
      ],
      recommendList: []
    };
  },
  components: {
    swiperParent
  }
};
</script>
<style>
</style>
