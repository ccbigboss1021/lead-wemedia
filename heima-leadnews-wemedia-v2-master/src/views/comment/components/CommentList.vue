<template>
  <div>
    <template v-for="(item, index) in commentList">
      <comment-item :comment="item" :key="index" @handleSaveCommentRepay="initList" @handleDeleteComment="initList"/>
    </template>
    <el-button class="loadmore" @click="loadmore">点击查看更多</el-button>
  </div>
</template>

<script>
import CommentItem from './CommentItem.vue'
import { mapState } from 'vuex'

export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  computed: {
    ...mapState('comment', ['commentList'])
  },
  created () {
    this.initList()
  },
  methods: {
    initList () {
      const { id } = this.$route.params
      this.$store.dispatch('comment/initCommentList', id)
    },
    loadmore () {
      this.$store.dispatch('comment/loadCommentList')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/element-variables.scss';

.loadmore {
  display: block;
  width: 207px;
  height: 50px;
  margin: 28px auto 0;
  border-radius: 4px;
  border: none;
  background: #d6dff2;
  color: $--color-primary;
}
</style>
