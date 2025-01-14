<template>
  <div :class="[themeClass, 'container', 'box']">
    <Header />
    <TodoInput />
    <div v-if="todos.length > 0">
      <TodoList />
      <ProgressBar />
      <Filters :currentFilter="filter" @setFilter="setFilter" @clearCompleted="clearCompleted" />
    </div>
    <div v-else class="empty-state">
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
      this.$store.commit('clearCompleted');
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
  margin: 0 auto;
  padding: 20px;
}

.box {
  border-radius: 24px;
  background: #fff;
  padding: 32px;
  min-width: 60%;
}

/* Светлая тема */
.light-theme {
  --background-color: #ffffff;
  --text-color: #000000;
}

/* Темная тема */
.dark-theme {
  --background-color: #333333;
  --text-color: #ffffff;
}

.dark-theme.box {
  background: #333333;
  color: #fff;
}

.controls {
  margin-top: 20px;
}

.empty-state {
  text-align: center;
  margin-top: 20px;
  color: #888;
}
</style>
