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
            <v-icon v-if="node.data.type ==='folder'" class="col-sm-1" color="#D2B48C">folder</v-icon>
            <span class="text">{{ node.text }}</span>
          </template>
          <v-icon v-if="node.data.type ==='file'" class="col-sm-1"  @click="downloadFile">cloud_download</v-icon>
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
            <v-icon v-if="node.data.type ==='folder'" class="col-sm-1" color="#D2B48C">folder</v-icon>
            <v-icon v-else class="col-sm-1" >attach_file</v-icon>
            <!--<v-icon v-if="node.type='folder'" class="col-sm-1" color="#D2B48C">folder</v-icon>-->
            <span class="text">{{ node.text }}</span>
            <v-icon class="col-sm-1" @mouseup.stop="editNode(node)">edit</v-icon>
            <v-icon class="col-sm-1" color="#FF0000" @mouseup.stop="removeNode(node)">remove</v-icon>
              <!--{{node}}-->
            <v-icon v-if="node.data.type==='folder'" class="col-sm-1" color="#20B2AA" @mouseup.stop="addChildFolder(node)">create_new_folder
            </v-icon>

            <v-icon v-if="node.data.type==='folder'" class="col-sm-1" color="#20B2AA" @mouseup.stop="addChildNode(node)">add
            </v-icon>
            <!--<input v-if="node.data.type ==='file'" type="file" @change="uploadFile(node)">-->
          </div>
          <!--<input v-if="node.data.type ==='file'" type="file" @change="uploadFile(node)">-->
          <!--{{addedFile}}-->
        </div>
        <!--{{this.selectedNode}}-->
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
        addedFile:"",
        selectedKindOfAddNode:"",
        selectOptionsKindOfAddNode:
          [
            {name:"folder"},
            {name:"file"},
          ],
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
      uploadFile(node) {

        // console.log('added file -----',e)
        // console.log('info file -----',e.target.files[0]);
        console.log('node -----',node);
        // console.log('selected node -----',this.selectedNode)
        // let file = e.target.files[0];
        // let reader = new FileReader();
        // reader.onloadend = (file) => {
        //   this.addedFile = reader.result;
        //
        //   this.imageOf= true;
        //   // this.base = reader.result;
        //   // console.log('RESULT',reader.result)
        // };
        // reader.readAsDataURL(file);

      },


      addFolder() {
        this.$refs.tree.append({
          text: "New folder",
          type: "folder",
          data: {
            type: "folder"
          }
        });

        console.log("tree -> ",this.$refs.tree);

        let node = {
          children: [],
          data: this.$refs.tree.model[this.$refs.tree.model.length-1].data,
          id: this.$refs.tree.model[this.$refs.tree.model.length-1].id,
          isBatch: this.$refs.tree.model[this.$refs.tree.model.length-1].isBatch,
          isEditing: this.$refs.tree.model[this.$refs.tree.model.length-1].isEditing,
          parent: "",
          showChildren: true,
          states: this.$refs.tree.model[this.$refs.tree.model.length-1].states,
          tree: this.$refs.tree.model[this.$refs.tree.model.length-1].tree,
          type: this.$refs.tree.model[this.$refs.tree.model.length-1].data.type,
          text: this.$refs.tree.model[this.$refs.tree.model.length-1].data.text,
          level: "root"
        };

        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };

        console.log(node);
        AXIOS.post("/treeStore/saveNode/", (node), config)
          .then((response) => {
            console.log('response data saveChange', response.data);
          })
          .catch((e) => {
            console.error(e);
          });
        this.$store.dispatch('tree/updateTree');

      },

      editNode(node, e) {
        node.startEditing();
        this.$refs.tree.$on('node:editing:stop', (node, isTextChanged) => {
          console.log('Stop editing: ' + node.text + ', ' + isTextChanged);
          let id = node.id;
          let newName = node.text;
          const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };
          AXIOS.put("/treeStore/editNode/"+id, (newName), config)
            .then((response) => {
              console.log('response data saveChange', response.data);
            })
            .catch((e) => {
              console.error(e);
            });
        });
      },

      removeNode(node) {
        if (confirm('Вы уверены?')) {
          node.remove();
          let id = node.id;
          const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };
          AXIOS.post("/treeStore/deleteNode/" + id, config)
            .then((response) => {
              console.log(response.data);
            })
            .catch((e) => {
              console.error(e);
            });
          console.log(node);
        }

      },

      addChildFolder(node) {
        if (node.enabled()) {
          node.append({
            text: "New Folder",
            type: "folder",
            data: {
              type: "folder",
            }
          })
        }

        let addedObj = node.children[node.children.length-1];
        let parentId = node.id;
        let addedNode = {
          children: [],
          data: addedObj.data,
          id: addedObj.id,
          isBatch: addedObj.isBatch,
          isEditing: addedObj.isEditing,
          parent: parentId,
          showChildren: true,
          states: addedObj.states,
          tree: addedObj.tree,
          type: addedObj.data.type,
          text: addedObj.data.text,
          level: "not root"
        };

        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };

        console.log(node);
        AXIOS.post("/treeStore/saveNodeAsChild/", (addedNode), config)
          .then((response) => {
            console.log('response data saveChange', response.data);
          })
          .catch((e) => {
            console.error(e);
          });
        this.$store.dispatch('tree/updateTree');
      },

      addChildNode(node) {
        if (node.enabled()) {
          // node.append('New Node')
          node.append({
            text: "New Node",
            type: "file",
            data: {
              type: "file",
              content: "",
              contentType:"",
              contentSize: 0
            }
          });
          let addedObj = node.children[node.children.length-1];
          let parentId = node.id;
          let addedNode = {
            children: [],
            data: addedObj.data,
            id: addedObj.id,
            isBatch: addedObj.isBatch,
            isEditing: addedObj.isEditing,
            parent: parentId,
            showChildren: true,
            states: addedObj.states,
            tree: addedObj.tree,
            type: addedObj.data.type,
            text: addedObj.data.text,
            level: "not root"
          };

          const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };

          console.log(node);
          AXIOS.post("/treeStore/saveNodeAsChild/", (addedNode), config)
            .then((response) => {
              console.log('response data saveChange', response.data);
            })
            .catch((e) => {
              console.error(e);
            });
          this.$store.dispatch('tree/updateTree');
        }
        console.log('node for add child node(its a parent node,child ) ----',node);

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
