<template>
  <div :class="className" :style="{height: height, width: width}" />
</template>

<script lang="ts">
import echarts, { EChartOption } from "echarts";
import { Component, Prop, Watch, Mixins } from "vue-property-decorator";
import ResizeMixin from "@/components/Charts/mixins/resize";

export interface ILineChartData {
  heroName: string;
  xAxisData: string[];
  banData: number[];
  pickData: number[];
}

@Component({
  name: "LineChart"
})
export default class extends Mixins(ResizeMixin) {
  // chart-data
  @Prop({ required: true }) private chartData!: ILineChartData;
  @Prop({ default: "chart" }) private className!: string;
  @Prop({ default: "100%" }) private width!: string;
  @Prop({ default: "350px" }) private height!: string;

  @Watch("chartData", { deep: true })
  private onChartDataChange(value: ILineChartData) {
    this.setOptions(value);
  }

  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  }

  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  }

  private initChart() {
    this.chart = echarts.init(this.$el as HTMLDivElement, "macarons");
    this.setOptions(this.chartData);
  }

  private setOptions(chartData: ILineChartData) {
    if (this.chart) {
      this.chart.setOption({
        backgroundColor: "#394056",
        title: {
          top: 20,
          text: this.chartData.heroName + "近期办选走势",
          textStyle: {
            fontWeight: "normal",
            fontSize: 16,
            color: "#F1F1F3"
          },
          left: "1%"
        },
        tooltip: {
          trigger: "axis",
          formatter: ([f1, f2]: EChartOption.Tooltip.Format[]) => {
            const v1 = f1.data * 100 + "%";
            const v2 = f2.data * 100 + "%";
            return (
              "办选率<br>" +
              f1.marker +
              f1.seriesName +
              ":" +
              v1 +
              "<br>" +
              f2.marker +
              f2.seriesName +
              ":" +
              v2
            );
          }
        } as any,
        legend: {
          top: 20,
          icon: "rect",
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: ["禁用率", "登场率"],
          right: "4%",
          textStyle: {
            fontSize: 12,
            color: "#F1F1F3"
          }
        },
        grid: {
          top: 100,
          left: "2%",
          right: "2%",
          bottom: "2%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: "#57617B"
              }
            },
            data: this.chartData.xAxisData
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "百分比",
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: "#57617B"
              }
            },
            axisLabel: {
              margin: 10,
              fontSize: 14,
              formatter: function(value: number) {
                return value * 100 + "%";
              }
            },
            splitLine: {
              lineStyle: {
                color: "#57617B"
              }
            }
          }
        ],
        series: [
          {
            name: "登场率",
            type: "line",
            // smooth: true,
            symbol: "circle",
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
                    color: "rgba(0, 136, 212, 0.3)"
                  },
                  {
                    offset: 0.8,
                    color: "rgba(0, 136, 212, 0)"
                  }
                ],
                false
              ),
              shadowColor: "rgba(0, 0, 0, 0.1)",
              shadowBlur: 10
            },
            itemStyle: {
              color: "rgb(0,136,212)",
              borderColor: "rgba(0,136,212,0.2)",
              borderWidth: 12
            },
            data: this.chartData.pickData
          },
          {
            name: "禁用率",
            type: "line",
            // smooth: true,
            symbol: "circle",
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
                    color: "rgba(219, 50, 51, 0.3)"
                  },
                  {
                    offset: 0.8,
                    color: "rgba(219, 50, 51, 0)"
                  }
                ],
                false
              ) as any,
              shadowColor: "rgba(0, 0, 0, 0.1)",
              shadowBlur: 10
            },
            itemStyle: {
              color: "rgb(219,50,51)",
              borderColor: "rgba(219,50,51,0.2)",
              borderWidth: 12
            },
            data: this.chartData.banData
          }
        ]
      } as EChartOption<EChartOption.SeriesLine>);
    }
  }
}
</script>
