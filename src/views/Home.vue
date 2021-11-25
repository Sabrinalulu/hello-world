<template>
  <div v-if="showAddTask">
    <AddTask @add-task="addTask" />
  </div>
  <Tasks @toggle-reminder="toggleReminder" @delete-task="deleteTask" :tasks="tasks" />
</template>

<script lang="ts">
import Tasks from "../components/Tasks.vue";
import AddTask from "../components/AddTask.vue";
import { Task } from "../components/beans.vue";
import { reactive, defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "Home",
  props: {
    showAddTask: Boolean,
  },
  components: {
    Tasks,
    AddTask,
  },
  setup() {
    let tasks = reactive<Task[]>([]);

    const addTask = async (task: Task) => {
      const res = await fetch(process.env.VUE_APP_API_URL + "/tasks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(task),
      });
      res.status === 201 ? tasks.push(task) : alert("Error detected!");
    };

    const deleteTask = async (id: number) => {
      if (confirm("Are you sure?")) {
        const res = await fetch(`${process.env.VUE_APP_API_URL}/tasks/${id}`, {
          method: "DELETE",
        });
        res.status === 200
          ? tasks.splice(
              tasks.findIndex((task) => task.id === id),
              1
            )
          : alert("Error detected!");
      }
    };

    const toggleReminder = async (id: number) => {
      let r = tasks[tasks.findIndex((t) => t.id === id)].reminder;
      const taskToToggle = await fetchTask(id);
      const updTask = { ...taskToToggle, reminder: !r };
      const res = await fetch(`${process.env.VUE_APP_API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updTask),
      });
      res.status === 200
        ? (tasks[tasks.findIndex((t) => t.id === id)].reminder = !r)
        : alert("errrr !!");
    };

    const fetchTasks = async () => {
      const res = await fetch(process.env.VUE_APP_API_URL + "/tasks");
      const data = await res.json();
      tasks.push(...data);
    };

    const fetchTask = async (id: number) => {
      const res = await fetch(`${process.env.VUE_APP_API_URL}/tasks/${id}`);
      const data = await res.json();
      return data;
    };

    onMounted(() => {
      fetchTasks();
    });
    return {
      tasks,
      addTask,
      deleteTask,
      toggleReminder,
      fetchTasks,
      fetchTask,
    };
  },
});
</script>
