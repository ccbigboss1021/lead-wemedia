<template>
  <div class="filter-container bgc">
    <div class="filter">
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
            value-format="yyyy-MM-dd"
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

    <!-- 文章列表 -->
    <article-pagination :date="date" />
  </div>
</template>

<script>
import DayWeekMonth from '@/components/day-week-month'
import DimensionStatist from './components/DimensionStatist'
import ArticlePagination from './components/ArticlePagination'
import { getNewsDimensionStatistics } from '@/api/statistics'

export default {
  name: 'ContentStatist',
  data () {
    return {
      date: null,
      listQuery: {
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
          icon: 'iconicon_data_twfbl',
          number: 0,
          text: '图文发布量'
        },
        {
          icon: 'iconicon_data_dianzan',
          number: 0,
          text: '点赞数量'
        },
        {
          icon: 'iconicon_data_scsl',
          number: 0,
          text: '收藏数量'
        },
        {
          icon: 'iconicon_data_tjzfl',
          number: 0,
          text: '转发数量'
        }
      ],
      colorPlate1: ['#E5F6FF', '#E2F6E9', '#FFF0E9', '#F6F3FF'],
      colorPlate2: ['#B7E6FF', '#C3E8D1', '#FFDAC9', '#D9D3FF'],
      colorPlate3: ['#2C71FF', '#3BD396', '#FF562D', '#5A3ED4']
    }
  },
  components: {
    DayWeekMonth,
    DimensionStatist,
    ArticlePagination
  },
  methods: {
    async getNewsDimensionStatistics () {
      const { data: { publishNum, likesNum, collectNum, forwardNum } } = await getNewsDimensionStatistics(this.listQuery)
      this.newsDimension[0].number = publishNum
      this.newsDimension[1].number = likesNum
      this.newsDimension[2].number = collectNum
      this.newsDimension[3].number = forwardNum
    },
    handleDayWeekMonthChange (date) {
      this.date = date
      this.handelDatePickerChange()
    },
    handelDatePickerChange () {
      const [beginDate, endDate] = this.date
      this.listQuery.beginDate = beginDate
      this.listQuery.endDate = endDate
      this.getNewsDimensionStatistics()
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
