<template>
  <div>
    <div class="row">
      <div class="col-sm-6">

        <label>Название файла:</label>
      </div>
      <div class="col-sm-6">
        <label v-if="selectedNode!== null && !selectedNode.hasChildren()">{{this.selectedNode.text}}</label>
      </div>
      <div class="col-sm-6">
        <label>Тип файла:</label>
      </div>
      <div class="col-sm-6">
        <label>значение</label>
      </div>
      <div class="col-sm-6">
        <label>Размер файла:</label>
      </div>
      <div class="col-sm-6">
        <label>значение</label>
      </div>
      <div class="col-sm-6">
        <label>Когда добавлен:</label>
      </div>
      <div class="col-sm-6">
        <label>значение</label>
      </div>
      <div class="col-sm-6">
        <label>Кем добавлен:</label>
      </div>
      <div class="col-sm-6">
        <label>значение</label>
      </div>

    </div>
    <v-btn> скачать</v-btn>
    <AdviserBob v-if="role!=='user'" class="bob"></AdviserBob>
  </div>
</template>

<script>
  import AdviserBob from "./AdviserBob";
  import {mapGetters, mapState} from "vuex";

  export default {
    name: "FileInfo",
    computed: {
      ...mapState('user', ['role',]),
      ...mapGetters('user', ['get_role']),
      ...mapState('tree', ['selectedNode']),
      ...mapGetters('tree', ['get_selectedNode']),
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
