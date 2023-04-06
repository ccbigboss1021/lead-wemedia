<template>
  <div>
    <!-- 粉丝概况/粉丝画像/粉丝列表 -->
    <manage-tab-bar />

    <div class="content-card">
      <el-card
        v-for="(item, index) in fansList"
        :key="index"
        :body-style="{ padding: '0px' }"
        shadow="hover"
      >
        <img class="image" :src="require('@/assets/fans/fans' + Math.floor(Math.random() * 15 + 1) + '.png')" />
        <div class="name">{{ item.name }}</div>
        <div class="operate">
          <div class="item">
            <el-button class="follow" @click="follow">关注</el-button>
          </div>
          <div class="item">
            <el-button class="contact" @click="contact">私信</el-button>
          </div>
        </div>
      </el-card>
    </div>
    <el-button class="loadmore" @click="loadmore">点击查看更多</el-button>
  </div>
</template>

<script>
import ManageTabBar from '../fans-statistics/components/ManageTabBar'

export default {
  name: 'FansList',
  data () {
    return {
      fansList: [
        {
          name: 'Tyler Pearson'
        },
        {
          name: 'Ophelia Bridges'
        },
        {
          name: 'Tyler Pearson'
        },
        {
          name: 'Ophelia Bridges'
        },
        {
          name: 'Ophelia Bridges'
        },
        {
          name: '覃妹艺'
        },
        {
          name: '尼芳'
        },
        {
          name: '苑婕'
        },
        {
          name: '辛翰力'
        },
        {
          name: '空黛枫'
        },
        {
          name: '阎澜菁'
        },
        {
          name: '扈霄芬'
        },
        {
          name: '蓬天宜'
        },
        {
          name: '字妍'
        },
        {
          name: '寇功宁'
        },
        {
          name: 'Tyler Pearson'
        },
        {
          name: 'Ophelia Bridges'
        },
        {
          name: 'Tyler Pearson'
        },
        {
          name: 'Ophelia Bridges'
        },
        {
          name: 'Ophelia Bridges'
        }
      ],
      params: {
        page: 1,
        size: 10
      },
      total: 0
    }
  },
  components: {
    ManageTabBar
  },
  methods: {
    follow () {
      this.tips()
    },
    contact () {
      this.tips()
    },
    loadmore () {
      this.tips()
    },
    tips () {
      if (process.env.NODE_ENV === 'production') {
        this.$notify.info({
          title: '提示',
          message: '演示系统，不支持此操作'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/element-variables.scss';

.content-card {
  display: flex;
  flex-wrap: wrap;

  .el-card {
    position: relative;
    width: 186px;
    height: 222px;
    margin-left: 30px;
    margin-bottom: 32px;
    border-radius: 6px;
    border: 1px solid $--background-color-base;
    background: $--color-white;

    .image {
      display: block;
      width: 72px;
      height: 72px;
      margin: 34px auto 0;
    }

    .name {
      margin-top: 19px;
      text-align: center;
      font-weight: 600;
      color: $--color-text-secondary;
    }

    .operate {
      display: flex;
      height: 57px;
      margin-top: 23px;
      justify-content: space-around;
      align-items: center;

      .item {
        display: flex;
        align-items: center;
        font-size: 12px;
        cursor: pointer;
      }

      .follow,
      .contact {
        width: 70px;
        height: 31px;
        padding: 0;
        border: none;
        background: $--background-color-base;
      }
    }
  }

  .el-card.is-always-shadow,
  .el-card.is-hover-shadow:focus,
  .el-card.is-hover-shadow:hover {
    -webkit-box-shadow: 0px 2px 8px 4px rgba(51, 53, 58, 0.07);
    box-shadow: 0px 2px 8px 4px rgba(51, 53, 58, 0.07);
  }
}

.loadmore {
  display: block;
  width: 207px;
  height: 50px;
  margin: 0 auto 32px;
  border-radius: 4px;
  border: none;
  background: #d6dff2;
  color: $--color-primary;
}
</style>
