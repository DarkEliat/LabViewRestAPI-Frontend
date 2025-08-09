<script setup lang="ts">
import { useServoStore } from '@/stores/servo';
import { setPosition } from '@/services/servo.service';

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
                v-model.number="servoStore.nextPosition"
                @keyup.enter="setPosition(servoStore.nextPosition)"
                :disabled="servoStore.currentStatus.status.mode !== 'manual'"
            />
            <input
                id="servo-position-number"
                type="number"
                min="0"
                max="180"
                v-model.number="servoStore.nextPosition"
                @keyup.enter="setPosition(servoStore.nextPosition)"
                :class="{ 'invalid-input': !servoStore.isNextPositionValid }"
                :disabled="servoStore.currentStatus.status.mode !== 'manual'"
            />
        </div>
        <button
            class="control-button"
            @click="setPosition(servoStore.nextPosition)"
            :disabled="servoStore.currentStatus.status.mode !== 'manual'"
        >
            Ustaw pozycję
        </button>
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

/* Wspólne style dla wszystkich kontrolek gdy są disabled */
#servo-position-range:disabled,
#servo-position-number:disabled,
.control-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Specyficzne style dla range inputa */
#servo-position-range:disabled::-webkit-slider-thumb {
    background: var(--color-border);
    cursor: not-allowed;
}

#servo-position-range:disabled::-webkit-slider-runnable-track {
    background: var(--color-border-hover);
}

/* Specyficzne style dla number inputa i buttona */
#servo-position-number:disabled,
.control-button:disabled {
    background-color: var(--color-border-hover);
    border-color: var(--color-border);
}

/* Wspólny tooltip dla wszystkich kontrolek */
#servo-position-range:disabled,
#servo-position-number:disabled,
.control-button:disabled {
    position: relative;
}

#servo-position-range:disabled:hover::after,
#servo-position-number:disabled:hover::after,
.control-button:disabled:hover::after {
    content: 'Dostępne tylko w trybie MANUAL';
    position: absolute;
    bottom: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    pointer-events: none;
}

.invalid-input {
    background-color: rgb(255, 119, 119) !important;
    border-color: red !important;
}

.control-button {
    min-width: 10rem;
    width: calc(10rem + 1rem + 5rem);
    height: 2rem;
    flex-shrink: 0;
    margin-top: 0.5rem;
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
