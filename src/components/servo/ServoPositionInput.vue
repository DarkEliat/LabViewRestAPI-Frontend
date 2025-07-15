<script setup lang="ts">
import { useServoStore } from '@/stores/servo';

const servoStore = useServoStore();
</script>

<template>
    <div class="control-element">
        Nowa pozycja:
        <div class="input-group">
            <input
                id="servo-position-range"
                type="range"
                min="0"
                max="180"
                v-model="servoStore.nextPosition"
                @keyup.enter="servoStore.setNewPosition"
            />
            <input
                id="servo-position-number"
                type="number"
                min="0"
                max="180"
                v-model="servoStore.nextPosition"
                @keyup.enter="servoStore.setNewPosition"
                :class="{ 'invalid-input': !servoStore.isNextPositionValid }"
            />
            <button class="control-button" @click="servoStore.setNewPosition">
                Ustaw pozycję!
            </button>
        </div>
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

.input-group {
    display: flex;
    align-items: center;
    gap: 1rem;
}

#servo-position-range {
    width: 10rem;
    -webkit-appearance: none;
    margin: 10px 0;
    background: transparent;
}

#servo-position-range::-webkit-slider-runnable-track {
    width: 100%;
    height: 0.5rem;
    background: var(--color-border);
    border-radius: 0.25rem;
}

#servo-position-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 50%;
    background: var(--color-text);
    margin-top: -0.5rem;
    cursor: pointer;
}

#servo-position-number {
    width: 5rem;
    height: 2rem;
    padding: 0 0.5rem;
    border: 1px solid var(--color-border);
    border-radius: 0.25rem;
    background: var(--color-background);
    color: var(--color-text);
}

.invalid-input {
    background-color: rgb(255, 119, 119) !important;
    border-color: red !important;
}

.control-button {
    min-width: 10rem;
    height: 2rem;
    flex-shrink: 0;
    background-color: var(--color-border);
    border-radius: 0.5rem;
    border: 1px solid var(--color-border);
    cursor: pointer;
    font-size: 1rem;
    color: var(--color-text);
    transition: background-color 0.3s ease;
}

.control-button:hover {
    background-color: var(--color-border-hover);
}
</style>
