export type ServoControlMode = 'manual' | 'auto';

// Definicja typu z ograniczeniem
export type Range<Min extends number, Max extends number> = number extends infer T
    ? T extends number
        ? T extends Min | Max | (Min extends T ? (Max extends T ? T : never) : never)
            ? T
            : never
        : never
    : never;

export type ServoPosition = Range<0, 180>;

export interface ServoStatus {
    status: {
        mode: ServoControlMode;
        position: ServoPosition;
    };
}

export const DEFAULT_SERVO_STATUS = {
    status: {
        mode: 'manual',
        position: 0,
    },
} satisfies ServoStatus;

export interface AllServoData {
    status: {
        mode: ServoControlMode;
        position: ServoPosition;
    };
    esp32Connected: boolean;
}

export const DEFAULT_ALL_SERVO_DATA = {
    status: {
        mode: 'manual',
        position: 0,
    },
    esp32Connected: false,
} satisfies AllServoData;

export const isPositionValid = (position: number) => position >= 0 && position <= 180;

export interface ServoResponse {
    response: 'OK' | 'ERROR';
}
