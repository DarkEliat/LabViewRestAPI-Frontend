<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed, unref } from 'vue';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import type { TooltipItem } from 'chart.js';
import { Line } from 'vue-chartjs';
import { useChartStore } from '@/stores/chart';
import { useServoStore } from '@/stores/servo';
import { useConnectionStore } from '@/stores/connection';
import type { ChartPoint } from '@/types/chart.types';

// Rejestracja komponentów Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const chartStore = useChartStore();
const servoStore = useServoStore();
const connectionStore = useConnectionStore();

// Reaktywne wartości dla osi czasu
const timeMin = computed(() => chartStore.timeWindow.min);
const timeMax = computed(() => chartStore.timeWindow.max);

// Dane wykresu
const chartData = computed(() => ({
    datasets: [
        {
            label: 'Aktualna pozycja',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            data: chartStore.chartPoints.map((point: ChartPoint) => ({
                x: point.elapsedTime,
                y: point.position,
            })),
            fill: false,
            pointRadius: 2,
        },
    ],
}));

// Opcje wykresu
const chartOptions = computed(() => ({
    responsive: true,
    maintainAspectRatio: false,
    animation: {
        duration: 0.5, // Skrótka animacja dla płynniejszego wykresu
    },
    scales: {
        y: {
            min: 0,
            max: 180,
            grid: {
                color: 'rgba(255, 255, 255, 0.1)',
            },
            title: {
                display: true,
                text: 'Pozycja serwa [°]',
                color: 'rgba(255, 255, 255, 0.8)',
                font: {
                    size: 12,
                },
                padding: { top: 10 },
            },
            ticks: {
                color: 'rgba(255, 255, 255, 0.8)',
                stepSize: 10, // Pokazuj etykiety co 10°
            },
        },
        x: {
            type: 'linear' as const,
            bounds: 'data' as const,
            position: 'bottom' as const,
            min: unref(timeMin.value),
            max: unref(timeMax.value),
            grid: {
                color: 'rgba(255, 255, 255, 0.1)',
            },
            title: {
                display: true,
                text: 'Czas [s]',
                color: 'rgba(255, 255, 255, 0.8)',
                font: {
                    size: 12,
                },
                padding: { top: 10 },
            },
            ticks: {
                color: 'rgba(255, 255, 255, 0.8)',
                maxRotation: 0,
                stepSize: 1, // Pokazywanie etykiety co 1 sekundę
                callback(value: string | number) {
                    return `${value}`;
                },
            },
        },
    },
    plugins: {
        legend: {
            labels: {
                color: 'rgba(255, 255, 255, 0.8)',
            },
        },
        tooltip: {
            callbacks: {
                label: (context: TooltipItem<'line'>) => `Pozycja: ${context.parsed.y}°`,
                title: (items: TooltipItem<'line'>[]) => {
                    const time = items[0].parsed.x;
                    return `Czas: ${time}s`;
                },
            },
        },
    },
}));

// Interwał aktualizacji
const updateInterval = ref<number | null>(null);

onMounted(() => {
    // Dodaj aktualną pozycję jako pierwszy punkt
    if (connectionStore.labViewConnected)
        chartStore.addDataPoint(servoStore.currentStatus.status.position);

    // Ustaw interwał aktualizacji co 100ms (10 próbek na sekundę)
    updateInterval.value = setInterval(() => {
        if (connectionStore.labViewConnected)
            chartStore.addDataPoint(servoStore.currentStatus.status.position);
    }, 100) as unknown as number;
});

onUnmounted(() => {
    if (updateInterval.value !== null) {
        clearInterval(updateInterval.value);
    }
});
</script>

<template>
    <div class="chart-container">
        <Line :data="chartData" :options="chartOptions" />
    </div>
</template>

<style scoped>
.chart-container {
    width: 100%;
    height: 40rem;
    background-color: var(--color-background-soft);
    border-radius: 0.5rem;
    padding: 1rem;
    margin-top: 1rem;
}
</style>
