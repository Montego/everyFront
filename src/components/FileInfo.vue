<template>
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
        <label>{{this.itemContentDTO.contentType}}</label>
      </div>
      <div v-else class="col-sm-6">
        <!--<textarea class="col-sm">{{this.selectedNode.data.contentType}}</textarea>-->
        <label >{{this.selectedNode.data.contentType}}</label>
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
      <div class="col-sm-6">
        <label>Кем добавлен:</label>
      </div>
      <div class="col-sm-6">
        <label>значение</label>
      </div>

    </div>
    <div class="row">
      <div class="col-sm">
        <v-btn v-if="selectedNode.data.type === 'file' "  @click="downloadFile"> скачать</v-btn>
      </div>

      <div v-if="this.role==='admin'" class="col-sm" >
        <v-btn v-if="selectedNode.data.type === 'file' " @click="sendFile"> сохранить</v-btn>
      </div>

      <div v-if="this.role==='admin'">
        <input type="file" @change="uploadFile" >
      </div>

      <!--<a href=this.path download="proposed_file_name">Download</a>-->
      <!--{{selectedNode}}-->
      <!--<v-uploader :preview="false" button-text="сохранить" @done="uploadDone" ></v-uploader>-->

      <!--<v-uploader :multiple="true" :language="'en'" :preview="false" file-type-exts="'txt,pdf'" class="col-sm"></v-uploader>-->
    </div>

    <!--<AdviserBob v-if="role!=='user'" class="bob"></AdviserBob>-->
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
        itemContentDTO: {
          content:"",
          contentName:"",
          contentType:"",
          contentSize: 0
        }

      }
    },
    computed: {
      ...mapState('user', ['role',]),
      ...mapGetters('user', ['get_role']),
      ...mapState('tree', ['selectedNode']),
      ...mapGetters('tree', ['get_selectedNode']),
    },
    methods:{
      sendFile(){
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };

        // console.log(node);
        let payload = this.itemContentDTO;
        // console.log('payload: ',payload)
        AXIOS.put("/itemContent/editItemContent/"+ this.selectedNode.id, (payload), config)
          .then((response) => {
            console.log('itemContent', response.data);
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
            let content =  response.data.content;
            let name = response.data.contentName;
            let type = response.data.contentType;
            // download(response.content, response.contentName, response.contentType);
            download(content, name, type);

            console.log('itemContent', response.data);
          })
          .catch((e) => {
            console.error(e);
          });
      },

      uploadFile(e) {
console.log('this.selectedNode.id--------',this.selectedNode.id)
        console.log('node -----',e);
        let file = e.target.files[0];
        console.log('file ---',file);
        console.log('origin name of file---',file.name);
        if(file.name!== null){
          this.itemContentDTO.contentName = file.name;
        }
        if(file.type!== null){
          this.itemContentDTO.contentType = file.type;
        }
        if(file.size!== null){
          this.itemContentDTO.contentSize = file.size;
        }

        let reader = new FileReader();
        reader.onloadend = (file) => {
          this.itemContentDTO.content = reader.result;
          // console.log(this.content);
          // this.imageOf= true;
          // this.base = reader.result;
          // console.log('RESULT',reader.result)
        };
        reader.readAsDataURL(file);

      },

    },
    components: {AdviserBob}
  }
</script>

<style scoped>


  .bob {
    position: absolute; /* Абсолютное позиционирование */
    bottom: 15px; /* Положение от нижнего края */
    right: 15px; /* Положение от правого края */
    line-height: 1px;
  }
</style>
