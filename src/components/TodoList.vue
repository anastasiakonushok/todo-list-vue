<template>
    <div class="todolist wrapp">
        <ul v-if="filteredTodos.length > 0">
            <li v-for="(todo, index) in filteredTodos" :key="todo.id" class="task-list" @dragover.prevent
                @drop="onDrop(index)" draggable="true" @dragstart="onDragStart(index)">
                <div class="task-list__info">
                    <div class="drag-icon">
                        <svg width="10" height="13" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="1.5" cy="1.5" r="1.5" fill="#202427" />
                            <circle cx="8.5" cy="11.5" r="1.5" fill="#202427" />
                            <circle cx="1.5" cy="11.5" r="1.5" fill="#202427" />
                            <circle cx="8.5" cy="1.5" r="1.5" fill="#202427" />
                            <circle cx="1.5" cy="6.5" r="1.5" fill="#202427" />
                            <circle cx="8.5" cy="6.5" r="1.5" fill="#202427" />
                        </svg>
                    </div>
                    <input type="checkbox" :checked="todo.completed" @change="toggleTodo(todo.id)" />
                    <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
                </div>
                <div class="task-list__controls">
                    <button @click="editTodo(todo.id)" class="edit"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g opacity="0.65" clip-path="url(#clip0_20_1415)">
                                <path
                                    d="M10.7914 2.34073C10.7277 2.28043 10.6434 2.24683 10.5557 2.24683C10.468 2.24683 10.3837 2.28043 10.32 2.34073L2.71136 9.9494C2.64887 10.0119 2.61377 10.0967 2.61377 10.1851C2.61377 10.2735 2.64887 10.3582 2.71136 10.4207L5.5647 13.2741C5.62721 13.3366 5.71198 13.3717 5.80036 13.3717C5.88875 13.3717 5.97352 13.3366 6.03603 13.2741L13.6447 5.66673C13.7072 5.60422 13.7423 5.51945 13.7423 5.43107C13.7423 5.34268 13.7072 5.25791 13.6447 5.1954L10.7914 2.34073Z"
                                    fill="#202427" />
                                <path
                                    d="M2.00011 11.1399C1.95973 11.0998 1.90973 11.0706 1.85489 11.0553C1.80005 11.04 1.7422 11.0389 1.68684 11.0523C1.63149 11.0657 1.58049 11.093 1.5387 11.1317C1.4969 11.1703 1.46572 11.2191 1.44811 11.2732L0.0214434 15.5532C0.00175745 15.6119 -0.00118532 15.675 0.012945 15.7353C0.0270753 15.7956 0.05772 15.8507 0.101443 15.8946C0.145555 15.9379 0.200684 15.9683 0.260854 15.9825C0.321024 15.9967 0.383939 15.9942 0.442777 15.9752L4.72278 14.5492C4.77706 14.5317 4.82592 14.5005 4.8647 14.4586C4.90348 14.4168 4.93087 14.3657 4.94425 14.3102C4.95763 14.2548 4.95655 14.1968 4.94112 14.1419C4.92568 14.087 4.89642 14.0369 4.85611 13.9966L2.00011 11.1399Z"
                                    fill="#202427" />
                                <path
                                    d="M15.3119 0.678113C14.8639 0.250679 14.2684 0.012207 13.6492 0.012207C13.03 0.012207 12.4346 0.250679 11.9866 0.678113L11.5119 1.15345C11.4494 1.21596 11.4143 1.30072 11.4143 1.38911C11.4143 1.4775 11.4494 1.56227 11.5119 1.62478L14.3646 4.47811C14.4271 4.5406 14.5118 4.57571 14.6002 4.57571C14.6886 4.57571 14.7734 4.5406 14.8359 4.47811L15.3119 4.00011C15.7514 3.55903 15.9981 2.96176 15.9981 2.33911C15.9981 1.71647 15.7514 1.1192 15.3119 0.678113Z"
                                    fill="#202427" />
                            </g>
                            <defs>
                                <clipPath id="clip0_20_1415">
                                    <rect width="16" height="16" fill="white" />
                                </clipPath>
                            </defs>
                        </svg></button>
                    <button @click="deleteTodo(todo.id)" class="delete"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_20_1419)">
                                <path
                                    d="M13.0001 5H3.00008C2.91168 5 2.82689 5.03512 2.76438 5.09763C2.70187 5.16014 2.66675 5.24493 2.66675 5.33333V14.6667C2.66675 15.0203 2.80722 15.3594 3.05727 15.6095C3.30732 15.8595 3.64646 16 4.00008 16H12.0001C12.3537 16 12.6928 15.8595 12.9429 15.6095C13.1929 15.3594 13.3334 15.0203 13.3334 14.6667V5.33333C13.3334 5.24493 13.2983 5.16014 13.2358 5.09763C13.1733 5.03512 13.0885 5 13.0001 5ZM6.83341 13.6667C6.83341 13.7993 6.78074 13.9265 6.68697 14.0202C6.5932 14.114 6.46602 14.1667 6.33341 14.1667C6.20081 14.1667 6.07363 14.114 5.97986 14.0202C5.88609 13.9265 5.83341 13.7993 5.83341 13.6667V7.66667C5.83341 7.53406 5.88609 7.40688 5.97986 7.31311C6.07363 7.21935 6.20081 7.16667 6.33341 7.16667C6.46602 7.16667 6.5932 7.21935 6.68697 7.31311C6.78074 7.40688 6.83341 7.53406 6.83341 7.66667V13.6667ZM10.1667 13.6667C10.1667 13.7993 10.1141 13.9265 10.0203 14.0202C9.92653 14.114 9.79936 14.1667 9.66675 14.1667C9.53414 14.1667 9.40696 14.114 9.31319 14.0202C9.21943 13.9265 9.16675 13.7993 9.16675 13.6667V7.66667C9.16675 7.53406 9.21943 7.40688 9.31319 7.31311C9.40696 7.21935 9.53414 7.16667 9.66675 7.16667C9.79936 7.16667 9.92653 7.21935 10.0203 7.31311C10.1141 7.40688 10.1667 7.53406 10.1667 7.66667V13.6667Z"
                                    fill="#EC3535" />
                                <path
                                    d="M14.6667 2.66667H11.5001C11.4559 2.66667 11.4135 2.64911 11.3822 2.61785C11.351 2.5866 11.3334 2.5442 11.3334 2.5V1.66667C11.3334 1.22464 11.1578 0.800716 10.8453 0.488155C10.5327 0.175595 10.1088 0 9.66675 0L6.33341 0C5.89139 0 5.46746 0.175595 5.1549 0.488155C4.84234 0.800716 4.66675 1.22464 4.66675 1.66667V2.5C4.66675 2.5442 4.64919 2.5866 4.61793 2.61785C4.58668 2.64911 4.54428 2.66667 4.50008 2.66667H1.33341C1.1566 2.66667 0.987034 2.7369 0.86201 2.86193C0.736986 2.98695 0.666748 3.15652 0.666748 3.33333C0.666748 3.51014 0.736986 3.67971 0.86201 3.80474C0.987034 3.92976 1.1566 4 1.33341 4H14.6667C14.8436 4 15.0131 3.92976 15.1382 3.80474C15.2632 3.67971 15.3334 3.51014 15.3334 3.33333C15.3334 3.15652 15.2632 2.98695 15.1382 2.86193C15.0131 2.7369 14.8436 2.66667 14.6667 2.66667ZM6.00008 2.5V1.66667C6.00008 1.57826 6.0352 1.49348 6.09771 1.43096C6.16022 1.36845 6.24501 1.33333 6.33341 1.33333H9.66675C9.75515 1.33333 9.83994 1.36845 9.90245 1.43096C9.96496 1.49348 10.0001 1.57826 10.0001 1.66667V2.5C10.0001 2.5442 9.98252 2.5866 9.95127 2.61785C9.92001 2.64911 9.87762 2.66667 9.83341 2.66667H6.16675C6.12254 2.66667 6.08015 2.64911 6.0489 2.61785C6.01764 2.5866 6.00008 2.5442 6.00008 2.5Z"
                                    fill="#EC3535" />
                            </g>
                            <defs>
                                <clipPath id="clip0_20_1419">
                                    <rect width="16" height="16" fill="white" />
                                </clipPath>
                            </defs>
                        </svg></button>
                </div>
            </li>
        </ul>
        <div v-else class="empty-state">
            <p>No completed tasks yet. Keep going!</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            draggedIndex: null,
        };
    },
    computed: {
        filteredTodos() {
            return this.$store.getters.filteredTodos;
        },
    },
    methods: {
        toggleTodo(id) {
            const todo = this.$store.state.todos.find(todo => todo.id === id);
            if (todo) {
                this.$store.dispatch('toggleTodoStatus', todo);
            } else {
                console.error('Задача с таким ID не найдена:', id);
            }
        },
        deleteTodo(id) {
            this.$store.dispatch('deleteTodo', id);
        },
        editTodo(id) {
            const todo = this.$store.state.todos.find(todo => todo.id === id);
            if (todo) {
                const newText = prompt('Измените текст задачи:', todo.text);
                if (newText !== null && newText.trim() !== '') {
                    this.$store.dispatch('editTodoText', { id, newText: newText.trim() });
                }
            } else {
                console.error('Задача с таким ID не найдена:', id);
            }
        },
        onDragStart(index) {
            this.draggedIndex = index;
        },
        onDrop(index) {
            const updatedTodos = this.reorderArray(this.$store.state.todos, this.draggedIndex, index);
            this.$store.commit('setTodos', updatedTodos);
            this.draggedIndex = null;
        },
        reorderArray(array, from, to) {
            const newArray = [...array];
            const [movedItem] = newArray.splice(from, 1);
            newArray.splice(to, 0, movedItem);
            return newArray;
        },
    },
};
</script>

<style scoped>
.task-list__info {
    display: flex;
    align-content: center;
    gap: 8px;
}

.todolist ul {
    max-height: 85px;
    overflow-y: auto;
    scrollbar-width: thin;
    /* Для Firefox */
    scrollbar-color: #ccc transparent;
    margin-bottom: 32px;
    padding-right: 10px;
}

/* Для Chrome, Edge и Safari */
.todolist ul::-webkit-scrollbar {
    width: 6px;
    /* Ширина скроллбара */
}

.todolist ul::-webkit-scrollbar-track {
    background: transparent;
    /* Фон трека */
}

.todolist ul::-webkit-scrollbar-thumb {
    background-color: #ccc;
    /* Цвет ползунка */
    border-radius: 3px;
    /* Радиус для закругления */
}

.todolist ul::-webkit-scrollbar-thumb:hover {
    background-color: #aaa;
    /* Цвет ползунка при наведении */
}


.task-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    gap: 30px;
    position: relative;
}

.drag-icon {
    visibility: hidden;
    cursor: grab;
    transition: visibility 0.2s, opacity 0.2s ease-in-out;
    opacity: 0;
}

.task-list:hover .drag-icon {
    visibility: visible;
    opacity: 1;
}


.drag-icon:active {
    cursor: grabbing;
}


.task-list__info {
    display: flex;
}

.task-list__info span {
    font-weight: 400;
    font-size: 14px;
    line-height: 114%;
    color: #202427;
}

.task-list__controls {
    display: flex;
    gap: 16px;
}

.task-list__info .completed {
    color: #20242770;
}

input[type='checkbox'] {
    cursor: pointer;
}
</style>