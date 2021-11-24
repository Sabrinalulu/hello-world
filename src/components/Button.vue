<template>
    <button @click="onClick()" style="font-weight: bold">{{ text }}</button>
</template>

<script>
export default {
    name: 'Button',
    props: {
        text: String,
        color: String,
    },
    methods: {
        onClick(){
            this.$emit('toggle-btn')
        }
    }
}
</script>
