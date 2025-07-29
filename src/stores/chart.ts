import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { ChartPoint } from '@/types/chart.types';

export const useChartStore = defineStore('chart', () => {
    const MAX_POINTS = 10000;
    const samplingRate = ref<number>(10); // Ilość zapytań o pomiar do API na sekundę
    const xAxisSize = ref<number>(30); // Ilość sekund na osi poziomej
    const chartPoints = ref<ChartPoint[]>([]);
    const startTime = ref<number | null>(null);
    const lastSampleTime = ref<number | null>(null);
    const timeWindow = ref({ min: 0, max: xAxisSize.value });

    const samplingPeriod = computed(() => {
        if (typeof samplingRate.value === 'number' && samplingRate.value > 0)
            return 1000 / samplingRate.value; // 1000 ms / ilość próbek na sekundę = okres próbkowania

        throw new Error('Sampling rate is not a number or is less then 0');
    });

    function setSamplingRate(newSamplingRate: number) {
        if (newSamplingRate > 0) samplingRate.value = newSamplingRate;
    }

    function initializeChart() {
        startTime.value = Date.now();
        lastSampleTime.value = null;
        chartPoints.value = [];
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
    }

    function clearData() {
        chartPoints.value = [];
        startTime.value = null;
        lastSampleTime.value = null;
    }

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
    };
});
