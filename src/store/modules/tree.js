import {AXIOS} from "../../plugins/APIService";
export default {
  namespaced: true,
  state: {
    selectedNode: null,
    treeStore: [],
    treeStoreUser: [],

    treeOptionsUser: {
      parentSelect: true,
      multiple: false,
      filter: {
        plainList: true,
        emptyText: 'Ничего не найдено!',
      }
    },

    treeOptionsAdmin: {
      parentSelect: true,
      multiple: false,
      filter: {
        plainList: true,
        emptyText: 'Ничего не найдено!',
      }
    },
  },
  getters: {
    get_tree: state => {
      return state.treeStore;
    },
    get_treeUser: state => {
      return state.treeStoreUser;
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
    uploadTreeStoreUser(state, payload) {
      state.treeStoreUser = payload
    },
    uploadTreeOptionsUser(state, payload) {
      state.treeOptionsUser = payload
    },
    uploadSelectedNode(state, payload) {
      state.selectedNode = payload
    },

  },
  actions: {
    updateTreeUser({commit}) {
      AXIOS.get('/treeStore/getAllWithoutFiles')
        .then((response) => {
          commit('uploadTreeStoreUser', response.data)
          // this.treeStore = response.data

        }).catch(e => {
        this.errors.push(e)
      })
    },
    updateTree({commit}) {
      // AXIOS.get('/treeStore/getAll')
      AXIOS.get('/treeStore/getAllByLevel')
        .then((response) => {
          commit('uploadTreeStore', response.data)
          // this.treeStore = response.data

        }).catch(e => {
        this.errors.push(e)
      })
    },
    treeAfterLogin({commit}, payload) {
      commit('uploadTreeStore',payload)
    },
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
