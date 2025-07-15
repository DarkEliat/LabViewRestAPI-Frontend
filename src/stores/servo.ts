import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useServoStore = defineStore('servo', () => {
    const currentPosition = ref(0);
    const nextPosition = ref(0);
    const controlMode = ref<'manual' | 'auto'>('manual');

    const isNextPositionValid = computed(() => {
        return nextPosition.value >= 0 && nextPosition.value <= 180;
    });

    function setControlMode(mode: 'manual' | 'auto') {
        controlMode.value = mode;
    }

    function setNewPosition() {
        if (!isNextPositionValid.value) return;
        currentPosition.value = nextPosition.value;
    }

    function updateNextPosition(position: number) {
        nextPosition.value = position;
    }

    return {
        currentPosition,
        nextPosition,
        controlMode,
        isNextPositionValid,
        setControlMode,
        setNewPosition,
        updateNextPosition,
    };
});
