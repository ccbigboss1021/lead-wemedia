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
        <el-table-column label="评论状态">
          <template slot-scope="scope">
            {{ scope.row.isComment ? '正常' : '关闭' }}
          </template>
        </el-table-column>
        <el-table-column label="评论总量" prop="comments"></el-table-column>
        <!-- <el-table-column label="粉丝评论数" prop="collectNum"></el-table-column> -->
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              type="text"
              class="el-button--success-text"
              @click="goToCommentDetailPage(scope.row)"
            >查看</el-button>
            <el-button
              type="text"
              :class="scope.row.isComment ? 'el-button--danger-text' : 'el-button--primary-text'"
              @click="handleUpdateCommentStatus(scope.row)"
            >{{ scope.row.isComment ? '关闭评论' : '打开评论' }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getList" />
  </div>
</template>

<script>
import Pagination from '@/components/pagination'
import { findNewsComments, updateCommentStatus } from '@/api/comment'

export default {
  name: 'CommentPagination',
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
    async getList () {
      const { total, data } = await findNewsComments(this.listQuery)
      this.total = total
      this.list = data
    },
    goToCommentDetailPage (row) {
      this.$router.push({ path: `/comment/detail/${row.id}?title=${row.title}&createdTime=${row.publishTime}` })
    },
    async handleUpdateCommentStatus (row) {
      try {
        await updateCommentStatus({ articleId: row.id, operation: row.isComment ? 0 : 1 })
        row.isComment = !row.isComment
        this.$message({ type: 'success', message: row.isComment ? '打开评论成功' : '关闭评论成功' })
      } catch (err) {
        console.log('err: ' + err)
      }
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
