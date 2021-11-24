<template>
  <header>
    <h1>{{ title }}</h1>
    <Button
      v-show="homePage"
      @toggle-btn="$emit('toggle-add-task')"
      :text="showAddTask ? 'Close' : 'Add Task'"
      :class="showAddTask ? 'btn btn-warning' : 'btn btn-dark'"
    />
  </header>
</template>

<script>
import Button from "./Button";

export default {
  name: "Header",
  props: {
    title: String,
    showAddTask: Boolean,
  },
  components: {
    Button,
  },
  computed: {
    homePage() {
      if (this.$route.path === "/") {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
