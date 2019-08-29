<template>

    <Main></Main>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import Main from "./components/Main";

export default {
  name: 'App',
  components: {
    Main,
    HelloWorld,
  },
  data: () => ({
    //
  }),
};
</script>
