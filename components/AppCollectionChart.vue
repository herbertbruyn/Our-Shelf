<template>
  <canvas ref="chart"></canvas>
</template>

<script>
import Chart from 'chart.js';
import { interpolateInferno } from 'd3-scale-chromatic';

 export default {
  name: 'AppCollectionChart',
  props: {
    type: {
      type: String,
      default: 'doughnut' 
    },
    responsive: {
      type: Boolean,
      default: false
    },
    legend: {
      type: Boolean,
      default: false
    },
    legendPosition: {
      type: String,
      default: 'top'
    },
    d3Scale: {
      required: false
    },
    label: {
      type: String,
      default: ''
    },
    dataset: {
      type: Object,
      validator: o => Array.isArray(o.labels) && Array.isArray(o.data)
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    dataset: {
      handler() {
        this.updateChart();
      },
      deep: true
    }
  },
  methods: {
    calculatePoint(i, intervalSize, colorRangeInfo) {
      const { colorStart, colorEnd, useEndAsStart } = colorRangeInfo;
      return useEndAsStart ? (colorEnd - (i * intervalSize)) : (colorStart + (i * intervalSize));
    },
    interpolateColors(dataLength, colorScale, colorRangeInfo) {
      const { colorStart, colorEnd } = colorRangeInfo;
      const colorRange = colorEnd - colorStart;
      const intervalSize = colorRange / dataLength;
      let colorPoint;
      let colorArray = [];
      for (let i = 0; i < dataLength; i++) {
        colorPoint = this.calculatePoint(i, intervalSize, colorRangeInfo);
        colorArray.push(colorScale(colorPoint));
      }
      return colorArray;  
    },
    getColors() {
      const dataLength = this.dataset.data.length;
      const colorScale = this.d3Scale || interpolateInferno;
      const colorRangeInfo = {
        colorStart: 0.2,
        colorEnd: 1,
        useEndAsStart: false
      };
      return this.interpolateColors(dataLength, colorScale, colorRangeInfo); 
    },
    getData() {
      let colors = this.getColors();
      return {
        labels: this.dataset.labels,
        datasets: [{
          label: this.label,
          backgroundColor: colors,
          hoverBackgroundColor: colors,
          data: this.dataset.data
        }]
      };
    },
    getOptions() {
      return {
        responsive: this.responsive,
        legend: {
          display: this.legend,
          position: this.legendPosition
        }
      };
    },
    updateChart() {
      let ctx = this.$refs.chart;
      if (ctx) {
        if (this.chart) {
          this.chart.data = this.getData();
          this.chart.update();
        } else {
          this.chart = new Chart(ctx, {
            type: this.type,
            data: this.getData(),
            options: this.getOptions()
          });
        }
      }
    }
  },
  mounted() {
    this.updateChart();
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
</script>