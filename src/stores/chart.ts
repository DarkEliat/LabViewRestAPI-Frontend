import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { ChartPoint } from '@/types/chart.types';
import { useServoStore } from '@/stores/servo';
import { useConnectionStore } from '@/stores/connection';

export const useChartStore = defineStore('chart', () => {
    const xAxisSize = ref<number>(30); // Ilość sekund na osi poziomej
    const samplingRate = ref<number>(10); // Ilość zapytań o pomiar do API na sekundę
    const MAX_POINTS = (xAxisSize.value + 1) * samplingRate.value;
    const chartPoints = ref<ChartPoint[]>([]);
    const startTime = ref<number | null>(null);
    const lastSampleTime = ref<number | null>(null);
    const timeWindow = ref({ min: 0, max: xAxisSize.value });
    const updateInterval = ref<number | null>(null);

    const servoStore = useServoStore();
    const connectionStore = useConnectionStore();

    const samplingPeriod = computed(() => {
        if (typeof samplingRate.value === 'number' && samplingRate.value > 0)
            return 1000 / samplingRate.value; // 1000 ms / ilość próbek na sekundę = okres próbkowania

        throw new Error('Sampling rate is not a number or is less then 0');
    });

    function setSamplingRate(newSamplingRate: number) {
        if (newSamplingRate > 0) {
            samplingRate.value = newSamplingRate;
            // Restart interval z nowym sampling rate
            if (updateInterval.value !== null) {
                stopDataCollection();
                startDataCollection();
            }
        }
    }

    function initializeChart() {
        startTime.value = Date.now();
        lastSampleTime.value = null;
        chartPoints.value = [];

        startDataCollection();
    }

    function addDataPoint(position: number) {
        if (startTime.value === null) {
            initializeChart();
            return;
        }

        const currentTime = Date.now();

        const elapsedTime = (currentTime - startTime.value) / 1000;
        lastSampleTime.value = currentTime;

        chartPoints.value.push({ elapsedTime, position });

        // Rolling chart — przesuwanie osi X
        timeWindow.value = {
            min: Math.max(0, elapsedTime - xAxisSize.value),
            max: Math.max(xAxisSize.value, elapsedTime),
        };

        // Usuń najstarsze punkty jeśli przekroczyliśmy limit
        if (chartPoints.value.length > MAX_POINTS) {
            chartPoints.value = chartPoints.value.slice(-MAX_POINTS);
        }

        chartPoints.value = chartPoints.value.filter(
            (point) => elapsedTime - point.elapsedTime <= xAxisSize.value + 1
        );
    }

    function clearData() {
        chartPoints.value = [];
        startTime.value = null;
        lastSampleTime.value = null;
    }

    function startDataCollection() {
        if (updateInterval.value === null) {
            // Dodaj pierwszy punkt
            if (connectionStore.labViewConnected && connectionStore.esp32Connected)
                addDataPoint(servoStore.currentStatus.status.position);

            // Ustaw interwał aktualizacji
            updateInterval.value = setInterval(() => {
                if (connectionStore.labViewConnected && connectionStore.esp32Connected) {
                    addDataPoint(servoStore.currentStatus.status.position);
                }
            }, samplingPeriod.value) as unknown as number;
        }
    }

    function stopDataCollection() {
        if (updateInterval.value !== null) {
            clearInterval(updateInterval.value);
            updateInterval.value = null;
        }
    }

    // Automatycznie startuj zbieranie danych przy utworzeniu store'a
    startDataCollection();

    return {
        MAX_POINTS,
        samplingRate,
        samplingPeriod,
        chartPoints,
        timeWindow,
        setSamplingRate,
        addDataPoint,
        clearData,
        initializeChart,
        startDataCollection,
        stopDataCollection,
    };
});
