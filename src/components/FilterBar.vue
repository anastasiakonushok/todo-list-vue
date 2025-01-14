<template>
    <div class="controls">
        <button>Check all</button>
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