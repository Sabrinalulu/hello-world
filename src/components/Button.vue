<template>
  <button @click="onClick()" :class="color" style="font-weight: bold">{{ text }}</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Button",
  props: {
    text: String,
    color: String,
  },
  setup(props, context) {
    const onClick = () => {
      context.emit("toggle-btn");
    };
    return { onClick, props };
  },
});
</script>
