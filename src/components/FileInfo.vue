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
            <tr>
              <th>Имя файла</th>
              <th>Дата обновления</th>
              <th>Краткое описание</th>
            </tr>
            <tr>
              <td><a href="#">rfrsjfsjdfjsdfjsjdf</a>
              </td>
              <td>3,5</td>
              <td>36</td>
            </tr>
            <tr>
              <td>35,5</td>
              <td>4</td>
              <td>36⅔</td>
            </tr>
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
              <!--{{this.selectedNode}}-->
              <label v-if="selectedNode.data.type === 'file' ">{{this.selectedNode.text}}</label>
            </div>

            <div class="col-sm-6">
              <label>Тип файла:</label>
            </div>
            <div v-if="selectedNode.data.contentType ===''" class="col-sm-6">
              <!--<textarea v-model="this.itemContentDTO.contentType"></textarea>-->
              <label class="col-sm-6">{{this.itemContentDTO.contentType}}</label>
            </div>
            <div v-else class="col-sm-6">
              <!--<textarea class="col-sm">{{this.selectedNode.data.contentType}}</textarea>-->
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
          </div>
          <div class="row">
            <div class="col-sm">
              <v-btn v-if="selectedNode.data.type === 'file'" @click="downloadFile"> скачать</v-btn>
            </div>
            <div v-if="this.role==='admin'" class="col-sm">
              <v-btn v-if="selectedNode.data.type === 'file' & itemContentDTO.content!=='' " @click="sendFile"> на
                сервер
              </v-btn>
              <v-btn v-else @click="sendFile" disabled> на сервер</v-btn>
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
  // import {} from "../plugins/download";
  import AdviserBob from "./AdviserBob";
  import {mapGetters, mapState} from "vuex";
  import {AXIOS} from "../plugins/APIService";

  export default {
    name: "FileInfo",
    data() {
      return {
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'left',
            sortable: false,
            value: 'name',
          },
          {text: 'Calories', value: 'calories'},
          {text: 'Fat (g)', value: 'fat'},
          {text: 'Carbs (g)', value: 'carbs'},
          {text: 'Protein (g)', value: 'protein'},
          {text: 'Iron (%)', value: 'iron'},
        ],
        desserts: [],


        itemContentDTO: {
          content: "",
          contentName: "",
          contentType: "",
          contentSize: 0,
          // type:"file"
        }

      }
    },
    mounted() {
      let download = document.createElement('script')
      download.setAttribute('src', '/src/plugins/download.js')
      document.head.append(download)
    },
    computed: {
      ...mapState('checkAliveServer', ['answerFromServer',]),
      ...mapGetters('checkAliveServer', ['get_answerFromServer']),
      ...mapState('user', ['role',]),
      ...mapGetters('user', ['get_role']),
      ...mapState('tree', ['selectedNode']),
      ...mapGetters('tree', ['get_selectedNode']),
    },
    methods: {
      getTest() {
        this.$store.dispatch('checkAliveServer/onLoadAnswerFromServer');
      },
      sendFile() {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };

        // console.log(node);
        let payload = this.itemContentDTO;
        // console.log('payload: ',payload)
        AXIOS.put("/itemContent/editItemContent/" + this.selectedNode.id, (payload), config)
          .then((response) => {
            console.log('itemContent', response.data);
          })
          .then(() => {
            this.itemContentDTO.content = "";
            this.itemContentDTO.contentName = "";
            this.itemContentDTO.contentType = "";
            this.itemContentDTO.contentSize = 0;
          })
          .catch((e) => {
            console.error(e);
          });
        this.$store.dispatch('tree/updateTree');
      },

      downloadFile() {
        let id = this.selectedNode.id;
        // window.open('http://localhost:8080/getOne/' + id);

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
    components: {AdviserBob}
  }
</script>

<style scoped>
  .table_files {
    width: 100%;
  }
  .bob {
    position: absolute; /* Абсолютное позиционирование */
    bottom: 15px; /* Положение от нижнего края */
    right: 15px; /* Положение от правого края */
    line-height: 1px;
  }
</style>
