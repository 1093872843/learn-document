<template>
  <div class="main-page">
    <ReactToVue :reactCom="Excalidraw" style="height: 1000px" />
  </div>
</template>

<script>
import ReactToVue from "./components/react-to-vue";
import { Excalidraw } from "@excalidraw/excalidraw";
export default {
  components: {
    ReactToVue,
    Excalidraw,
  },
  data() {
    return {
      Excalidraw: Excalidraw,
    };
  },
};
</script>
<style lang="scss" scoped>
.main-page{
  color: red;
  background-color: red;
}
</style>