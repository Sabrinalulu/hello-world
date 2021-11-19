<template>
  <header>
    <label>New Category</label><br/>
    <input type="text" v-model="inputCategory"/> |
    <input type="button" value="add" @click="addCategory()"/>
  </header>
  <br/>
  <label>Category list</label>
  <ul>
    <li :key="category.id" v-for="category in categories">
      {{category.name}}
      <i @click="onDelete(category.id)" class="fas fa-times"></i>
    </li>
  </ul>
</template>

<script>

export default {
  name: "Portal",
  props: {
  },
  components: {
  },
  data(){
    return{
      inputCategory:'',
      categories:[],
    }
  },
  methods:{
    async addCategory() {
      const newCategory = {
        name: this.inputCategory,
      }
      const res = await fetch("api/categories", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });

      const data = await res.json();

      this.categories = [...this.categories, data];
    },
    async fetchCategories() {
      const res = await fetch("api/categories");
      const data = await res.json();
      return data;
    },
    async onDelete(id) {
      // console.log('task', id);
      if (confirm("Are you sure?")) {
        const res = await fetch(`api/categories/${id}`, {
          method: "DELETE",
        });

        res.status === 200
          ? (this.categories = this.categories.filter((task) => task.id !== id))
          : alert("Error detected!");
      }
    }
  },
  async created() {
    this.categories = await this.fetchCategories();
  }
};
</script>

