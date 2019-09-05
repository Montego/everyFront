import {AXIOS} from "../../plugins/APIService"

export default {
  namespaced: true,
  state: {
    role: 'user',
    listInfo:[]
  },
  getters: {
    get_role: state => {
      return state.role;
    }
  },
  mutations: {
    upload_role(state, payload) {
      state.role = payload
    },

  },
  actions: {
    onChangeRole({commit},payload) {
      commit('upload_role', payload)
    }


  },
  computed: {}

}
