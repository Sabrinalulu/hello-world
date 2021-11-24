<template>
  <div class="add-control">
    <label>Add Category</label><br />
    <input type="text" v-model="inputCategory" />
    <button type="button" class="btn btn-primary" @click="addCategory()">
      Add
    </button>
  </div>
  <br />
  <div class="list-display">
    <label>Category list</label>
    <ul class="list-group">
      <li
        class="list-group-item"
        :key="category.id"
        v-for="category in categories"
      >
        {{ category.name }}
        <i
          v-if="category.id != 1"
          @click="onDelete(category.id)"
          class="fas fa-times"
        ></i>
      </li>
    </ul>
  </div>
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

<style scoped>
.add-control {
  margin: 20px 0;
}
.add-control label {
  display: block;
}
.add-control input {
  width: 80%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
  border: solid 1px #ccc;
  border-radius: 5px;
}
.list-display label {
  font-weight: bold;
  font-size: 20px;
}
.list-display li {
  list-style-type: none;
}
.list-display i {
  float: right;
}
</style>
