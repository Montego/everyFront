import {AXIOS} from "../../plugins/APIService"

export default {
  namespaced: true,
  state: {
    answerFromServer: ''
  },
  getters: {
    get_answerFromServer: state => {
      return state.answerFromServer;
    }
  },
  mutations: {
    upload_answerFromServer(state, payload) {
      state.answerFromServer = payload
    },


  },
  actions: {

    onLoadAnswerFromServer({commit}) {
      AXIOS.get('/alive')
        .then((response) => {
          commit('upload_answerFromServer', response.data)
        }).catch(e => {
        this.errors.push(e)
      })
    },

  },
  computed: {}

}
