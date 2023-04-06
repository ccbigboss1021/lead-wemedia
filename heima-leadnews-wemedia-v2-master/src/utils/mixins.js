export default {
  methods: {
    // 返回上级
    goBackPage () {
      this.$router.go(-1)
    },
    // TODO: confirmButton默认是聚焦状态
    async showDeleteConfirm (msg) {
      // if (msg && process.env.NODE_ENV === 'production') {
      //   const message = '演示系统，不支持此操作'
      //   this.$notify.info({
      //     title: '提示',
      //     message: message
      //   })
      //   return new Promise(function (resolve, reject) {
      //     reject(new Error(message))
      //   })
      // }
      return await this.$confirm(`删除后${msg}将不可找回，确认将${msg}删除吗？`, '删除', {
        confirmButtonText: '删除',
        confirmButtonClass: 'el-button--danger el-button--no-icon',
        cancelButtonText: '取消',
        cancelButtonClass: 'el-button--warning el-button--no-icon',
        closeOnClickModal: false,
        closeOnPressEscape: false
      })
    },
    // TODO: confirmButton默认是聚焦状态
    async showLogoutConfirm (msg) {
      return await this.$confirm('确认要退出登录吗？', '温馨提示', {
        confirmButtonText: '确定',
        confirmButtonClass: 'el-button--danger el-button--no-icon',
        cancelButtonText: '取消',
        cancelButtonClass: 'el-button--warning el-button--no-icon',
        closeOnClickModal: false,
        closeOnPressEscape: false
      })
    }
  }
}
