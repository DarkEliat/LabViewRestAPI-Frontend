<script setup lang="ts">
import { useConnectionStore } from '@/stores/connection';
import { useLogStore } from '@/stores/logs';
import { onMounted, onUnmounted } from 'vue';

const connectionStore = useConnectionStore();
const logStore = useLogStore();

onMounted(() => {
    connectionStore.connectWebSocket();
    if (connectionStore.webSocket) {
        connectionStore.webSocket.onmessage = (event) => {
            const log = JSON.parse(event.data);
            logStore.addLog(log);
        };
    }
});

onUnmounted(() => {
    connectionStore.disconnectWebSocket();
});
</script>

<template>
    <div class="websocket-manager"></div>
</template>

<style scoped>
.websocket-manager {
    display: none;
}
</style>
