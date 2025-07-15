<script setup lang="ts">
defineProps<{
    title: string;
}>();
</script>

<template>
    <div id="page-content">
        <h1>{{ title }}</h1>
        <slot></slot>
    </div>
</template>

<style scoped>
h1 {
    font-size: 2rem;
    font-weight: 500;
    color: var(--color-heading);
    margin-bottom: 1rem;
}

#page-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
}
</style>
