<template>
  <div id="address-page">
    <HeaderProcess :actInd="actInd"/>
    <p class="address-title">收获地址</p>
    <div class="harvest-address">
      <div class="address-city contact-item">
        <div class="city-text">
          <span>联系省份</span>
        </div>
        <div class="city-change" @click="selectAddress">
          <div class="city-change-text">{{address.length?address.join(' '):'请选择收货地'}}</div>
        </div>
      </div>
      <div class="detailed-address contact-item">
        <div class="detailed-text">
          <span>详细地址</span>
        </div>
        <div class="detailed-change">
          <input type="text" v-model="detailedAddress" @input="addDetail">
        </div>
      </div>
      <div class="contact-number contact-item">
        <div class="number-text">
          <span>联系电话</span>
        </div>
        <div class="number-change">
          <input type="text" v-model="contactNumber" placeholder="请输入联系电话" @input="addTel">
        </div>
      </div>
      <div class="contact-man contact-item">
        <div class="man-text">
          <span>联系人</span>
        </div>
        <div class="man-change">
          <input type="text" v-model="contactMan" placeholder="请输入联系人" @input="addMan">
        </div>
      </div>
      <section id="address-model" v-model="showAddress">
        <van-popup v-model="showAddress" position="bottom">
          <van-area
            :area-list="addressColumns"
            :columns-num="3"
            title="选择收货城市"
            ref="addressPicker"
            @change="addressChange"
            @cancel="addressCancel"
            @confirm="addressConfirm"
          />
        </van-popup>
      </section>
    </div>
    <Custom/>
    <RedPacket/>
    <div class="sure-btn">
      <button @click="sumbitMessage" :class="submitAct?'active':''">确认</button>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";

import HeaderProcess from "@/components/HeaderProcess";
import Custom from "@/components/Custom";
import RedPacket from "@/components/RedPacket";

export default {
  name: "Address",
  data() {
    return {
      actInd: 1,
      showAddress: false,
      addressColumns: {},
      detailedAddress: "",
      contactNumber: "",
      contactMan: "",
      messageFlag: [false, false, false, false],
      submitAct: false
    };
  },
  components: {
    HeaderProcess,
    Custom,
    RedPacket
  },
  created() {
    this.getAddressList().then(res => {
      this.addressColumns = this.addressList;
    });
  },
  computed: {
    ...mapState({
      addressList: state => state.cityPicker.addressList,
      address: state => state.cityPicker.address,
      addressSelectInd: state => state.cityPicker.addressSelectInd
    })
  },
  methods: {
    ...mapActions({
      getAddressList: "cityPicker/getAddressList"
    }),
    ...mapMutations({
      updateState: "cityPicker/updateState"
    }),
    selectAddress() {
      this.showAddress = true;
    },
    addressChange(picker, values) {
      // console.log(values);
      // let index = this.addressList.findIndex(item => item.name == values[0]);
      // this.updateState({ addressSelectInd: index });
      // console.log(values);
      // let ind = this.$refs.addressPicker.getColumnIndex(index);
      // //   console.log(ind);
      // this.$refs.addressPicker.setColumnValues(
      //   1,
      //   this.addressList[index].list.map(item => item.name)
      // );
    },
    addressCancel() {
      this.showAddress = false;
    },
    addressConfirm(values) {
      // console.log(values);
      let newValues = [];
      values.forEach(item => {
        newValues.push(item.name);
      });
      console.log(newValues);
      this.updateState({ address: newValues });
      this.messageFlag[0] = true;
      this.changeAct();
      this.addressCancel();
    },
    sumbitMessage() {
      let flagInd = this.messageFlag.findIndex(item => {
        return !item;
      });
      if (flagInd == 0) {
        this.$toast("请选择联系省份");
      } else if (flagInd == 1) {
        this.$toast("请输入详细地址");
      } else if (flagInd == 2) {
        this.$toast("请正确输入联系电话");
      } else if (flagInd == 3) {
        this.$toast("请正确输入联系人");
      } else {
        this.$toast.success("提交成功");
      }
    },
    addDetail() {
      if (this.detailedAddress != "") {
        if (this.detailedAddress.length >= 5) {
          this.messageFlag[1] = true;
        } else {
          this.messageFlag[1] = false;
        }
      }
      this.changeAct();
    },
    addTel() {
      let telReg = /^1[3,5,6,7,8]\d{9}$/;
      if (this.contactNumber != "") {
        this.messageFlag[2] = telReg.test(this.contactNumber);
      }
      this.changeAct();
    },
    addMan() {
      if (this.contactMan != "") {
        if (this.contactMan.length >= 2) {
          this.messageFlag[3] = true;
        } else {
          this.messageFlag[3] = false;
        }
      }
      this.changeAct();
    },
    changeAct() {
      this.submitAct = this.messageFlag.every(item => {
        return item;
      });
    }
  }
};
</script>
