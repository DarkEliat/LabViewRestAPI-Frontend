<script setup lang="ts"></script>

<template>
    <div id="nav-bar">
        <RouterLink to="/">Serwomechanizm</RouterLink>
        |
        <RouterLink to="/about">O Projekcie</RouterLink>
    </div>
</template>

<style scoped>
#nav-bar {
    height: 5%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 1rem;

    a {
        padding: 1rem;
        text-decoration: none;
        color: var(--color-text);
        font-size: 1.2rem;
        border-radius: 0.5rem;
        margin: 0 1rem;
    }
    a:hover {
        background-color: var(--color-background-soft);
    }
}
</style>
