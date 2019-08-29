// import {AXIOS_ADVICE} from "src/plugins/APIService";
// import {AXIOS} from "../../plugins/APIService";
import {AXIOS_ADVICE} from "../../../plugins/AxiosAdviceApi";

export default {
  namespaced: true,
  state: {
    advice:{
      id:'',
      text:''
    }
  },
  getters: {
    get_advice: state => {
      return state.advice;
    }
  },
  mutations: {
    upload_advice(state, payload) {
      state.advice = payload
    },


  },
  actions: {

    onLoadAdvice({commit}) {
      AXIOS_ADVICE.get()
        .then((response) => {
          commit('upload_advice', response.data)
        }).catch(e => {
        this.errors.push(e)
      })
    },

  },
  computed: {

  }

}
