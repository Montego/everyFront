<template>
  <div>
    <div>
      <h2 v-if="this.role!=='admin'">
        Информация о файлах:
      </h2>
      <h2 v-else>
        Информация о файле:
      </h2>
    </div>
    <div>
      <div v-if="this.role!=='admin'">
        <div v-if="selectedNode!== null && selectedNode.data.type === 'folder'">
          <table class="table_files" border="1">
            <thead>
            <tr>
              <th>
                Имя файла
              </th>
              <th>
                Дата обновления
              </th>
              <th>
                Краткое описание
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in treeStoreFilesByParent" align="center">
              <td>
                <a @click="downloadFileLikeUser(item.id)">{{item.text}}</a>
              </td>
              <td>{{item.data.formatDateTime}}</td>
              <td>{{item.data.description}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-else>
        <div v-if="selectedNode!== null && selectedNode.data.type !== 'folder'">
          <div class="row">
            <div class="col-sm-6">
              <label>Название файла:</label>
            </div>
            <div class="col-sm-6">
              <label v-if="selectedNode.data.type === 'file' ">{{this.selectedNode.text}}</label>
            </div>

            <div class="col-sm-6">
              <label>Тип файла:</label>
            </div>
            <div v-if="selectedNode.data.contentType ===''" class="col-sm-6">
              <label class="col-sm-6">{{this.itemContentDTO.contentType}}</label>
            </div>
            <div v-else class="col-sm-6">
              <label class="col-sm-6">{{this.selectedNode.data.contentType}}</label>
            </div>
            <div class="col-sm-6">
              <label>Размер файла:</label>
            </div>
            <div v-if="selectedNode.data.contentSize === 0" class="col-sm-6">
              <label>{{this.itemContentDTO.contentSize}}</label>
            </div>
            <div v-else class="col-sm-6">
              <label>{{this.selectedNode.data.contentSize}}</label>
            </div>
            <div class="col-sm-6">
              <label>Когда добавлен:</label>
            </div>
            <div class="col-sm-6">
              <label>{{this.selectedNode.data.formatDateTime}}</label>
            </div>
            <div class="col-sm">
              <label>
                Описание:
              </label>
              <textarea class="col-sm description_place" type="text" v-model="itemContentDTO.description">
              </textarea>
            </div>
          </div>
          <div class="row">
            <div class="col-sm">
              <v-btn v-if="selectedNode.data.type === 'file'" @click="downloadFile"> скачать</v-btn>
            </div>
            <div v-if="this.role==='admin'" class="col-sm">
              <!--<v-btn v-if="selectedNode.data.type === 'file' & itemContentDTO.content!=='' " @click="sendFile"> на-->
              <!--сервер-->
              <!--</v-btn>-->
              <v-btn @click="sendFile"> на сервер</v-btn>
            </div>
            <div class="col-sm" v-if="this.role==='admin'">
              <input class="col-sm" type="file" @change="uploadFile">
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import {mapGetters, mapState} from "vuex";
  import {AXIOS} from "../plugins/APIService";

  export default {
    name: "FileInfo",
    data() {
      return {
        itemContentDTO: {
          content: "",
          contentName: "",
          contentType: "",
          contentSize: 0,
          description: ""
        }
      }
    },
    mounted() {
      let download = document.createElement('script');
      download.setAttribute('src', '/src/plugins/download.js');
      document.head.append(download)
    },
    computed: {
      ...mapState('user', ['role',]),
      ...mapGetters('user', ['get_role']),
      ...mapState('tree', ['selectedNode', 'treeStoreFilesByParent']),
      ...mapGetters('tree', ['get_selectedNode', 'get_treeStoreFilesByParent']),
    },
    methods: {
      sendFile() {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        let payload = this.itemContentDTO;
        AXIOS.put("/itemContent/editItemContent/" + this.selectedNode.id, (payload), config)
          .then((response) => {
            console.log('itemContent', response.data);
          })
          .then(() => {
            this.itemContentDTO.content = "";
            this.itemContentDTO.contentName = "";
            this.itemContentDTO.contentType = "";
            this.itemContentDTO.contentSize = 0;
            this.itemContentDTO.description = "";
          })
          .catch((e) => {
            console.error(e);
          });
        this.$store.dispatch('tree/updateTree');
      },

      downloadFile() {
        AXIOS.get("/itemContent/getOne/" + this.selectedNode.id)
          .then((response) => {
            let content = response.data.content;
            let name = response.data.contentName;
            let type = response.data.contentType;
            download(content, name, type);
            console.log('itemContent', response.data);
          })
          .catch((e) => {
            console.error(e);
          });
      },

      downloadFileLikeUser(id) {
        window.open('http://localhost:8085/itemContent/getOneItem/' + id);
      },

      uploadFile(e) {
        console.log("argument of uploadFile's method", e);
        let file = e.target.files[0];

        if (file.name !== null) {
          this.itemContentDTO.contentName = file.name;
        }
        if (file.type !== null) {
          this.itemContentDTO.contentType = file.type;
        }
        if (file.size !== null) {
          this.itemContentDTO.contentSize = file.size;
        }

        let reader = new FileReader();
        reader.onloadend = () => {
          this.itemContentDTO.content = reader.result;
        };
        reader.readAsDataURL(file);
      },

    },
    components: {}
  }
</script>

<style scoped>
  .table_files {
    width: 100%;
  }

  .description_place {
    border: 1px grey solid;
  }
</style>
