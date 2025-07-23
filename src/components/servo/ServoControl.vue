<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import ServoModeSelector from './ServoModeSelector.vue';
import ServoDisplay from './ServoDisplay.vue';
import ServoPositionInput from './ServoPositionInput.vue';
import { getStatus } from '@/services/servo.service';

let intervalId: number;

onMounted(() => {
    getStatus(true); // Initial call
    intervalId = setInterval(() => getStatus(true), 1000);
});

onUnmounted(() => {
    clearInterval(intervalId);
});
</script>

<template>
    <div id="servo" class="control-element">
        <ServoDisplay />
        <ServoPositionInput />
        <ServoModeSelector />
    </div>
</template>

<style scoped>
#servo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 1rem;
    gap: 1rem;
}

.control-element {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: var(--color-primary);
}
</style>
