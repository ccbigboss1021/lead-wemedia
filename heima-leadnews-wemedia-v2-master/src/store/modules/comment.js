import * as api from '@/api/comment'

const state = () => ({
  listBody: {
    articleId: '',
    page: 1,
    size: 10
  },
  commentList: []
})

const getters = {
  total: state => {
    return state.commentList.length
  }
}

const actions = {
  initCommentList: async ({ commit, state }, id) => {
    const listBody = { ...state.listBody }
    listBody.articleId = id
    listBody.page = 1

    const { data: commentList } = await api.getCommentList(listBody)
    commit('loadCommentList', { listBody, commentList })
  },
  loadCommentList: async ({ commit, state }) => {
    const listBody = { ...state.listBody }
    listBody.page++

    const { data: commentList } = await api.getCommentList(listBody)
    commit('loadCommentList', { listBody, commentList })
  },
  saveCommentRepay: async ({ commit, state }, data) => {
    const listBody = { ...state.listBody }
    listBody.page = 1

    await api.saveCommentRepay(data)

    const { data: commentList } = await api.getCommentList(listBody)
    commit('loadCommentList', { listBody, commentList })
  },
  likeComment: async ({ commit }, data) => {
    const { data: { likes } } = await api.likeComment(data)
    commit('likeComment', { commentId: data.commentId, likes: likes })
  },
  deleteComment: async ({ commit, state }, commentId) => {
    const listBody = { ...state.listBody }
    listBody.page = 1

    await api.deleteComment(commentId)

    const { data: commentList } = await api.getCommentList(listBody)
    commit('loadCommentList', { listBody, commentList })
  },
  deleteCommentRepay: async ({ commit, state }, commentRepayId) => {
    const listBody = { ...state.listBody }
    listBody.page = 1

    await api.deleteCommentRepay(commentRepayId)

    const { data: commentList } = await api.getCommentList(listBody)
    commit('loadCommentList', { listBody, commentList })
  }
}

const mutations = {
  loadCommentList (state, payload) {
    state.listBody = payload.listBody
    if (state.listBody.page === 1) {
      state.commentList = payload.commentList
    } else {
      state.commentList.push(...payload.commentList)
    }
  },
  likeComment (state, { commentId, likes }) {
    const item = state.commentList.find(item => { return item.apComments.id === commentId })
    item.apComments.likes = likes
    item.apComments.operation = item.apComments.operation === 0 ? 1 : 0
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
