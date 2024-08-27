<template>
  <div ref="container"></div>
</template>
<script>
import { defineComponent, onMounted, ref } from "vue";
import reactDom from "react-dom";
import react from "react";
export default defineComponent({
  props: {
    dependence: null,
    reactCom: {
      require: true,
    },
  },
  setup(props) {
    const container = ref();
    onMounted(() => {
      reactDom.render(
        react.createElement(props.reactCom, {
          dependence: props?.dependence || {},
        }),
        container.value
      );
    });
    return {
      container,
    };
  },
});
</script>

<style>
.excalidraw {
  height: 100%;
}
</style>
