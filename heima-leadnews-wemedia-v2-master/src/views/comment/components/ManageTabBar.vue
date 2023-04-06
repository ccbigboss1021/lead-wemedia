<template>
  <div class="tab">
    <div :class="{ 'active': currentIndex === 0 }" class="item" @click="handleChange(0)">全部评论<span class="count">{{ total }}</span></div>
    <div :class="{ 'active': currentIndex === 1 }" class="item" @click="handleChange(1)">粉丝留言<span class="count">8</span></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ManageTabBar',
  data () {
    return {
      currentIndex: 0
    }
  },
  computed: {
    ...mapGetters('comment', ['total'])
  },
  created () {
    this.currentPath = this.$route.path
  },
  methods: {
    handleChange (index) {
      this.currentIndex = index
      this.$emit('handleChange', index)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/element-variables.scss';

.tab {
  margin-top: 37px;
  margin-bottom: 34px;

  .item {
    position: relative;
    display: inline-block;
    margin-right: 30px;
    font-size: 18px;
    color: $--color-text-secondary;
    cursor: pointer;

    .count {
      position: relative;
      top: -12px;
      right: -4px;
      font-size: 12px;
    }
  }

  .active {
    position: relative;
    font-weight: 600;
    color: $--color-primary;
  }

  .active::after {
    content: '\25B2';
    position: absolute;
    top: 20px;
    left: 28px;
    font-size: 12px;
  }
}
</style>
