<template>
<form @submit="onSubmit" class="add-form">
    <div class="form-control">
        <label>Task</label>
        <input type="text" v-model="text" name="text" placeholder="Add Task"/>
    </div>
    <div class="form-control">
        <label>Day and Time</label>
        <input type="text" v-model="day" name="day" placeholder="Add Day and Time"/>
    </div>
    <div class="form-control form-control-check">
        <label>Choose Category</label>
        <select v-model="category">
            <option :key="category.id" v-for="category in categories ">{{category.name}}</option>
        </select>
    </div>
    <div class="form-control form-control-check">
        <label>Set Reminder</label>
        <input type="checkbox" v-model="reminder" name="reminder"/>
    </div>
    <input type="submit" value="Save Task" class="btn btn-block">
</form>
</template>

<script>
export default {
    name: 'AddTask',
    data() {
        // we want to bind these values to the inputs -> v-model
        return {
            text: '',
            day: '',
            reminder: false,
            categories:'',
            category:'',
        }
    },
    methods: {
        onSubmit(e){
            e.preventDefault();
            if(!this.text) {
                alert('Please add a task');
                return 
            }
            const newTask = {
                // prevent to get repeating id
                // if using json server, it will create an id automatically
                // id: Math.floor(Math.random()*100000),
                text: this.text,
                day: this.day,
                reminder: this.reminder,
                category: this.category,
            }
            // emit upward console.log(newTask);
            this.$emit('add-task', newTask);
            // clear the things 
            this.text = '';
            this.day = '';
            this.reminder = false;
        },
        async fetchCategories() {
            const res = await fetch("api/categories");
            const data = await res.json();
            return data;
        },
    },
    async created() {
        this.categories = await this.fetchCategories();
    }
}
</script>

<style scoped>
.add-form {
    margin-bottom: 40px;
}
.form-control {
    margin: 20px 0;
}
.form-control label {
    display: block;
}
.form-control input {
    width: 100%;
    height: 40px;
    margin: 5px;
    padding: 3px 7px;
    font-size: 17px;
}
.form-control-check {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.form-control-check label {
    flex: 1;
}
.form-control-check input {
    flex: 2;
    height: 20px;
}
</style>