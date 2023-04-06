<template>
  <el-row class="pie-analysis">
    <el-col :span="12">
      <header>阅读来源分析</header>
      <pie-chart :chartData="readingSources" />
    </el-col>
    <el-col :span="12">
      <header>阅读完成度分析</header>
      <pie-chart :chartData="readingCompletion" />
    </el-col>
  </el-row>
</template>

<script>
import PieChart from '@/components/PieChart'

export default {
  name: 'PieAnalysis',
  props: ['readingSources', 'readingCompletion'],
  components: {
    PieChart
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/element-variables.scss';

.pie-analysis {
  margin-top: 80px;

  header {
    color: $--color-text-primary;
    font-size: 18px;
    font-weight: 600;
  }

  header::before {
    content: '\00A0';
    width: 4px;
    height: 18px;
    margin-right: 10px;
    border-radius: 3px;
    background: $--color-primary;
  }
}
</style>
