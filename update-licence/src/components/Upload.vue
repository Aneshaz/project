<template>
  <div class="upload-pic">
    <div class="upload-pic-item" v-for="(item,index) in uploadList" :key="index">
      <div class="upload-btn" @click="click(item)">
        <img v-if="item.src" :src="item.src" class="upload">
        <div v-else class="upload-icon">
          <span>十</span>
        </div>
      </div>
      <div class="upload-text">{{item.desc}}</div>
    </div>
    <section v-show="showMask" class="mask">
      <img :src="current.demo">
      <div>
        <button @click="upload(1)">拍照</button>
        <button @click="upload(2)">相册</button>
        <button @click="cancel">取消</button>
      </div>
    </section>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import add from "@/assets/add.png";
import { uploadImg } from "@/api/index";

export default {
  data() {
    return {
      current: {},
      showMask: false
    };
  },
  computed: {
    ...mapState({
      uploadList: state => state.upload.uploadList
    })
  },
  methods: {
    ...mapMutations({
      updateList: "upload/updateList"
    }),
    click(item) {
      this.current = item;
      this.showMask = true;
    },
    cancel() {
      this.showMask = false;
    },
    async upload(type) {
      let res = await uploadImg(type);
      console.log(res);
      let index = this.uploadList.findIndex(item => item == this.current);
      console.log("index...", index);
      this.updateList({
        index,
        // src:
        //   "http://picture.eclicks.cn/g2//l//2019//01//02//454a564ad63ddda5_640_853.jpg"
        src: res.data.url
      });
      this.showMask = false;
    }
  }
};
</script>
