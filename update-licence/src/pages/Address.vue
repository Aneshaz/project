<template>
  <div id="address-page">
    <HeaderProcess :actInd="actInd"/>
    <p class="address-title">收获地址</p>
    <div class="harvest-address">
      <div class="address-city">
        <div class="city-text">
          <span>联系省份</span>
        </div>
        <div class="city-change" @click="selectAddress">
          <div class="city-change-text">{{address.length?address.join(' '):'请选择收货地'}}</div>
        </div>
      </div>
      <section id="address-model" v-model="showAddress">
        <van-popup v-model="showAddress" position="bottom">
          <van-picker
            :columns="addressColumns"
            show-toolbar
            title="选择收货城市"
            ref="addressPicker"
            @change="addressChange"
            @cancel="addressCancel"
            @confirm="addressConfirm"
          />
        </van-popup>
      </section>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";

import HeaderProcess from "@/components/HeaderProcess";

export default {
  name: "Address",
  data() {
    return {
      actInd: 1,
      showAddress: false,
      addressColumns: []
    };
  },
  components: {
    HeaderProcess
  },
  created() {
    this.getAddressList().then(res => {
      this.addressColumns = [
        {
          values: this.addressList.map(item => item.name)
        },
        {
          values: this.addressList[this.addressSelectInd].list.map(
            item => item.name
          )
        },
        {
          values: this.addressList[this.addressSelectInd].list[0].list.map(
            item => item.name
          )
        }
      ];
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
      let index = this.addressList.findIndex(item => item.name == values[0]);
      this.updateState({ addressSelectInd: index });
      console.log(values);
      let ind = this.$refs.addressPicker.getColumnIndex(index);
      //   console.log(ind);
      this.$refs.addressPicker.setColumnValues(
        1,
        this.addressList[index].list.map(item => item.name)
      );
    },
    addressCancel() {
      this.showAddress = false;
    },
    addressConfirm(values) {
      this.updateState({ address: values });
      this.addressCancel();
    }
  }
};
</script>
