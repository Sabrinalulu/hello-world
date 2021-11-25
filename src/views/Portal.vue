<template>
  <div class="add-control">
    <label>Add Category</label>
    <br />
    <input type="text" v-model="inputCategory" />
    <button type="button" class="btn btn-primary" @click="addCategory()">Add</button>
  </div>
  <br />
  <div class="list-display">
    <label>Category list</label>
    <ul class="list-group">
      <li class="list-group-item" :key="category.id" v-for="category in categories">
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

<script lang ="ts">
import { reactive, ref, defineComponent, onMounted } from "vue";
import { Category } from "../components/beans.vue";
export default defineComponent({
  name: "Portal",
  props: {},
  components: {},
  setup() {
    let inputCategory = ref("");
    let categories = reactive<Category[]>([]);

    const addCategory = async () => {
      if (inputCategory.value === "") {
        alert("Please input value");
        return;
      }

      let data = {
        id: Date.now(),
        name: inputCategory.value,
      };

      const res = await fetch(process.env.VUE_APP_API_URL + "/categories", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      res.status === 201 ? categories.push(data) : alert("Error detected!");
      inputCategory.value = "";
    };

    const fetchCategories = async () => {
      const res = await fetch(process.env.VUE_APP_API_URL + "/categories");
      const data = await res.json();
      categories.push(...data);
    };

    const onDelete = async (id: number) => {
      console.log("onDelete");
      if (confirm("Are you sure?")) {
        const res = await fetch(
          `${process.env.VUE_APP_API_URL}/categories/${id}`,
          {
            method: "DELETE",
          }
        );
        res.status === 200
          ? categories.splice(
              categories.findIndex((categorie) => categorie.id === id),
              1
            )
          : alert("Error detected!");
      }
    };

    onMounted(() => {
      fetchCategories();
    });

    return {
      inputCategory,
      categories,
      addCategory,
      fetchCategories,
      onDelete,
    };
  },
});
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
