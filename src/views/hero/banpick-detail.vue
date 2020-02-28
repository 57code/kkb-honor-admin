<template>
  <div class="chart-container">
    <!-- 周期选择 -->
    <div class="range">
      <el-radio-group
        v-model="range"
        @change="onRangeChange"
      >
        <el-radio-button label="week">
          周
        </el-radio-button>
        <el-radio-button label="month">
          月
        </el-radio-button>
        <el-radio-button label="quarter">
          季度
        </el-radio-button>
        <el-radio-button label="year">
          年
        </el-radio-button>
      </el-radio-group>
    </div>
    <line-chart
      ref="chart"
      height="100%"
      width="100%"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LineChart from '@/components/Charts/LineChart.vue'
import { getBanpickDetail } from '@/api/heros'
import { BanPickDetailAndHero, RangeType, RangeData } from '@/api/types'
import echarts, { EChartOption } from 'echarts'
import { getDateArray } from '@/utils/gen-month-date'

@Component({
  name: 'BanPickDetail',
  components: {
    LineChart
  }
})
export default class extends Vue {
  range: RangeType = 'week';

  detail: BanPickDetailAndHero | null = null;

  async created() {
    const res = await getBanpickDetail(this.$route.params.id)
    this.detail = res.data.detail as BanPickDetailAndHero
    this.initChart()
  }

  onRangeChange() {
    this.initChart()
  }

  initChart() {
    if (!this.detail) {
      return
    }
    const heroName = this.detail.hero.name
    const banData = this.detail[this.range].ban
    const pickData = this.detail[this.range].pick
    const rangeData: RangeData = {
      week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      month: getDateArray(),
      quarter: ['一季度', '二季度', '三季度', '四季度'],
      year: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月']
    }
    const xAxisData = rangeData[this.range]
    const option: EChartOption<EChartOption.SeriesLine> = {
      backgroundColor: '#394056',
      title: {
        top: 20,
        text: heroName + '近期办选走势',
        textStyle: {
          fontWeight: 'normal',
          fontSize: 16,
          color: '#F1F1F3'
        },
        left: '1%'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        top: 20,
        icon: 'rect',
        itemWidth: 14,
        itemHeight: 5,
        itemGap: 13,
        data: ['禁用率', '登场率'],
        right: '4%',
        textStyle: {
          fontSize: 12,
          color: '#F1F1F3'
        }
      },
      grid: {
        top: 100,
        left: '2%',
        right: '2%',
        bottom: '2%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          data: xAxisData
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '百分比',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          axisLabel: {
            margin: 10,
            fontSize: 14
          },
          splitLine: {
            lineStyle: {
              color: '#57617B'
            }
          }
        }
      ],
      series: [
        {
          name: '登场率',
          type: 'line',
          // smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          // showSymbol: false,
          lineStyle: {
            width: 2
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(0, 136, 212, 0.3)'
                },
                {
                  offset: 0.8,
                  color: 'rgba(0, 136, 212, 0)'
                }
              ],
              false
            ),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10
          },
          itemStyle: {
            color: 'rgb(0,136,212)',
            borderColor: 'rgba(0,136,212,0.2)',
            borderWidth: 12
          },
          data: pickData
        },
        {
          name: '禁用率',
          type: 'line',
          // smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          // showSymbol: false,
          lineStyle: {
            width: 2
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(219, 50, 51, 0.3)'
                },
                {
                  offset: 0.8,
                  color: 'rgba(219, 50, 51, 0)'
                }
              ],
              false
            ) as any,
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10
          },
          itemStyle: {
            color: 'rgb(219,50,51)',
            borderColor: 'rgba(219,50,51,0.2)',
            borderWidth: 12
          },
          data: banData
        }
      ]
    }
    const chart = this.$refs.chart as LineChart
    chart.initChart(option)
  }
}
</script>

<style lang="scss" scoped>
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
