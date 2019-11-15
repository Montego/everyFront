<template>
  <div>
    <!--<v-btn class="col-sm-1" @click="refreshAll">O</v-btn>-->
    <div class="tree_control row">
      <v-btn class="col-sm-6" @click="collapseAll">Свернуть</v-btn>
      <v-btn class="col-sm-6" @click="expandAll">Развернуть</v-btn>
    </div>
    <div class="navigation-filter">
      <input type="text" v-model="treeFilter" placeholder="Найти по названию...">
    </div>
    <div v-if="role !=='admin'" class="wrapper">
      <tree :data="treeStoreUser" :options="treeOptionsUser" :filter="treeFilter" ref="tree" v-model="selectedNode"
            @node:selected="onNodeSelected">
        <div slot-scope="{ node }" class="node-container">
          <template>
            <v-icon v-if="node.data.type ==='folder'" class="col-sm-1" color="#D2B48C">folder</v-icon>
            <span class="text">{{ node.text }}</span>
          </template>
          <v-icon v-if="node.data.type ==='file'" class="col-sm-1" @click="downloadFile">cloud_download</v-icon>
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
            <v-icon v-else class="col-sm-1">attach_file</v-icon>
            <span class="text">{{ node.text }}</span>
            <v-icon class="control_icon col-sm-2" @mouseup.stop="editNode(node)">edit</v-icon>
            <v-icon class="control_icon col-sm-2" color="#FF0000" @mouseup.stop="removeNode(node)">remove</v-icon>
            <v-icon v-if="node.data.type==='folder'" class="control_icon col-sm-2" color="#20B2AA"
                    @mouseup.stop="addChildFolder(node)">create_new_folder
            </v-icon>
            <v-icon v-if="node.data.type==='folder'" class="control_icon col-sm-2" color="#20B2AA"
                    @mouseup.stop="addChildNode(node)">add
            </v-icon>
          </div>
        </div>
      </tree>
    </div>
  </div>

</template>

<script>
  import {mapGetters, mapState} from "vuex";
  import {AXIOS} from "../plugins/APIService";
  import Header from "../layots/Header";

  export default {
    name: "Workplace",
    components: {Header},
    data() {
      return {
        fileDescription: '',
        files: [],
        file: {
          id: '',
          name: '',
          date: '',
          description: ''
        },
        treeFilter: '',
      }
    },
    computed: {
      ...mapState('user', ['role',]),
      ...mapGetters('user', ['get_role']),
      ...mapState('tree', ['treeStore', 'treeOptionsUser', 'treeStoreUser',
        'treeOptionsAdmin', 'selectedNode', 'treeStoreFilesByParent',
      ]),
      ...mapGetters('tree', ['get_tree', 'get_treeOptionsUser', 'get_treeUser',
        'get_treeOptionsAdmin',
      ]),

      selectedNode: {
        get() {
          return this.$store.state.treeStore
        },
        set(value) {
          this.$store.commit('tree/uploadSelectedNode', value)
        }
      },
      treeStoreFilesByParent: {
        get() {
          return this.$store.state.treeStoreFilesByParent
        },
        set(value) {
          this.$store.commit('tree/uploadTreeStoreFilesByParent', value)
        }
      }
    },
    mounted() {
      this.$store.dispatch('tree/updateTree');
      this.$store.dispatch('tree/updateTreeUser');
      this.$refs.tree.setModel(this.treeStore);
      this.$refs.tree.setModel(this.treeStoreUser);

      this.$refs.tree.$on('node:editing:start', (node) => {
        console.log('Start editing: ' + node.text);
        this.$refs.tree.setModel(this.treeStore)
      });

      this.$refs.tree.$on('node:editing:stop', (node, isTextChanged) => {
        console.log('Stop editing: ' + node.text + ', ' + isTextChanged);
        this.$refs.tree.setModel(this.treeStore)
      })
    },
    methods: {
      onNodeSelected(node) {
        console.log(node.id);
        let parentId = node.id;
        AXIOS.get('treeStore/getAllFilesByParent/' + parentId)
          .then((response) => {
            let serverAnswer = response.data;
            this.$store.commit('tree/uploadTreeStoreFilesByParent', serverAnswer);
            console.log(response)
          }).catch(e => {
          this.errors.push(e)
        })
      },

      refreshAll() {
        this.$store.dispatch('tree/updateTree');
        this.$refs.tree.setModel(this.treeStore)
      },
      addFolder() {
        this.$refs.tree.append({
          text: "New folder",
          data: {
            text: "New folder",
            type: "folder"
          }
        });

        console.log("tree -> ", this.$refs.tree);

        let node = {
          children: [],
          data: this.$refs.tree.model[this.$refs.tree.model.length - 1].data,
          id: this.$refs.tree.model[this.$refs.tree.model.length - 1].id,
          isBatch: this.$refs.tree.model[this.$refs.tree.model.length - 1].isBatch,
          isEditing: this.$refs.tree.model[this.$refs.tree.model.length - 1].isEditing,
          parent: "",
          showChildren: true,
          states: this.$refs.tree.model[this.$refs.tree.model.length - 1].states,
          tree: this.$refs.tree.model[this.$refs.tree.model.length - 1].tree,
          type: this.$refs.tree.model[this.$refs.tree.model.length - 1].data.type,
          text: this.$refs.tree.model[this.$refs.tree.model.length - 1].data.text,
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
          AXIOS.put("/treeStore/editNode/" + id, (newName), config)
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

        let addedObj = node.children[node.children.length - 1];
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
          node.append({
            text: "New Node",
            type: "file",
            data: {
              type: "file",
              content: "",
              contentType: "",
              contentSize: 0
            }
          });
          let addedObj = node.children[node.children.length - 1];
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
        console.log('node for add child node(its a parent node,child ) ----', node);

      },

      collapseAll() {
        this.$refs.tree.collapseAll();
      },
      expandAll() {
        this.$refs.tree.expandAll();
      },

      changeRoleOnUser() {
        this.$store.dispatch('user/onChangeRole', "user");
      },
      changeRoleOnAdmin() {
        this.$store.dispatch('user/onChangeRole', "admin");
      },

    },

  }

</script>

<style scoped>

  .control_icon {
    padding-left: 4px;
    padding-right: 4px;
  }

  .control_icon:hover {
    border-radius: 50%;

    font-size: 1.2em;
    background: #D3D3D3;
    margin: 0;
  }

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

</style>
