
<template>
  <div
    @dblclick="$emit('toggle-reminder', task.id)"
    :class="[task.reminder ? 'reminder' : '', 'task']"
  >
    <h3>
      {{ task.text }}
      <i @click="onDelete(task.id)" class="fas fa-times"></i>
    </h3>
    <p>{{ task.date }}</p>
  </div>
</template>

<script lang ="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Task",
  props: {
    task: Object,
  },
  setup(props,context) {
    const onDelete = (id: string) => {
      context.emit("delete-task", id);
      console.log(id);
    };
    return { onDelete };
  },
});
</script>

<style scope>
.fas {
  color: red;
}

.task {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

/* if the reminder is set to true, it'll have a purple border on the side */
.task.reminder {
  border-left: 5px solid purple;
}

.task h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
