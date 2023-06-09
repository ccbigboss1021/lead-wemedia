import Vue from 'vue'
import Vuex, { createLogger } from 'vuex'
import comment from './modules/comment'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    comment
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
