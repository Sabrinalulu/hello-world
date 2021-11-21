<template>
    <!-- objects coming into the component. control the reminder. use bind. want task class always be there-->
    <div @dblclick="$emit('toggle-reminder', category.id)" 
    :class="[category.reminder ? 'reminder' : '', 'category']">
        <h3>{{ category.text }}
            <i @click="onDelete(category.id)" class="fas fa-times"></i>
        </h3>
        <p>{{ category.name }}</p>
    </div>
</template>

<script>
    export default {
        name: 'Task',
        props: {
            task: Object
        },
        methods: {
            onDelete(id) {
                this.$emit('delete-task', id);
            },
        }
    }
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