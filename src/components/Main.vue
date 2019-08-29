<template>
  <div>
    <p>
      привет
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
    import InfoLine from "./InfoLine";
    import Navigation from "./Navigation";
    import Workplace from "./Workplace";
    import AdviserBob from "./AdviserBob";
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
