<template>
    <div class="controls wrapp ">
        <button @click="checkAllTodos">Check all</button>
        <button @click="setFilter('all')" :class="{ active: currentFilter === 'all' }">All</button>
        <button @click="setFilter('active')" :class="{ active: currentFilter === 'active' }">Active</button>
        <button @click="setFilter('completed')" :class="{ active: currentFilter === 'completed' }">Completed</button>
        <button @click="clearCompletedTodos">Clear completed</button>
    </div>
</template>

<script>
export default {
    props: {
        currentFilter: {
            type: String,
            required: true,
        },
    },
    methods: {
        setFilter(filter) {
            this.$emit('setFilter', filter);
        },
        clearCompletedTodos() {
            this.$store.dispatch('clearCompleted');
        },
        checkAllTodos() {
            this.$store.dispatch('checkAll');
        },
    },
};
</script>


<style scoped>
.controls {
    margin-top: 20px;
    margin: 32px auto 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

button {
    border-radius: 8px;
    padding: 12px 16px;
    font-weight: 600;
    font-size: 13px;
    line-height: 123%;
}

button.active {
    background: #2578f4;
    color: #fff;
}
</style>