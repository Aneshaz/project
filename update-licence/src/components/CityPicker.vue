<template>
  <div class="service-city">
    <div class="service-item service-issue-city">
      <div class="city-text">
        <span>当前驾照签发城市</span>
        <CityHelp/>
      </div>
      <div class="city-change" @click="selectIssue">
        <div class="city-change-text">{{city.length?city.join(' '):'请选择签发地'}}</div>
      </div>
    </div>
    <div class="service-item service-update-city">
      <div class="city-text">
        <span>可补换的签发城市</span>
        <CityHelp/>
      </div>
      <div class="city-change" @click="selectUpdate">
        <div class="city-change-text">{{cost.length?cost.join(' '):'请选择补换地'}}</div>
      </div>
    </div>
    <section id="issue-model" v-model="showCity">
      <van-popup v-model="showCity" position="bottom">
        <van-picker
          :columns="cityColumns"
          show-toolbar
          title="选择签发城市"
          ref="cityPicker"
          @change="cityChange"
          @cancel="cityCancel"
          @confirm="cityConfirm"
        />
      </van-popup>
    </section>
    <section id="cost-model" v-model="showCost">
      <van-popup v-model="showCost" position="bottom">
        <van-picker
          :columns="costColumns"
          show-toolbar
          title="选择补换城市"
          ref="costPicker"
          @change="costChange"
          @cancel="costCancel"
          @confirm="costConfirm"
        />
      </van-popup>
    </section>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import CityHelp from "./CityHelp";

export default {
  name: "CityPicker",
  components: {
    CityHelp
  },
  data() {
    return {
      showCity: false,
      showCost: false,
      cityColumns: [],
      costColumns: []
    };
  },
  created() {
    this.getCityList().then(res => {
      this.cityColumns = [
        {
          values: this.cityList.map(item => item.name)
        },
        {
          values: this.cityList[0].list.map(item => item.name)
        }
      ];
    });
  },
  computed: {
    ...mapState({
      cityList: state => state.cityPicker.cityList,
      city: state => state.cityPicker.city,
      costList: state => state.cityPicker.costList,
      cost: state => state.cityPicker.cost
    })
  },
  methods: {
    ...mapActions({
      getCityList: "cityPicker/getCityList",
      getCostList: "cityPicker/getCostList"
    }),
    ...mapMutations({
      updateState: "cityPicker/updateState"
    }),
    selectIssue() {
      this.showCity = true;
    },
    selectUpdate() {
      if (!this.city.length) {
        alert("请选择签发城市");
      } else {
        this.showCost = true;
        this.getCostList().then(res => {
          this.costColumns = [
            {
              values: this.costList.map(item => item.name)
            },
            {
              values: this.costList[0].list.map(item => item.name)
            }
          ];
        });
      }
    },
    cityChange(picker, values) {
      let index = this.cityList.findIndex(item => item.name == values[0]);
      this.$refs.cityPicker.setColumnValues(
        1,
        this.cityList[index].list.map(item => item.name)
      );
    },
    cityCancel() {
      this.showCity = false;
    },
    cityConfirm(values) {
      this.updateState({ city: values });
      this.cityCancel();
    },
    costChange(picker, values) {
      let index = this.costList.findIndex(item => item.name == values[0]);
      this.$refs.costPicker.setColumnValues(
        1,
        this.costList[index].list.map(item => item.name)
      );
    },
    costCancel() {
      this.showCost = false;
    },
    costConfirm(values) {
      this.updateState({ cost: values });
      this.costCancel();
    }
  }
};
</script>
