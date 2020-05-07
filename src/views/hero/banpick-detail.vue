<template>
  <div class="chart-container">
    <!-- 周期选择 -->
    <div class="range">
      <el-radio-group v-model="range">
        <el-radio-button label="week">周</el-radio-button>
        <el-radio-button label="month">月</el-radio-button>
        <el-radio-button label="quarter">季度</el-radio-button>
        <el-radio-button label="year">年</el-radio-button>
      </el-radio-group>
    </div>
    <line-chart v-if="detail" :chart-data="chartData" height="100%"></line-chart>
    <p v-else>没有任何数据...</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { BanPickDetailAndHero, RangeType } from "../../api/types";
import { getBanpickDetail } from "../../api/heros";
import LineChart from './components/LineChart.vue'


// RangeData
const rangeData = {
  week: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  month: new Array(31).fill(1).map((v,i)=>(i+1)+''),
  quarter: ["一季度", "二季度", "三季度", "四季度"],
  year: new Array(12).fill(1).map((v,i)=>(i+1)+'月')
}

@Component({
  name: 'banpickDetail',
  components: {
    LineChart
  }
})
export default class extends Vue {
  // 数据
  detail: BanPickDetailAndHero | null = null;

  // 区间类型
  range: RangeType = 'week'

  async created() {
    const res = await getBanpickDetail(this.$route.params.id);
    this.detail = res.data.detail;
  }

  get chartData() {
    // 判断detail是否存在
    if (!this.detail) {
      return {
        heroName: '',
        xAxisData: [],
        banData: [],
        pickData: [],
      }
    }
    
    // 区间数据：['周一',...]
    const xAxisData = rangeData[this.range]
    const banData = this.detail[this.range].ban
    const pickData = this.detail[this.range].pick

    return {
      heroName: this.detail.hero.name,
      xAxisData, banData, pickData
    }
  }
}
</script>

<style scoped>
.range {
  padding: 20px;
  position: absolute;
  z-index: 10;
  left: -138px;
  width: 275px;
  margin: 0 50%;
}

.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>