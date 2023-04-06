<template>
  <div class="comment-item">
      <!-- 头像 -->
      <img :src="require('@/assets/fans/fans' + Math.floor(Math.random() * 15 + 1) + '.png')" class="avatar">
      <div class="detail">
        <!-- 昵称 -->
        <span class="authorName">{{ comment.apComments.authorName }}</span>
        <!-- 评论内容 -->
        <span class="content">{{ comment.apComments.content }}</span>
        <!-- 按钮区域 -->
        <div class="operation-box">
          <span class="createdTime">{{ comment.apComments.createdTime | dateTimeFormat }}</span>
          <div class="operation" @click="handleReplyComment(comment)">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconbtn_pinglun_nor" />
            </svg>
            <!-- TODO: 样式对齐 -->
            {{ isReply ? '取消回复' : '回复' }}&nbsp;{{ comment.apComments.reply || '' }}
          </div>
          <div class="operation" @click="handleLikeComment(comment)">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="comment.apComments.operation === 0 ? '#iconbtn_zan_sel' : '#iconbtn_zan_nor'" />
            </svg>
            {{ comment.apComments.operation === 0 ? '取消赞' : '赞' }}&nbsp;{{ comment.apComments.likes || '' }}
          </div>
          <div class="operation">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconbtn_tuijian_nor" />
            </svg>
            推荐
          </div>
          <div class="operation" @click="handleDeleteComment()">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconbtn_delete_nor" />
            </svg>
            删除
          </div>
        </div>
        <!-- 回复评论 -->
        <div v-if="isReply" class="commentReplyValue">
          <el-input
            type="textarea"
            placeholder="积极回复可以吸引更多人评论"
            v-model="commentReplyValue"
            :rows="6"
            maxlength="500"
          ></el-input>
          <el-button :class="commentReplyValue ? 'enable' : ''" class="submit" :disabled="!commentReplyValue" @click="handleSaveCommentRepay(comment)">发布</el-button>
        </div>
        <!-- 评论回复 -->
        <template v-for="(item, index) in comment.apCommentRepays">
          <comment-reply-item :apCommentRepay="item" :key="index" />
        </template>
      </div>
  </div>
</template>

<script>
import myMixin from '@/utils/mixins'
import CommentReplyItem from './CommentReplyItem.vue'

export default {
  name: 'CommentItem',
  mixins: [myMixin],
  props: ['comment'],
  components: {
    CommentReplyItem
  },
  data () {
    return {
      isReply: false,
      commentReplyValue: ''
    }
  },
  methods: {
    handleReplyComment () {
      this.isReply = !this.isReply
    },
    handleSaveCommentRepay () {
      this.$store.dispatch('comment/saveCommentRepay', { commentId: this.comment.apComments.id, content: this.commentReplyValue })
      this.isReply = false
      this.commentReplyValue = ''
      this.$message({ type: 'success', message: '发布评论成功' })

      // TODO: 异常处理
      // if (code === 200) {
      //   this.isReply = false
      //   this.commentReplyValue = ''
      //   this.$message({ type: 'success', message: '发布评论成功' })
      //   this.$emit('handleSaveCommentRepay')
      // } else {
      //   this.$message({ type: 'error', message: errorMessage })
      // }
    },
    handleLikeComment () {
      this.$store.dispatch('comment/likeComment', { commentId: this.comment.apComments.id, operation: this.comment.apComments.operation === 0 ? 1 : 0 })
      this.$message({ type: 'success', message: this.comment.apComments.operation === 0 ? '取消点赞成功' : '点赞成功' })

      // TODO: 异常处理
      // if (code === 200) {
      //   this.$message({ type: 'success', message: this.comment.apComments.operation ? '点赞成功' : '取消点赞成功' })
      // } else {
      //   this.$message({ type: 'error', message: errorMessage })
      // }
    },
    async handleDeleteComment () {
      try {
        await this.showDeleteConfirm('评论')

        this.$store.dispatch('comment/deleteComment', this.comment.apComments.id)
        this.$message({ type: 'success', message: '删除成功' })

        // TODO: 异常处理
        // const { code, errorMessage } = await deleteComment(this.comment.apComments.id)
        // if (code === 200) {
        //   this.$message({ type: 'success', message: '删除成功' })
        // } else {
        //   this.$message({ type: 'error', message: errorMessage })
        // }
      } catch (err) {
        this.$message({ type: 'info', message: '已取消删除' })
        console.log('err: ' + err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/element-variables.scss';

.comment-item {
  display: flex;
  padding-top: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid #EBEEF5;

  .avatar {
    width: 42px;
    height: 42px;
    margin-right: 10px;
  }

  .detail {
    display: flex;
    flex-direction: column;
    flex: 1;

    .authorName {
      font-weight: 600;
      color: $--color-text-primary;
    }

    .content {
      margin-top: 5px;
      color: $--color-text-primary;
    }

    .operation-box {
      display: flex;
      margin-top: 20px;

      .createdTime {
        flex: 1;
        color: $--color-text-secondary;
      }

      .operation {
        display: flex;
        align-items: center;
        margin-right: 30px;
        cursor: pointer;

        .icon {
          margin-right: 5px;
          font-size: 18px;
        }
      }
    }

    .commentReplyValue {
      position: relative;
      margin-top: 20px;

      .submit {
        position: absolute;
        bottom: 15px;
        right: 15px;
        width: 80px;
        height: 36px;
        padding: 0;
        background: $--background-color-base;
        border-radius: 4px;
        border: none;
        color: $--color-text-placeholder;
      }

      .enable {
        background: $--success-background-color;
        color: $--color-white;
      }
    }
  }
}
</style>
