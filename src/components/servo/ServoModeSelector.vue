<script setup lang="ts">
import { setControlMode } from '@/services/servo.service';
import { useConnectionStore } from '@/stores/connection';
import { useServoStore } from '@/stores/servo';

const connectionStore = useConnectionStore();
const servoStore = useServoStore();

const isDisabled = () =>
    connectionStore.labViewConnected !== true || connectionStore.esp32Connected !== true;
</script>

<template>
    <div id="control-mode" class="control-element">
        <span class="mode-label">Aktualny tryb sterowania:</span>
        <div id="control-mode-buttons">
            <button
                class="control-button"
                @click="setControlMode('manual', true)"
                :class="{ active: servoStore.currentStatus.status.mode === 'manual' }"
                :disabled="isDisabled()"
            >
                MANUAL
            </button>
            <button
                class="control-button"
                @click="setControlMode('auto', true)"
                :class="{ active: servoStore.currentStatus.status.mode === 'auto' }"
                :disabled="isDisabled()"
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

.mode-label {
    margin-bottom: 0.5rem;
}

#control-mode-buttons {
    display: flex;
    flex-direction: column;
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

.control-button:disabled {
    cursor: not-allowed;
    background-color: var(--color-border-hover);
    border-color: var(--color-border);
    position: relative;
    color: #888;
}

.control-button:disabled:hover::after {
    content: 'Wymagane połączenie z serwerem i ESP32';
    position: absolute;
    bottom: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%);
    background: black;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    pointer-events: none;
}
</style>
