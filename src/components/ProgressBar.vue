<template>
  <div class="progress">
    <div class="progress-box progress-box__completed">
      <span>{{ completedCount }} task</span>
      <p>Completed</p>
      <progress class="progress-bar completed" :value="completedCount" :max="totalCount"></progress>
    </div>
    <div class="progress-box progress-box__finished">
      <span>{{ pendingCount }} task</span>
      <p>To be finished</p>
      <progress class="progress-bar finished" :value="pendingCount" :max="totalCount"></progress>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    completedCount() {
      return this.$store.state.todos.filter(todo => todo.completed).length;
    },
    pendingCount() {
      return this.$store.state.todos.filter(todo => !todo.completed).length;
    },
    totalCount() {
      return this.$store.state.todos.length;
    },
  },
};
</script>

<style scoped>
.progress {
  width: 70%;
  margin: 0 auto;
  display: flex;
  gap: 30px;
}

.progress-box {
  background: rgba(32, 36, 39, 0.05);
  padding: 16px;
  border-radius: 8px;
  flex: 1;
}

.progress-box p {
  font-weight: 700;
  font-size: 14px;
  letter-spacing: -0.02em;
  color: #202427;
  margin-bottom: 8px;
}

.progress-box span {
  display: block;
  font-weight: 600;
  font-size: 12px;
  line-height: 133%;
  color: #202427;
  opacity: 0.5;
  margin-bottom: 4px;
}


.progress-bar {
  width: 100%;
  height: 4px;
  border: none;
  border-radius: 4px;
  background: #2024272d;
  overflow: hidden;
}


.progress-bar.completed::-webkit-progress-value {
  background-color: #5d5fef;

}

.progress-bar.completed::-moz-progress-bar {
  background-color: #5d5fef;

}


.progress-bar.finished::-webkit-progress-value {
  background-color: #ef5da8;

}

.progress-bar.finished::-moz-progress-bar {
  background-color: #ef5da8;

}
</style>
