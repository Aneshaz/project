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
      <!-- <img src="banner.jpg" alt> -->
    </div>
    <Upload/>
    <div class="service-list">
      <div class="service-item service-type">
        <div class="type-text">
          <span>服务类型</span>
        </div>
        <div class="type-change" @click="changeType">
          <span>{{form.type}}</span>
          <strong class="type-icon">&gt;</strong>
        </div>
      </div>
      <div class="service-item service-issue-city">
        <div class="city-text">
          <span>当前驾照签发城市</span>
          <p class="city-help">
            <span>?</span>
          </p>
        </div>
        <div class="city-change" @click="selectIssue">
          <div class="city-change-text">请选择签发地</div>
        </div>
      </div>
      <div class="service-item service-update-city">
        <div class="city-text">
          <span>可补换的签发城市</span>
          <p class="city-help">
            <span>?</span>
          </p>
        </div>
        <div class="city-change">
          <div class="city-change-text">请选择补换地</div>
        </div>
      </div>
      <div class="service-item service-charge">
        <div class="charge-text">
          <span>服务费</span>
        </div>
        <div class="charge-price">
          <span>￥399</span>
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
        <button>立即支付</button>
      </div>
    </div>
    <section id="type-model" v-show="showType">
      <van-popup v-model="showType" overlay position="bottom">
        <van-picker
          :columns="typeArray"
          show-toolbar
          title="服务类型"
          @cancel="onTypeCancel"
          @confirm="onTypeConfirm"
        />
      </van-popup>
    </section>
  </div>
</template>
<script>
import Upload from "@/components/Upload";

export default {
  components: {
    Upload
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
      ],
      form: {
        type: "换驾照"
      },
      showType: false,
      typeArray: ["换驾照", "补驾照"]
    };
  },
  methods: {
    changeType() {
      this.showType = true;
    },
    selectIssue() {
      fetch("/api/ExchangeJiaZhao/cityList").then(res => {
        console.log(res);
      });
    },
    onTypeCancel() {
      this.showType = false;
    },
    onTypeConfirm(value) {
      this.form.type = value;
      this.onTypeCancel();
    }
  }
};
</script>
<style>
</style>

