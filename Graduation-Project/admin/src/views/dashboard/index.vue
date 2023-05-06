<template>
  <div class="dashboard-container">
    <div class="dashboard-text">你好: {{ name }}</div>
    <chart ref="chart1" :options="orgOptions" :auto-resize="true" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      orgOptions: {}
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
    this.orgOptions = {
      backgroundColor: {
        image: bgPatternImg,
        repeat: 'repeat'
      },
      title: {
        text: '饼图纹理',
        textStyle: {
          color: '#235894'
        }
      },
      tooltip: {},
      series: [{
        name: 'pie',
        type: 'pie',
        selectedMode: 'single',
        selectedOffset: 30,
        clockwise: true,
        label: {
          fontSize: 18,
          color: '#235894'
        },
        labelLine: {
          lineStyle: {
            color: '#235894'
          }
        },
        data: [
          { value: 335, name: '直接访问' },
          { value: 310, name: '邮件营销' },
          { value: 234, name: '联盟广告' },
          { value: 135, name: '视频广告' },
          { value: 1548, name: '搜索引擎' }
        ]
        // itemStyle: itemStyle
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
