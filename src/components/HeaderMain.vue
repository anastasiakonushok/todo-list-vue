<template>
    <header>
        <img src="../assets/img/Illustration.svg" alt="">
        <h1>Today I need to</h1>
        <button @click="toggleTheme" class="change-button">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M15 27.5C21.9036 27.5 27.5 21.9036 27.5 15C27.5 8.09644 21.9036 2.5 15 2.5C8.09644 2.5 2.5 8.09644 2.5 15C2.5 21.9036 8.09644 27.5 15 27.5ZM15 25.625V4.375C20.868 4.375 25.625 9.13197 25.625 15C25.625 20.868 20.868 25.625 15 25.625Z"
                    fill="currentColor" />
            </svg>
        </button>
    </header>
</template>

<script>
export default {
    computed: {
        currentTheme() {
            return this.$store.state.theme;
        },
    },
    methods: {
        toggleTheme() {
            const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
            this.$store.commit('setTheme', newTheme);
        },
    },
};
</script>

<style scoped>
header {
    position: relative;
    padding-bottom: 52px;
}

img {
    display: block;
    margin: 0 auto;
    margin-bottom: 48px;
    height: 180px;
}

h1 {
    text-align: center;
    font-weight: 700;
    font-size: 24px;
    letter-spacing: -0.02em;
    color: #202427;
}
.dark-theme h1 {
    color: var(--white-color);
}

.change-button {
    position: absolute;
    top: 0px;
    right: 0px;
    color: #3333;
}
</style>