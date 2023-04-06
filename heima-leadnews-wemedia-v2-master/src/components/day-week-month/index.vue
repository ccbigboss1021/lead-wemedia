<template>
  <div class="week-month-year">
    <div
      v-for="(item, index) in groupList"
      :key="index"
      :class="'item ' + (checkedIndex === index ? 'is-checked' : '')"
      @click="handleChange(index)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script>
import Moment from 'moment'

export default {
  name: 'DayWeekMonth',
  data () {
    const today = Moment().format('YYYY-MM-DD')
    return {
      checkedIndex: 0,
      groupList: [
        {
          label: '今日',
          start: today,
          end: today
        },
        {
          label: '本周',
          start: Moment().startOf('week').format('YYYY-MM-DD'),
          end: today
        },
        {
          label: '近7天',
          start: Moment().subtract(6, 'days').format('YYYY-MM-DD'),
          end: today
        },
        {
          label: '近30天',
          start: Moment().subtract(29, 'days').format('YYYY-MM-DD'),
          end: today
        }
      ]
    }
  },
  created () {
    this.handleChange(0)
  },
  methods: {
    handleChange (index) {
      this.checkedIndex = index
      this.$emit('handleChange', [this.groupList[index].start, this.groupList[index].end])
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/element-variables.scss';

.week-month-year {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  background-color: $--background-color-base;
  border-radius: 4px;

  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 28px;
    padding: 0 10px;
    font-size: 14px;
    color: $--color-text-secondary;
    cursor: pointer;
  }

  .is-checked {
    background-color: $--color-white;
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.06);
    border-radius: 4px;
    font-weight: 600;
    color: $--color-text-primary;
  }
}
</style>
