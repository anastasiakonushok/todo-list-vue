<template>
    <div class="controls">
        <span>Check all</span>
        <button @click="$emit('setFilter', 'all')" :class="{ active: currentFilter === 'all' }">All</button>
        <button @click="$emit('setFilter', 'active')" :class="{ active: currentFilter === 'active' }">Active</button>
        <button @click="$emit('setFilter', 'completed')"
            :class="{ active: currentFilter === 'completed' }">Completed</button>
        <button @click="$emit('clearCompleted')">Clear completed</button>
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
};
</script>

<style scoped>
.controls {
    margin-top: 20px;
    width:70%;
    margin: 0 auto;
}

button {
    margin-right: 10px;
}

button.active {
    border-radius: 8px;
    padding: 12px 16px;
    background: #2578f4;
    font-weight: 600;
    font-size: 13px;
    line-height: 123%;
    color: #fff;
}
</style>