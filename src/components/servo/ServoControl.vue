<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import ServoModeSelector from './ServoModeSelector.vue';
import ServoDisplay from './ServoDisplay.vue';
import ServoPositionInput from './ServoPositionInput.vue';
import { getStatus } from '@/services/servo.service';
import { useChartStore } from '@/stores/chart';

const chartStore = useChartStore();
let intervalId: number;

onMounted(() => {
    getStatus(true); // Pierwszy odczyt statusu przez API

    intervalId = setInterval(() => getStatus(true), chartStore.samplingPeriod);
});

onUnmounted(() => {
    clearInterval(intervalId);
});
</script>

<template>
    <div id="servo">
        <ServoDisplay />
        <ServoPositionInput />
        <ServoModeSelector />
    </div>
</template>

<style scoped>
#servo {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
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
