<template>
  <div :class="[themeClass, 'container', 'box']">
    <Header />
    <TodoInput />
    <div v-if="todos.length > 0">
      <TodoList />
      <ProgressBar />
      <Filters :currentFilter="filter" @setFilter="setFilter" @clearCompleted="clearCompleted" />
    </div>
    <div v-else class="empty-state message">
      <p>Congrat, you have no more tasks to do</p>
    </div>
  </div>
</template>

<script>
import Header from './components/HeaderMain.vue';
import TodoInput from './components/TodoInput.vue';
import TodoList from './components/TodoList.vue';
import ProgressBar from './components/ProgressBar.vue';
import Filters from './components/FilterBar.vue'; // Импорт Filters

export default {
  components: {
    Header,
    TodoInput,
    TodoList,
    ProgressBar,
    Filters, // Подключение Filters
  },
  computed: {
    todos() {
      return this.$store.state.todos;
    },
    filter() {
      return this.$store.state.filter;
    },
    themeClass() {
      return this.$store.state.theme === 'dark' ? 'dark-theme' : 'light-theme';
    },
  },
  methods: {
    setFilter(filter) {
      this.$store.commit('setFilter', filter);
    },
    clearCompleted() {
      this.$store.dispatch('clearCompleted');
    },
  },
  created() {
    this.$store.dispatch('fetchTodos'); // Загружаем задачи при старте приложения
  },
};
</script>

<style>
.container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
}

.box {
  border-radius: 24px;
  background: var(--white-color);
  padding: 32px;
  min-width: 60%;
  min-height: 600px;
  width: 65%;
  position: relative;
}


.dark-theme.box {
  background: #333333;
  color: var(--white-color);
}

.controls {
  margin-top: 20px;
}

.empty-state {
  margin-bottom: 20px;
  text-align: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 114%;
  color: #8f99a3;
}
.message {
  position: absolute;
  width: 100%;
  bottom: 20px;
  left: 0;
}
</style>
