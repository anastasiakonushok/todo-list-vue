<template>
    <div class="todo-input wrapp">
        <input v-model="newTodoText" @keyup.enter="addTodo" placeholder="Add new todo..." />
        <button @click="addTodo" v-if="newTodoText" class="blue-button">Submit</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newTodoText: '',
        };
    },
    methods: {
        addTodo() {
            if (this.newTodoText.trim()) {
                const newTodo = {
                    text: this.newTodoText,
                    completed: false,
                };
                this.$store.dispatch('saveTodo', newTodo); // Сохраняем задачу на сервере
                this.newTodoText = ''; // Очищаем поле ввода
            }
        },
    },
};
</script>

<style scoped>
.todo-input {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
}

input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 400;
    font-size: 14px;
    line-height: 114%;
    color: #202427;
}
</style>