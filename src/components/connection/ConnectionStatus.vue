<script setup lang="ts">
import { useConnectionStore } from '@/stores/connection';

const connectionStore = useConnectionStore();
</script>

<template>
    <div class="connection-status">
        <div class="control-element">
            Status połączenia z LabView:
            <span
                class="connection-status-text"
                :class="connectionStore.labViewConnected ? 'connected' : 'disconnected'"
            >
                {{ connectionStore.labViewConnected ? 'Połączono' : 'Niepołączono' }}
            </span>
        </div>
        <div class="control-element">
            Status połączenia z ESP32:
            <span
                class="connection-status-text"
                :class="connectionStore.esp32Connected ? 'connected' : 'disconnected'"
            >
                {{ connectionStore.esp32Connected ? 'Połączono' : 'Niepołączono' }}
            </span>
        </div>
    </div>
</template>

<style scoped>
.connection-status {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 40%;
}

.control-element {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background-color: var(--color-primary);
}

.connection-status-text {
    font-weight: bold;
}

.connection-status-text.connected {
    color: green;
}

.connection-status-text.disconnected {
    color: red;
}
</style>
