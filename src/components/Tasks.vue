<template>
  <label>Filter</label>
  <select v-model="category">
    <option value disabled>please select</option>
    <option :key="category.id" v-for="category in categories">{{ category.name }}</option>
  </select>
  <div :key="task.id" v-for="task in tasks">
    <Task
      @toggle-reminder="$emit('toggle-reminder', task.id)"
      @delete-task="$emit('delete-task', task.id)"
      :task="task"
      v-if="filter(task.category)"
    />
  </div>
</template>

<script lang="ts">
import { reactive, ref, defineComponent, onMounted } from "vue";
import { Category } from "./beans.vue";
import Task from "./Task.vue";

export default defineComponent({
  name: "Tasks",
  props: {
    tasks: Array,
  },
  components: {
    Task,
  },
  setup() {
    let categories = reactive<Category[]>([]);
    let category = ref("");
    const fetchCategories = async () => {
      const res = await fetch(process.env.VUE_APP_API_URL + "/categories");
      const data = await res.json();
      categories.push(...data);
    };

    const filter = (name: string) => {
      if (category.value === "" || category.value === "All") {
        return true;
      }
      if (category.value === name) {
        return true;
      }
      return false;
    };

    onMounted(() => {
      fetchCategories();
    });

    return {
      categories,
      category,
      fetchCategories,
      filter,
    };
  },
});
</script>

<style>
label {
  font-weight: bold;
  font-size: 16px;
}
select {
  display: flex;
}
</style>
