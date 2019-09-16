<template>
  <div>

    <div class="tree_control row">
      <v-btn class="col-sm-6" @click="collapseAll">Свернуть все</v-btn>
      <v-btn class="col-sm-6" @click="expandAll">Развернуть все</v-btn>
    </div>

    <div class="navigation-filter">
      <input type="text" v-model="treeFilter" placeholder="Найти по названию...">
    </div>

    <div v-if="role !=='admin'" class="wrapper">

      <tree :data="treeStore" :options="treeOptionsUser" :filter="treeFilter" ref="tree" v-model="selectedNode">
        <div slot-scope="{ node }" class="node-container">
          <template>
            <v-icon v-if="node.hasChildren() && node.collapsed" class="col-sm-1" color="#D2B48C">folder</v-icon>
            <span class="text">{{ node.text }}</span>
          </template>
          <i v-if="node.data.type ==='file'" @click="downloadFile" class="col-sm-1 fas fa-download"></i>
        </div>
      </tree>

    </div>

    <div v-else>

      <div class="btn_add_folder">
        <v-btn class="col-sm-3" @click="addFolder">+ папка</v-btn>
      </div>

      <tree :data="treeStore" :options="treeOptionsAdmin" :filter="treeFilter" ref="tree" v-model="selectedNode">
        <div slot-scope="{ node }" class="node-container">

          <div class="node-text">
            <v-icon v-if="node.hasChildren() && node.collapsed" class="col-sm-1" color="#D2B48C">folder</v-icon>
            <!--<v-icon v-if="node.type='folder'" class="col-sm-1" color="#D2B48C">folder</v-icon>-->
            <span class="text">{{ node.text }}</span>
            <v-icon class="col-sm-1" @mouseup.stop="editNode(node)">edit</v-icon>
            <v-icon class="col-sm-1" color="#FF0000" @mouseup.stop="removeNode(node)">remove</v-icon>
            <v-icon v-if="node.type='folder'" class="col-sm-1" color="#20B2AA" @mouseup.stop="addChildNode(node)">add
            </v-icon>
          </div>
          <input v-if="node.data.type ==='file'" type="file">
          <!--{{node.data}}-->
        </div>
      </tree>

    </div>
  </div>

</template>

<script>
  import {mapGetters, mapState} from "vuex";
  import AdviserBob from "./AdviserBob";
  import {AXIOS} from "../plugins/APIService";

  export default {
    name: "Workplace",
    components: {AdviserBob},
    data() {
      return {
        treeFilter: '',
        options: {
          store: {
            store: this,
            getter: () => {
              return Store.getters.treeStore
            },
            dispatcher(treeStore) {
              Store.dispatch('updateTree', treeStore)
            }
          },
          checkbox: true
        }
      }
    },
    computed: {
      ...mapState('checkAliveServer', ['answerFromServer',]),
      ...mapGetters('checkAliveServer', ['get_answerFromServer']),
      ...mapState('user', ['role',]),
      ...mapGetters('user', ['get_role']),
      ...mapState('tree', ['treeStore', 'treeOptionsUser', 'treeOptionsAdmin']),
      ...mapGetters('tree', ['get_tree', 'get_treeOptionsUser', 'get_treeOptionsAdmin']),

      selectedNode: {
        get() {
          return this.$store.state.treeStore
        },
        set(value) {
          this.$store.commit('tree/uploadSelectedNode', value)
        }
      }
    },

    mounted() {
      this.$store.dispatch('tree/updateTree');

      this.$refs.tree.$on('node:editing:start', (node) => {
        console.log('Start editing: ' + node.text)
      });

      this.$refs.tree.$on('node:editing:stop', (node, isTextChanged) => {
        console.log('Stop editing: ' + node.text + ', ' + isTextChanged)
      })
    },
    methods: {
      addFolder() {
        this.$refs.tree.append({
          text: "New folder",
          data: {
            type: "folder"
          }
        });

        this.$store.commit('tree/uploadTreeStore', this.$refs.tree.model);
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        AXIOS.post("/treeStore/saveChange", (this.treeStore), config)
          .then((response) => {
            console.log('response data saveChange', response.data);
          })
          .catch((e) => {
            console.error(e);
          });
      },

      editNode(node, e) {
        node.startEditing();
        this.$store.commit('tree/uploadTreeStore', this.$refs.tree.model);
      },

      removeNode(node) {
        if (confirm('Вы уверены?')) {
          node.remove();
          console.log(node);
        }
        this.$store.commit('tree/uploadTreeStore', this.$refs.tree.model);
      },

      addChildNode(node) {
        if (node.enabled()) {
          // node.append('New Node')
          node.append({
            text: "New Node",
            data: {
              type: "file",
              fileContentL:
            }
          })
        }
        this.$store.commit('tree/uploadTreeStore', this.$refs.tree.model);

      },

      collapseAll() {
        this.$refs.tree.collapseAll();
      },
      expandAll() {
        this.$refs.tree.expandAll();
      },
      downloadFile() {
        console.log('====', this.selectedNode)
      },
      changeRoleOnUser() {
        this.$store.dispatch('user/onChangeRole', "user");
      },
      changeRoleOnAdmin() {
        this.$store.dispatch('user/onChangeRole', "admin");
      },
      getTest() {
        this.$store.dispatch('checkAliveServer/onLoadAnswerFromServer');
      },

      // getAdvice(){
      //   this.$store.dispatch('fuckingGreatAdvice/onLoadAdvice');
      // }
    },

  }

</script>

<style scoped>
  /*v-icon {*/
  /*font-size: 1.3em;*/
  /*}*/

  .btn_add_folder {
    padding-left: 11px;
  }

  .tree_control {
    padding-left: 23px;
    padding-right: 23px;
  }

  .navigation-filter {
    padding: 5px 10px;
  }

  .navigation-filter input {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    font-size: .875rem;
    background: #fff;
    border: 1px solid #d2d2d2;
    border-radius: 3px;
    padding: 6px;
    box-sizing: border-box;
  }

  .wrapper {
    /*min-height: 90vh;*/
    /*overflow: scroll;*/
  }

  .bob {
    position: absolute; /* Абсолютное позиционирование */
    bottom: 15px; /* Положение от нижнего края */
    right: 15px; /* Положение от правого края */
    line-height: 1px;
  }
</style>
