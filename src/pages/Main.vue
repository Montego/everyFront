<template>
  <div>
    <!--<div>-->
      <!--<Navigation class="component"></Navigation>-->
    <!--</div>-->
    <div class="row workplace_wraper">
      <InfoLine class="component col-sm-4"></InfoLine>
      <Workplace class="component col-8"></Workplace>
    </div>



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
  /*.container {*/
    /*padding-left: 10px;*/
    /*padding-right: 10px;*/
  /*}*/
  .workplace_wraper {
    margin-left: 0;
    margin-right: 0;
  }

  .component {
    border: 1px solid #c5c5c5;
    border-radius: 3px;
    min-height: 90vh;
  }
</style>
