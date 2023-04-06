<template>
  <div class="filter-container bgc">
    <!-- 文章标题/创建时间 -->
    <div class="filter">
      <el-page-header @back="goBack" :content="title"></el-page-header>
      <span class="created-time">{{ createdTime | dateTimeFormat }}</span>
    </div>
    <!-- 全部评论/粉丝留言 -->
    <manage-tab-bar @handleChange="handleChange" />
    <!-- 评论列表 -->
    <comment-list v-show="!currentIndex" />
    <empty-data v-show="currentIndex" />
  </div>
</template>

<script>
import myMixin from '@/utils/mixins'
import ManageTabBar from './components/ManageTabBar.vue'
import CommentList from './components/CommentList.vue'
import EmptyData from '@/components/empty-data'

export default {
  name: 'CommentDetail',
  mixins: [myMixin],
  data () {
    return {
      title: '',
      createdTime: 0,
      currentIndex: 0
    }
  },
  components: {
    ManageTabBar,
    CommentList,
    EmptyData
  },
  created () {
    const { title, createdTime } = this.$route.query
    this.title = title
    this.createdTime = parseInt(createdTime, 10)
  },
  methods: {
    goBack () {
      this.goBackPage()
    },
    handleChange (index) {
      this.currentIndex = index
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

    .created-time {
      color: $--color-text-secondary;
      line-height: 20px;
    }
  }
}
</style>
