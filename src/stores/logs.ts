import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

interface LogEntry {
    timestamp: string;
    message: string;
}

export const useLogStore = defineStore('logs', () => {
    const logs = ref<LogEntry[]>([]);

    const isEmpty = computed(() => logs.value.length === 0);

    function addLog(log: LogEntry) {
        logs.value.unshift(log);
        // Ogranicz liczbę wyświetlanych logów do ostatnich 100
        if (logs.value.length > 100) {
            logs.value = logs.value.slice(0, 100);
        }
    }

    function clearLogs() {
        logs.value = [];
    }

    return {
        logs,
        isEmpty,
        addLog,
        clearLogs,
    };
});
