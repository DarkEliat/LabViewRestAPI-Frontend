export const API_CONFIG = {
    BASE_URL: 'http://localhost:9090/ServoControlService',
    TIMEOUT: 5000, // Timeout dla zapytań w milisekundach
    HEADERS: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
} as const;
