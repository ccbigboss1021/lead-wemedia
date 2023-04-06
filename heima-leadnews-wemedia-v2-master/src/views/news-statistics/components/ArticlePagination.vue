<template>
  <div>
    <section class="result">
      <el-table
        :data="list"
        :header-cell-style="setHeaderCellStyle"
        :cell-style="setCellStyle"
        highlight-current-row
      >
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column label="文章名称" prop="title" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column label="阅读量" prop="views"></el-table-column>
        <el-table-column label="评论量" prop="comment"></el-table-column>
        <el-table-column label="收藏量" prop="collection"></el-table-column>
        <el-table-column label="点赞量" prop="likes"></el-table-column>
        <!-- <el-table-column label="转发量" prop="forwardNum"></el-table-column> -->
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              type="text"
              class="el-button--success-text"
              @click="goToDetailAnalysis(scope.row)"
            >详细分析</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getList" />
  </div>
</template>

<script>
import Pagination from '@/components/pagination'
import { getNewsPageStatistics } from '@/api/statistics'

export default {
  name: 'ArticlePagination',
  components: {
    Pagination
  },
  props: ['date'],
  watch: {
    date: {
      handler (newVal) {
        const [beginDate, endDate] = newVal
        this.listQuery = {
          beginDate: beginDate,
          endDate: endDate,
          page: 1,
          size: 10
        }
        this.getList()
      },
      deep: true
    }
  },
  data () {
    return {
      listQuery: {
        beginDate: undefined,
        endDate: undefined,
        page: 1,
        size: 10
      },
      total: 0,
      list: []
    }
  },
  methods: {
    setHeaderCellStyle ({ row, column, rowIndex, columnIndex }) {
      return columnIndex !== 1 ? 'text-align: center;font-weight: 600;' : 'text-align: left;font-weight: 600;'
    },
    setCellStyle ({ row, column, rowIndex, columnIndex }) {
      return columnIndex !== 1 ? 'text-align: center;' : 'text-align: left;'
    },
    goToDetailAnalysis (row) {
      this.$router.push({ path: '/statistics/detail/' + row.id })
    },
    async getList () {
      const { total, data } = await getNewsPageStatistics(this.listQuery)
      this.total = total
      this.list = data
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/element-variables.scss';

.result {
  margin: 40px 0;
}

.el-pagination {
  border-top: 1px solid #ebeef5;
}
</style>
