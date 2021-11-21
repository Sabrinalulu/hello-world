<template>
  <label>filter</label>
  <select v-model="category">
      <option :key="category.id" v-for="category in categories">{{category.name}}</option>
  </select>
  <div :key="task.id" v-for="task in tasks">
    <Task
      @toggle-reminder="$emit('toggle-reminder', task.id)"
      @delete-task="$emit('delete-task', task.id)"
      :task="task"
      v-if="filter(task.category)"
    />
    <!-- <h3>{{task.text}}</h3> -->
  </div>
</template>

<script>
import Task from "./Task";

export default {
  name: "Tasks",
  data(){
    return{
      categories:[],
      category:'',
    }
  },
  props: {
    tasks: Array,
  },
  components: {
    Task,
  },
  methods:{
    async fetchCategories() {
      const res = await fetch("api/categories");
      const data = await res.json();
      return data;
    },
    filter(name){
      if(this.category=="" || this.category=="all"){
        return true;
      }
      if(this.category == name){
        return true;
      }
      return false;
    }
  },
  emits: ["delete-task", "toggle-reminder"],
  async created() {
    this.categories = await this.fetchCategories();
  },
};
</script>
