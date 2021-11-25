<template>
  <header>
    <h1>{{ title }}</h1>
    <Button
      v-show="homePage"
      @toggle-btn="$emit('toggle-add-task')"
      :text="showAddTask ? 'Close' : 'Add Task'"
      :color="showAddTask ? 'btn btn-warning' : 'btn btn-dark'"
    />
  </header>
</template>

<script>
import { defineComponent, computed } from "vue";
import Button from "./Button.vue";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "Header",
  props: {
    title: String,
    showAddTask: Boolean,
  },
  components: {
    Button,
  },
  setup() {
    const rout = useRoute();
    const homePage = computed(() => (rout.path === "/" ? true : false));
    return { homePage };
  },
});
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
