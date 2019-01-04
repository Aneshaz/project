<template>
  <div id="update-licence">
    <div class="header-process">
      <div
        class="process-item"
        :class="index==actInd?'active':''"
        v-for="(item,index) in processText"
        :key="item.processId"
      >
        <span>{{item.text}}</span>
      </div>
    </div>
    <div class="banner">
      <img src="http://picture.eclicks.cn/g2/img/r/2018/11/07/62e0398785c38983.jpg" alt>
    </div>
    <Upload/>
    <div class="service-list">
      <TypePicker/>
      <CityPicker/>
      <div class="service-item service-charge">
        <div class="charge-text">
          <span>服务费</span>
        </div>
        <div class="charge-price">
          <span>￥{{money?money:'399.00'}}</span>
        </div>
      </div>
    </div>
    <div class="discounts">
      <div class="discounts-text">
        <span>优惠</span>
      </div>
      <div class="discounts-find">
        <span>登录后查看优惠卷</span>
        <strong class="discounts-icon">&gt;</strong>
      </div>
    </div>
    <p class="FAQ">
      <a href="#">常见问题?</a>
    </p>
    <div class="footer-pay">
      <div class="pay-text">
        <span>实付:</span>
        <span class="pay-price">￥399</span>
      </div>
      <div class="pay-btn">
        <button @click="toPay">立即支付</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { goPay } from "@/api/index";

import Upload from "@/components/Upload";
import CityPicker from "@/components/CityPicker";
import TypePicker from "@/components/TypePicker";

export default {
  components: {
    Upload,
    CityPicker,
    TypePicker
  },
  data() {
    return {
      actInd: 0,
      processText: [
        {
          processId: 1,
          text: "订单提交"
        },
        {
          processId: 2,
          text: "填写收货地址"
        },
        {
          processId: 3,
          text: "正在办理"
        },
        {
          processId: 4,
          text: "办理完成"
        }
      ]
    };
  },
  computed: {
    ...mapState({
      money: state => state.cityPicker.money
    })
  },
  methods: {
    toPay() {
      goPay();
    }
  }
};
</script>
<style>
</style>

