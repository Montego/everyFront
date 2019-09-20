import {AXIOS} from "../../plugins/APIService";
export default {
  namespaced: true,
  state: {
    selectedNode: null,
    treeStore: [],

    treeOptionsUser: {
      multiple: false,
      filter: {
        plainList: true
      }
    },

    treeOptionsAdmin: {
      // minFetchDelay: 1000,
      // fetchData: (node) => {
      //   return Promise.resolve(data[node.id - 1])
      // },
      parentSelect: false,
      multiple: false,
      filter: {
        plainList: true
      }
    },
  },
  getters: {
    get_tree: state => {
      return state.treeStore;
    },
    get_treeOptionsUser: state => {
      return state.treeOptionsUser;
    },
    get_treeOptionsAdmin: state => {
      return state.treeOptionsUser;
    },
    get_selectedNode: state => {
      return state.selectedNode;
    },

  },
  mutations: {
    uploadTreeStore(state, payload) {
      state.treeStore = payload
    },
    uploadTreeOptionsUser(state, payload) {
      state.treeOptionsUser = payload
    },
    uploadSelectedNode(state, payload) {
      state.selectedNode = payload
    },

  },
  actions: {
    updateTree({commit}) {
      // AXIOS.get('/treeStore/getAll')
      AXIOS.get('/treeStore/getAllByLevel')
        .then((response) => {
          commit('uploadTreeStore', response.data)
          this.treeStore = response.data
        }).catch(e => {
        this.errors.push(e)
      })
    },
    // updateTree({commit}, payload) {
    //   context.commit('uploadTreeStore', payload)
    // },
    updateTreeOptionsUser({commit}, payload) {
      context.commit('uploadTreeOptionsUser', payload)
    },
    updateSelectedNode({commit}, payload) {
      context.commit('uploadSelectedNode', payload)
    }


  },
  mounted (){
    this.$store.dispatch('tree/updateTree');
  },
  computed: {

  },
  watch: {}

}
