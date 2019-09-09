<template>
  <div>

    <div class="tree_control row">
      <v-btn class="col-sm-6" @click="collapseAll">Свернуть все</v-btn>
      <v-btn class="col-sm-6" @click="expandAll">Развернуть все</v-btn>
    </div>

    <div class="navigation-filter">
      <input type="text" v-model="treeFilter" placeholder="Найти по названию...">
    </div>
    <div v-if="role ==='user'" class="wrapper">
      <tree :data="treeStoreUser" :options="treeOptionsUser" :filter="treeFilter" v-model="selectedNode">
        <div class="tree-scope" slot-scope="{ node }">
          <!--<template v-if="node.data.isRoot">-->
          <!--<span class="text">{{ node.text }}</span>-->
          <!--<span class="release" v-if="!node.hasChildren()">{{ node.data.release }}</span>-->
          <!--</template>-->
          <template>
            <v-icon v-if="node.hasChildren() && node.collapsed" class="col-sm-1" color="#D2B48C">folder</v-icon>
            <!--<i v-if="node.hasChildren() && node.expanded" class="fas fa-folder-open"></i>-->

            <span class="text">{{ node.text }}</span>
          </template>
          <i v-if="!node.hasChildren()" @click="downloadFile" class="col-sm-1 fas fa-download"></i>
        </div>
      </tree>
    </div>
    <div v-else>
      <tree :data="treeStoreAdmin" :options="treeOptionsAdmin" :filter="treeFilter" ref="tree" @node:checked="">
        <div slot-scope="{ node }" class="node-container">
          <v-icon v-if="node.hasChildren() && node.collapsed" class="col-sm-1" color="#D2B48C">folder</v-icon>
          <input v-if="!node.hasChildren()" type="file">
          <div class="node-text">
            {{ node.text }}
            <a href="#" @mouseup.stop="editNode(node)">Edit</a>
            <a href="#" @mouseup.stop="removeNode(node)">Remove</a>
            <a href="#" @mouseup.stop="addChildNode(node)">Add child</a>
          </div>
          <!--<div class="node-controls">-->
            <!--<a href="#" @mouseup.stop="editNode(node)">Edit</a>-->
            <!--<a href="#" @mouseup.stop="removeNode(node)">Remove</a>-->
            <!--<a href="#" @mouseup.stop="addChildNode(node)">Add child</a>-->
          <!--</div>-->
        </div>
      </tree>
    </div>
  </div>

</template>

<script>
  import {mapGetters, mapState} from "vuex";
  import AdviserBob from "./AdviserBob";

  export default {
    name: "Workplace",
    components: {AdviserBob},
    data() {
      return {
        treeFilter: '',
      }
    },
    computed: {
      ...mapState('checkAliveServer', ['answerFromServer',]),
      ...mapGetters('checkAliveServer', ['get_answerFromServer']),
      ...mapState('user', ['role',]),
      ...mapGetters('user', ['get_role']),
      ...mapState('tree', ['treeStoreUser', 'treeStoreAdmin', 'treeOptionsUser', 'treeOptionsAdmin']),
      ...mapGetters('tree', ['get_treeUser', 'get_treeStoreAdmin', 'get_treeOptionsUser', 'get_treeOptionsAdmin']),

      selectedNode: {
        get() {
          return this.$store.state.selectedNode
        },
        set(value) {
          this.$store.commit('tree/uploadSelectedNode', value)
        }
      }
    },
    methods: {
      editNode(node) {
      },
      removeNode(node) {
      },
      addChildNode(node) {
      },

      collapseAll() {
        // this.tree.collapseAll();
      },
      expandAll() {

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
    }
  }

</script>

<style scoped>
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
