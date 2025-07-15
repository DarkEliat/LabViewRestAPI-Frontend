import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

interface ChartDataPoint {
    elapsedTime: number; // czas w sekundach od rozpoczęcia
    position: number;
}

export const useChartStore = defineStore('chart', () => {
    const WINDOW_SIZE = 60; // 60 sekund okna
    const SAMPLE_RATE = 10; // 10 próbek na sekundę
    const chartData = ref<ChartDataPoint[]>([]);
    const startTime = ref<number | null>(null);
    const lastSampleTime = ref<number | null>(null);

    // Eksportujemy bezpośrednio dane wykresu
    const chartPoints = computed(() => chartData.value);

    const timeWindow = computed(() => {
        if (chartData.value.length === 0) return { min: 0, max: WINDOW_SIZE };

        const lastTime = chartData.value[chartData.value.length - 1].elapsedTime;
        const minTime = Math.max(0, lastTime - WINDOW_SIZE);
        const maxTime = minTime + WINDOW_SIZE;

        return {
            min: minTime,
            max: maxTime,
        };
    });

    function initializeChart() {
        startTime.value = Date.now();
        lastSampleTime.value = null;
        chartData.value = [];
    }

    function addDataPoint(position: number) {
        if (startTime.value === null) {
            initializeChart();
            return;
        }

        const currentTime = Date.now();

        // Sprawdź czy minął odpowiedni czas od ostatniej próbki (1/SAMPLE_RATE sekund)
        if (
            lastSampleTime.value !== null &&
            currentTime - lastSampleTime.value < 1000 / SAMPLE_RATE
        ) {
            return; // Za wcześnie na nową próbkę
        }

        const elapsedTime = Math.round((currentTime - startTime.value) / 1000);
        lastSampleTime.value = currentTime;

        chartData.value.push({ elapsedTime, position });

        // Usuń punkty starsze niż WINDOW_SIZE sekund od aktualnego czasu
        const minTime = elapsedTime - WINDOW_SIZE;
        chartData.value = chartData.value.filter((point) => point.elapsedTime > minTime);
    }

    function clearData() {
        chartData.value = [];
        startTime.value = null;
        lastSampleTime.value = null;
    }

    return {
        chartPoints,
        timeWindow,
        addDataPoint,
        clearData,
        initializeChart,
    };
});
