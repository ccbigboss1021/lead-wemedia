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
          />
        </el-form-item>
        <el-form-item>
          <day-week-month @handleChange="handleDayWeekMonthChange" />
        </el-form-item>
      </el-form>
    </div>

    <!-- 文章列表 -->
    <comment-pagination :date="date" />
  </div>
</template>

<script>
import DayWeekMonth from '@/components/day-week-month'
import CommentPagination from './components/CommentPagination'

export default {
  name: 'CommentList',
  data () {
    return {
      date: null,
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  components: {
    DayWeekMonth,
    CommentPagination
  },
  methods: {
    handleDayWeekMonthChange (date) {
      this.date = date
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
