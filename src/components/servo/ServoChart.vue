<script setup lang="ts">
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
import { watch, onMounted, onUnmounted, ref, computed } from 'vue';

interface ChartDataPoint {
    elapsedTime: number;
    position: number;
}

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
            label: 'Aktualna pozycja serwa (°)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            data: chartStore.chartPoints.map((point: ChartDataPoint) => ({
                x: point.elapsedTime,
                y: point.position,
            })),
            fill: true,
            pointRadius: 1, // Mniejsze punkty dla gęstszego wykresu
        },
    ],
}));

// Opcje wykresu
const chartOptions = computed(() => ({
    responsive: true,
    maintainAspectRatio: false,
    animation: {
        duration: 0, // Wyłączamy animacje dla płynniejszego wykresu
    },
    scales: {
        y: {
            min: 0,
            max: 180,
            grid: {
                color: 'rgba(255, 255, 255, 0.1)',
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
            min: timeMin.value,
            max: timeMax.value,
            grid: {
                color: 'rgba(255, 255, 255, 0.1)',
            },
            ticks: {
                color: 'rgba(255, 255, 255, 0.8)',
                maxRotation: 0,
                stepSize: 5, // Pokazuj etykiety co 5 sekund
                callback(value: string | number) {
                    return `${value}s`;
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
                label: (context: TooltipItem<'line'>) => `Pozycja: ${context.raw}°`,
                title: (items: TooltipItem<'line'>[]) => {
                    const time = items[0].parsed.x;
                    return `Czas: ${time}s`;
                },
            },
        },
    },
}));

// Aktualizacja wykresu przy zmianie pozycji
watch(
    () => servoStore.currentStatus.status.position,
    (newPosition) => {
        chartStore.addDataPoint(newPosition);
    }
);

// Resetowanie wykresu przy zmianie stanu połączenia
watch(
    () => connectionStore.webSocket,
    (newSocket, oldSocket) => {
        if (newSocket && !oldSocket) {
            chartStore.initializeChart();
        }
    }
);

// Interwał aktualizacji
const updateInterval = ref<number | null>(null);

onMounted(() => {
    // Dodaj aktualną pozycję jako pierwszy punkt
    chartStore.addDataPoint(servoStore.currentStatus.status.position);

    // Ustaw interwał aktualizacji co 100ms (10 próbek na sekundę)
    updateInterval.value = setInterval(() => {
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
