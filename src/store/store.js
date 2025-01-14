import { createStore } from 'vuex';
import axios from 'axios';

const API_URL = 'https://67861ee9f80b78923aa57d92.mockapi.io/api/v1/todos';

export const store = createStore({
    state() {
        return {
            todos: [],
            filter: 'all', // Фильтры: all, active, completed
            theme: 'light',
        };
    },
    mutations: {
        setTodos(state, todos) {
            state.todos = todos;
        },
        addTodo(state, todo) {
            state.todos.push(todo);
        },
        updateTodo(state, updatedTodo) {
            const index = state.todos.findIndex(todo => todo.id === updatedTodo.id);
            if (index !== -1) {
                state.todos[index] = updatedTodo;
            }
        },
        deleteTodo(state, id) {
            state.todos = state.todos.filter(todo => todo.id !== id);
        },
        deleteCompletedTodos(state) {
            state.todos = state.todos.filter(todo => !todo.completed);
        },
        markAllCompleted(state) {
            state.todos.forEach(todo => {
                todo.completed = true;
            });
        },
        setFilter(state, filter) {
            state.filter = filter;
        },
        setTheme(state, theme) {
            state.theme = theme; // Обновляем тему
        },
    },
    actions: {
        async fetchTodos({ commit }) {
            try {
                const response = await axios.get(API_URL);
                commit('setTodos', response.data);
            } catch (error) {
                console.error('Ошибка при загрузке задач:', error);
            }
        },
        async saveTodo({ commit }, todo) {
            try {
                const response = await axios.post(API_URL, todo);
                commit('addTodo', response.data);
            } catch (error) {
                console.error('Ошибка при сохранении задачи:', error);
            }
        },
        async toggleTodoStatus({ commit }, todo) {
            try {
                const updatedTodo = { ...todo, completed: !todo.completed };
                const response = await axios.put(`${API_URL}/${todo.id}`, updatedTodo);
                commit('updateTodo', response.data);
            } catch (error) {
                console.error('Ошибка при обновлении статуса задачи:', error);
            }
        },
        async editTodoText({ commit }, { id, newText }) {
            try {
                const response = await axios.put(`${API_URL}/${id}`, { text: newText });
                commit('updateTodo', response.data);
            } catch (error) {
                console.error('Ошибка при редактировании задачи:', error);
            }
        },
        async deleteTodo({ commit }, id) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                commit('deleteTodo', id);
            } catch (error) {
                console.error('Ошибка при удалении задачи:', error);
            }
        },
        async clearCompleted({ commit, state }) {
            const completedTodos = state.todos.filter(todo => todo.completed);
            try {
                await Promise.all(completedTodos.map(todo => axios.delete(`${API_URL}/${todo.id}`)));
                commit('deleteCompletedTodos');
            } catch (error) {
                console.error('Ошибка при очистке выполненных задач:', error);
            }
        },
        async checkAll({ commit, state }) {
            try {
                await Promise.all(
                    state.todos.map(todo =>
                        axios.put(`${API_URL}/${todo.id}`, { ...todo, completed: true })
                    )
                );
                commit('markAllCompleted');
            } catch (error) {
                console.error('Ошибка при отметке всех задач:', error);
            }
        },
    },
    getters: {
        filteredTodos(state) {
            if (state.filter === 'all') return state.todos;
            if (state.filter === 'active') return state.todos.filter(todo => !todo.completed);
            if (state.filter === 'completed') return state.todos.filter(todo => todo.completed);
        },
        completedCount(state) {
            return state.todos.filter(todo => todo.completed).length;
        },
        activeCount(state) {
            return state.todos.filter(todo => !todo.completed).length;
        },
    },
});
