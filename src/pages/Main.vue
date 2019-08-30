<template>
  <div>
    <p>
      тест
    </p>
    <div>
      <Navigation class="component"></Navigation>
    </div>
    <div>
      <InfoLine class="component"></InfoLine>
      <Workplace class="component"></Workplace>
    </div>


    <AdviserBob></AdviserBob>
  </div>

</template>

<script>
    import InfoLine from "../components/InfoLine";
    import Navigation from "../components/Navigation";
    import Workplace from "../components/Workplace";
    import AdviserBob from "../components/AdviserBob";
    export default {
        name: "Main",
        components: {AdviserBob, Workplace, Navigation, InfoLine}
    }
</script>

<style scoped>
  .component {
    border: 2px solid #c5c5c5;
  }
</style>
