<template>
  <div class="comment-reply-item">
      <!-- 头像 -->
      <img :src="require('@/assets/fans/fans' + Math.floor(Math.random() * 15 + 1) + '.png')" class="avatar">
      <div class="detail">
        <!-- 昵称 -->
        <span class="authorName">{{ apCommentRepay.authorName }}</span>
        <!-- 评论内容 -->
        <span class="content">{{ apCommentRepay.content }}</span>
        <!-- 按钮区域 -->
        <div class="operation-box">
          <span class="createdTime">{{ apCommentRepay.createdTime | dateTimeFormat }}</span>
          <div class="operation" @click="handleDeleteCommentReply()">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconbtn_delete_nor" />
            </svg>
            删除
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import myMixin from '@/utils/mixins'

export default {
  name: 'CommentReplyItem',
  mixins: [myMixin],
  props: ['apCommentRepay'],
  methods: {
    async handleDeleteCommentReply () {
      try {
        await this.showDeleteConfirm('评论回复')

        this.$store.dispatch('comment/deleteCommentRepay', this.apCommentRepay.id)
        this.$message({ type: 'success', message: '删除成功' })

        // TODO: 异常处理
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

.comment-reply-item {
  display: flex;
  padding-left: 14px;
  padding-top: 30px;
  padding-bottom: 20px;

  .avatar {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }

  .detail {
    display: flex;
    flex-direction: column;
    flex: 1;

    .authorName {
      margin-top: 5px;
      font-weight: 600;
      color: $--color-text-primary;
    }

    .content {
      margin-top: 5px;
      color: $--color-text-primary;
    }

    .operation-box {
      display: flex;
      margin-top: 18px;

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
          margin-right: 10px;
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
