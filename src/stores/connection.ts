import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useConnectionStore = defineStore('connection', () => {
    const webSocket = ref<WebSocket | null>(null);
    const labViewConnected = ref(false);
    const esp32Connected = ref(false);

    function connectWebSocket() {
        webSocket.value = new WebSocket('ws://localhost:5173/ws');

        webSocket.value.onclose = () => {
            labViewConnected.value = false;
            esp32Connected.value = false;
            setTimeout(connectWebSocket, 5000); // Próba ponownego połączenia po 5 sekundach
        };
    }

    function disconnectWebSocket() {
        if (webSocket.value) {
            webSocket.value.close();
            webSocket.value = null;
        }
    }

    function updateConnectionStatus(labView: boolean, esp32: boolean) {
        labViewConnected.value = labView;
        esp32Connected.value = esp32;
    }

    return {
        webSocket,
        labViewConnected,
        esp32Connected,
        connectWebSocket,
        disconnectWebSocket,
        updateConnectionStatus,
    };
});
