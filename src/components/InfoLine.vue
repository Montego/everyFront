<template>
  <div>
   <!--<div class="row">-->
     <!--<v-btn class="col-sm-6">Свернуть все</v-btn>-->
     <!--<v-btn class="col-sm-6">Развернуть все</v-btn>-->
   <!--</div>-->
    <div class="box">
      <input class="col-sm-10" v-model="searchForm" type="search" name="поиск" placeholder="Поиск по названию">
      <v-icon class="col-sm-1" color="#5bc0de">search</v-icon>
    </div>

  <hr>
    <!--<v-btn @click="add">add</v-btn>-->
    <!--<v-btn @click="del">delete</v-btn>-->


    <div class="row scroll">
      <div v-for="(name, index, level, type) in elements">
        <ul is="Folder">
          <!--<Folder></Folder>-->
          <li is="Item">
            <!--<Item></Item>-->
          </li>
        </ul>
        <!--{{ index }}. {{ name }}.  {{ type}}. {{ level}}-->
      </div>

        <Folder></Folder>
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Folder></Folder>
        <Folder></Folder>
      <Folder></Folder>
      <Folder></Folder>
      <Folder></Folder>




      <!--<v-icon class="col-sm-1" color="#5bc0de">folder</v-icon>-->
      <!--<input class="col-sm-8" v-model="folder_name" placeholder="Введите название папки">-->
      <!--<v-icon class="col-sm-1" color="#5bc0de">add</v-icon>-->
      <!--<v-icon class="col-sm-1" color="#5bc0de">delete</v-icon>-->
      <!--<input v-model="test">-->
      <!--<button>+</button>-->
      <!--<button>-</button>-->
    </div>
  </div>

</template>

<script>
    import Folder from "./InfoLineComponents/Folder";
    import Item from "./InfoLineComponents/Item";
    export default {
        name: "InfoLine",
      components: {Item, Folder},
      data(){
        return{
          elements: [
            {
              name:'Новая папка',
              type:'Folder',
              level:0.0,
              elements:[
                {
                  name:'Файл',
                  type:'File',
                  level:0.1,
                  elements:[]
                },
                {
                  name:'Новая папка',
                  type:'Folder',
                  level:0.2,
                  elements:[]
                }
              ]
            },{
              name:'Новая папка',
              type:'Folder',
              level:1.0,
              elements:[]
            }
          ],
          // folder_name:'',
          searchForm:''
        }
      },
      methods:{
          add(){
            this.elements.push(this.elements[0]);
          },
          del(){
            this.elements.splice(this.elements[0]);
          }
      }
    }
</script>

<style scoped>

</style>
