import { apiService } from '@/services/api.service';
import { useServoStore } from '@/stores/servo';
import type { ServoStatus, ServoControlMode, ServoResponse, AllServoData } from '@/types/servo.types';

const servoStore = useServoStore();

export async function getStatus(updateServoStore = false) {
    try {
        const servoStatusFromServer = await apiService.get<AllServoData>('/status');

        if (servoStatusFromServer) {
            if (updateServoStore) servoStore.setStatus(servoStatusFromServer);

            return servoStatusFromServer;
        } else console.error('Error: No received data from /status');
    } catch (error) {
        console.error('Error fetching /status:', error);
    }
}

export async function getControlMode(updateServoStore = false) {
    try {
        const servoStatus = await getStatus();

        if (servoStatus && typeof servoStatus.status.mode === 'string') {
            if (updateServoStore) servoStore.setControlMode(servoStatus.status.mode);

            return servoStatus.status.mode;
        } else console.error('Invalid data format from API:', servoStatus);
    } catch (error) {
        console.error('Error fetching control mode from /status:', error);
    }
}

export async function getPosition(updateServoStore = false) {
    try {
        const servoStatus = await getStatus();

        if (servoStatus && typeof servoStatus.status.position === 'number') {
            if (updateServoStore) servoStore.setPosition(servoStatus.status.position);

            return servoStatus.status.position;
        } else console.error('Invalid data format from API:', servoStatus);
    } catch (error) {
        console.error('Error fetching position from /status:', error);
    }
}

export async function setStatus(newStatus: ServoStatus, updateServoStore = false) {
    try {
        console.log('Setting status to:', newStatus);

        const dataToSend: ServoStatus = newStatus;
        const response = await apiService.post<ServoResponse>('/actuator', dataToSend);

        console.log('Response from server:', response);

        if (updateServoStore && response.response === 'OK') servoStore.currentStatus = newStatus;
    } catch (error) {
        console.error('Error setting status (sending to /actuator):', error);
    }
}

export async function setControlMode(newMode: ServoControlMode, updateServoStore = false) {
    try {
        const currentServoStatus = await getStatus();

        if (!currentServoStatus)
            throw new Error('received status data (from /status) is undefined');

        if (currentServoStatus.status.mode === newMode) {
            console.log('Control mode is already set to:', newMode);
            return;
        }

        console.log('Setting control mode to:', newMode);

        const dataToSend = {
            status: {
                mode: newMode,
                position: currentServoStatus.status.position,
            },
        } satisfies ServoStatus;

        const response = await apiService.post<ServoResponse>('/actuator', dataToSend);

        console.log('Response from server:', response);

        if (updateServoStore && response.response === 'OK')
            servoStore.currentStatus.status.mode = newMode;
    } catch (error) {
        console.error('Error setting control mode to /actuator:', error);
    }
}

export async function setPosition(newPosition: number, updateServoStore = false) {
    try {
        if (typeof newPosition !== 'number') {
            throw new Error('newPosition must be a number');
        }

        const currentServoStatus = await getStatus();

        if (!currentServoStatus)
            throw new Error('received status data (from /status) is undefined');

        if (currentServoStatus.status.position === newPosition) {
            console.log('Position is already set to:', newPosition);
            return;
        }

        console.log('Setting position to:', newPosition);

        const dataToSend = {
            status: {
                mode: currentServoStatus.status.mode,
                position: newPosition,
            },
        } satisfies ServoStatus;

        const response = await apiService.post<ServoResponse>('/actuator', dataToSend);

        console.log('Response from server:', response);

        if (updateServoStore && response.response === 'OK')
            servoStore.currentStatus.status.position = newPosition;
    } catch (error) {
        console.error('Error setting control mode to /actuator:', error);
    }
}
