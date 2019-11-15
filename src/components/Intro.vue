<template>
  <div>
    <div v-if="role !=='admin'">
      <div>
        <h2>Cправочная информация для пользователя</h2>
      </div>
      <div class="intro">
        <p>
          Интерфейс библиотеки методических материалов интуитивно понятен и содержит следующие элементы:
        </p>
        <p>
          Кнопки "Свернуть все" и "Развернуть все" позволяют соответственно скрывать или показывать все дерево файлов
          целиком.
        </p>
        <p>
          Для быстрого поиска в библиотеке существует поисковая строка, показывающая результаты по совпадению символов в
          названии.
        </p>
        <p>
          Элементы дерева, помеченные иконкой
          <v-icon class="col-sm-1">cloud_download</v-icon>
          являются хранилищами файлов.
        </p>
        <p>
          Чтобы скачать необходимый файл, нужно нажать на элемент, помеченный данной иконкой.
        </p>
        <p>
          В правой части экрана появится информация о файле(назание, размер и др) и кнопка скачать.
        </p>
      </div>

    </div>
    <div v-else>
      <div>
        <h2>Справочная информация для админа</h2>
      </div>
      <div class="intro">
        <p>
          Порядок работы с библиотекой методических материалов.
          Интерфейс библиотеки методических материалов интуитивно понятен и содержит следующие элементы:
        </p>
        <p>
          Кнопки "Свернуть все" и "Развернуть все" позволяют соответственно скрывать или показывать все дерево файлов
          целиком.
        </p>
        <p>
          Для быстрого поиска в библиотеке существует поисковая строка, показывающая результаты по совпадению символов в
          названии.
        </p>
        <p>
          Для добавления папки в корневой каталог, необходимо нажать кнопку "+ папка".
        </p>
        <p>
          Для наполнения и редактирования библиотеки представлены следующие элементы:
        </p>
        <div class="row">
          <v-icon class="control_icon col-sm-2">edit</v-icon>
          <label class="col-sm-4">Позволяет редактировать название файлов и папок.</label>
        </div>
        <div class="row">
          <v-icon class="control_icon col-sm-2" color="#FF0000">remove</v-icon>
          <label class="col-sm-4">Удаляет элемент (и все вложенные, если такие имеются).</label>
        </div>
        <div class="row">
          <v-icon class="control_icon col-sm-2" color="#20B2AA">create_new_folder</v-icon>
          <label class="col-sm-6">Создает элемент являющийся эквивалентом папки файловой системы</label>
        </div>
        <div class="row">
          <v-icon class="control_icon col-sm-2" color="#20B2AA">add</v-icon>
          <label class="col-sm-6">Создает элемент являюшийся эквивалентом файла файловой системы.</label>
        </div>
        После создания элемента, являющегося эквивалентом файла, он будет помечен иконкой
        <v-icon class="col-sm-1">attach_file</v-icon>
        <p>
          Для загрузки файла на сервер, необходимо нажать на строку с элементом, содержащим иконку, указанную выше.
        </p>
        <p>
          В правой части экрана появятся следующие элементы:
        </p>
        <p>
          -кнопка для выбора файла из файловой системы, который необходимо загрузить на сервер
        </p>
        <p>
          -кнопка "на сервер" для непосредственной загрузки файла на сервер
        </p>
        <p>
          -кнопка "скачать" для скачивания загруженного файла с сервера
        </p>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapGetters, mapState} from "vuex";

  export default {
    name: "Intro",
    computed: {
      ...mapState('user', ['role',]),
      ...mapGetters('user', ['get_role']),
    },
    data() {
      return {}
    }
  }
</script>

<style scoped>
  h2 {
    padding-left: 10px;
  }

  .intro {
    padding-left: 10px;
  }


  table.v-table tbody td:first-child, table.v-table tbody td:not(:first-child), table.v-table tbody th:first-child, table.v-table tbody th:not(:first-child), table.v-table thead td:first-child, table.v-table thead td:not(:first-child), table.v-table thead th:first-child, table.v-table thead th:not(:first-child) {
    padding: 0 10px
  }
</style>
