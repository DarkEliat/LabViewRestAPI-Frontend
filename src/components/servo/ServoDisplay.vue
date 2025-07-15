<script setup lang="ts">
import { useServoStore } from '@/stores/servo';

const servoStore = useServoStore();
</script>

<template>
    <div class="control-element">
        Aktualna pozycja:
        <span id="servo-status-text">{{ servoStore.currentPosition }}° / 180°</span>
    </div>
</template>

<style scoped>
.control-element {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background-color: var(--color-primary);
}

#servo-status-text {
    font-size: 1.2rem;
    font-weight: bold;
}
</style>
