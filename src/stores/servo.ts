import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { type ServoStatus, type ServoControlMode, DEFAULT_SERVO_STATUS } from '@/types/servo.types';

export const useServoStore = defineStore('servo', () => {
    const currentStatus = ref<ServoStatus>(DEFAULT_SERVO_STATUS);
    const nextPosition = ref(0);

    const isNextPositionValid = computed(() => {
        return nextPosition.value >= 0 && nextPosition.value <= 180;
    });

    function setStatus(newStatus: ServoStatus) {
        currentStatus.value = newStatus;
    }

    function setControlMode(newMode: ServoControlMode) {
        currentStatus.value.status.mode = newMode;
    }

    function setPosition(newPosition: number) {
        if (newPosition >= 0 && newPosition <= 180)
            currentStatus.value.status.position = newPosition;
    }

    function updateNextPosition(position: number) {
        nextPosition.value = position;
    }

    function applyNextPosition() {
        if (!isNextPositionValid.value) return;
        currentStatus.value.status.position = nextPosition.value;
    }

    return {
        currentStatus,
        nextPosition,
        isNextPositionValid,
        setStatus,
        setControlMode,
        setPosition,
        updateNextPosition,
        applyNextPosition,
    };
});
