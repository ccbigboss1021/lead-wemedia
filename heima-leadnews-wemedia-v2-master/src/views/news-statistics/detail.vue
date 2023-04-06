<template>
  <div class="filter-container bgc">
    <div class="filter">
      <el-page-header @back="goBack" content="文章数据详情"></el-page-header>
      <!-- TODO: 时间选择组件和日周月组件交互 -->
      <el-form ref="form" :inline="true" size="medium">
        <el-form-item label="数据时间：" style="margin-right: 30px;">
          <el-date-picker
            v-model="date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            placeholder="选择日期"
            style="width: 400px;"
            :picker-options="pickerOptions"
            :clearable="false"
            @change="handelDatePickerChange"
          />
        </el-form-item>
        <el-form-item>
          <day-week-month @handleChange="handleDayWeekMonthChange" />
        </el-form-item>
      </el-form>
    </div>

    <!-- 指标统计 -->
    <dimension-statist
      :statistList="newsDimension"
      :colorPlate1="colorPlate1"
      :colorPlate2="colorPlate2"
      :colorPlate3="colorPlate3"
    />

    <!-- 饼图分析 -->
    <pie-analysis :readingSources="readingSources" :readingCompletion="readingCompletion" />
  </div>
</template>

<script>
import DayWeekMonth from '@/components/day-week-month'
import DimensionStatist from './components/DimensionStatist'
import PieAnalysis from './components/PieAnalysis'
import myMixin from '@/utils/mixins'
import { getNewsDetailStatistics } from '@/api/statistics'

export default {
  name: 'ContentDetail',
  mixins: [myMixin],
  data () {
    return {
      date: null,
      params: {
        id: 0,
        beginDate: undefined,
        endDate: undefined
      },
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      newsDimension: [
        {
          icon: 'iconicon_tiaochulv_pjydjd',
          number: 0,
          unit: '%',
          text: '平均阅读进度'
        },
        {
          icon: 'iconicon_data_tiaochulv',
          number: 0,
          unit: '%',
          text: '跳出率'
        },
        {
          icon: 'iconicon_data_pjydsj',
          number: 0,
          text: '平均阅读时间（秒）'
        },
        {
          icon: 'iconicon_data_tjzfl',
          number: 0,
          text: '推荐转发量'
        },
        {
          icon: 'iconicon_data_pll',
          number: 0,
          text: '评论量'
        },
        {
          icon: 'iconicon_data_zydl',
          number: 0,
          text: '总阅读量'
        },
        {
          icon: 'iconicon_data_zydl',
          number: 0,
          text: '粉丝阅读量'
        }
      ],
      colorPlate1: ['#E5F6FF', '#E2F6E9', '#FFF0E9', '#F6F3FF', '#E2F6E9', '#FFF0E9', '#E5F6FF'],
      colorPlate2: ['#B7E6FF', '#C3E8D1', '#FFDAC9', '#D9D3FF', '#C3E8D1', '#FFDAC9', '#B7E6FF'],
      colorPlate3: ['#2C71FF', '#3BD396', '#FF562D', '#5A3ED4', '#3BD396', '#FF562D', '#2C71FF'],
      readingSources: [],
      readingCompletion: []
    }
  },
  components: {
    DayWeekMonth,
    DimensionStatist,
    PieAnalysis
  },
  created () {
    this.params.id = parseInt(this.$route.params.id, 10)
    this.getNewsDetailStatistics()
  },
  methods: {
    async getNewsDetailStatistics () {
      const { data: { dimension, readingSources, readingCompletion } } = await getNewsDetailStatistics(this.params)
      this.newsDimension[0].number = dimension.averageReadingSpeed
      this.newsDimension[1].number = dimension.bounceRate
      this.newsDimension[2].number = dimension.averageReadingTime
      this.newsDimension[3].number = dimension.recommendForwardingNum
      this.newsDimension[4].number = dimension.commentNum
      this.newsDimension[5].number = dimension.totalReadingNum
      this.newsDimension[6].number = dimension.fanReadingNum
      this.readingSources = readingSources
      this.readingCompletion = readingCompletion
    },
    goBack () {
      this.goBackPage()
    },
    handleDayWeekMonthChange (date) {
      this.date = date
      this.handelDatePickerChange()
    },
    handelDatePickerChange () {
      const [beginDate, endDate] = this.date
      this.params.beginDate = beginDate
      this.params.endDate = endDate
      this.getNewsDetailStatistics()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/element-variables.scss';

.filter-container {
  padding: 0 30px 30px;

  .filter {
    height: 78px;
    padding: 0;
    border-bottom: none;

    .el-form-item {
      margin-bottom: 0;
    }

    /deep/ .el-form-item__content {
      line-height: 1;
    }
  }
}
</style>
