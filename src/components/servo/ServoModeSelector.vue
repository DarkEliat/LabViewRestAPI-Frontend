<script setup lang="ts">
import { setControlMode } from '@/services/servo.service';
import { useConnectionStore } from '@/stores/connection';
import { useServoStore } from '@/stores/servo';

const connectionStore = useConnectionStore();
const servoStore = useServoStore();
</script>

<template>
    <div id="control-mode" class="control-element">
        Aktualny tryb sterowania:
        <div id="control-mode-buttons">
            <button
                class="control-button"
                @click="setControlMode('manual', true)"
                :class="{ active: servoStore.currentStatus.status.mode === 'manual' }"
                :disabled="connectionStore.labViewConnected !== true"
            >
                MANUAL
            </button>
            <button
                class="control-button"
                @click="setControlMode('auto', true)"
                :class="{ active: servoStore.currentStatus.status.mode === 'auto' }"
                :disabled="connectionStore.labViewConnected !== true"
            >
                AUTO
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

#control-mode {
    margin-top: 1rem;
}

#control-mode-buttons {
    display: flex;
    gap: 0.5rem;
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

.control-button.active {
    background-color: var(--color-border-hover);
    border-color: var(--color-text);
}
</style>
