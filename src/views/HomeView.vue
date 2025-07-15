<script setup lang="ts">
import AppTitle from '@/components/AppTitle.vue';
import NavBar from '@/components/NavBar.vue';
import PageContent from '@/components/PageContent.vue';
import { ref, computed, onMounted, onUnmounted } from 'vue';

const currentServoPosition = ref(0);
const nextServoPosition = ref(0);
const logs = ref<{ timestamp: string; message: string }[]>([]);
const webSocket = ref<WebSocket | null>(null);
const controlMode = ref<'manual' | 'auto'>('manual');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getLabViewConnectionStatus = () => false;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getESP32ConnectionStatus = () => false;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getControlMode = () => controlMode.value;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getCurrentServoPosition = () => currentServoPosition.value;

const setControlMode = (mode: 'manual' | 'auto') => (controlMode.value = mode);

const isNextPositionValid = computed(() => {
    return nextServoPosition.value >= 0 && nextServoPosition.value <= 180;
});

const setNewCurrentServoPosition = () => {
    if (!isNextPositionValid.value) return;
    currentServoPosition.value = nextServoPosition.value;
};

const connectWebSocket = () => {
    webSocket.value = new WebSocket('ws://localhost:5173/ws');

    webSocket.value.onmessage = (event) => {
        const log = JSON.parse(event.data);
        logs.value.unshift(log); // Dodaj nowy log na początek tablicy

        // Ogranicz liczbę wyświetlanych logów do ostatnich 100
        if (logs.value.length > 100) logs.value = logs.value.slice(0, 100);
    };

    webSocket.value.onclose = () => {
        setTimeout(connectWebSocket, 5000); // Próba ponownego połączenia po 5 sekundach
    };
};

onMounted(() => {
    connectWebSocket();
});

onUnmounted(() => {
    if (webSocket.value) {
        webSocket.value.close();
    }
});
</script>

<template>
    <div id="page-container">
        <AppTitle />
        <NavBar />
        <PageContent title="Sterowanie serwomechanizmem">
            <div id="home-content">
                <div id="control">
                    <div class="control-element">
                        Status połączenia z LabView:
                        <span class="connection-status-text">Niepołączono</span>
                    </div>
                    <div class="control-element">
                        Status połączenia z ESP32:
                        <span class="connection-status-text">Niepołączono</span>
                    </div>

                    <div id="control-mode" class="control-element">
                        Aktualny tryb sterowania:
                        <div id="control-mode-buttons">
                            <button class="control-button" @click="setControlMode('manual')">
                                MANUAL
                            </button>
                            <button class="control-button" @click="setControlMode('auto')">
                                AUTO
                            </button>
                        </div>
                    </div>

                    <div id="servo" class="control-element">
                        <div class="control-element">
                            Aktualna pozycja:
                            <span id="servo-status-text">{{ currentServoPosition }}° / 180°</span>
                        </div>
                        <div class="control-element">
                            Nowa pozycja:
                            <input
                                id="servo-position-range"
                                type="range"
                                min="0"
                                max="180"
                                v-model="nextServoPosition"
                                @keyup.enter="setNewCurrentServoPosition"
                            />
                            <input
                                id="servo-position-number"
                                type="number"
                                min="0"
                                max="180"
                                v-model="nextServoPosition"
                                @keyup.enter="setNewCurrentServoPosition"
                                :class="{ 'invalid-input': !isNextPositionValid }"
                            />
                            <button class="control-button" @click="setNewCurrentServoPosition">
                                Ustaw pozycję!
                            </button>
                        </div>
                    </div>
                </div>

                <div id="logs">
                    <div id="logs-title">Logi</div>
                    <div id="logs-content">
                        <div v-for="(log, index) in logs" :key="index" class="log-item">
                            <div class="log-timestamp">{{ log.timestamp }}</div>
                            <div class="log-message">{{ log.message }}</div>
                        </div>
                        <div v-if="logs.length === 0" class="no-logs">Brak logów</div>
                    </div>
                </div>
            </div>
        </PageContent>
    </div>
</template>

<style scoped>
#home-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    height: 100%;
    width: 100%;
}

#control {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 50%;
}

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

#servo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 1rem;
}

#servo-status-text {
    font-size: 1.2rem;
    font-weight: bold;
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

#logs {
    display: flex;
    flex-direction: column;
    height: 25rem;
    width: 40%;
    background-color: var(--color-background-soft);
    border-radius: 0.5rem;
    padding: 1rem;
    overflow-y: auto;
    scrollbar-width: 0.5rem;
}

#logs-title {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: center;
}

#logs-content {
    flex-grow: 1;
    overflow-y: auto;
    padding-right: 0.5rem;
}

.log-item {
    padding: 0.5rem;
    border-bottom: 1px solid var(--color-border);
    font-family: monospace;
}

.log-timestamp {
    font-size: 0.8rem;
    color: var(--color-text-light);
    margin-bottom: 0.2rem;
}

.log-message {
    word-wrap: break-word;
}

.no-logs {
    text-align: center;
    color: var(--color-text-light);
    padding: 1rem;
    font-style: italic;
}

/* Stylowanie scrollbara */
#logs-content::-webkit-scrollbar {
    width: 1rem;
}

#logs-content::-webkit-scrollbar-track {
    background: var(--color-background);
    border-radius: 0.25rem;
}

#logs-content::-webkit-scrollbar-thumb {
    background: var(--color-border);
    border-radius: 0.25rem;
}

#logs-content::-webkit-scrollbar-thumb:hover {
    background: var(--vt-c-text-dark-2);
}
</style>
