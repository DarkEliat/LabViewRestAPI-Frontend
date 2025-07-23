import { API_CONFIG } from '@/config/api.config';
import { useConnectionStore } from '@/stores/connection';

const connectionStore = useConnectionStore();

class ApiService {
    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${API_CONFIG.BASE_URL}${endpoint}`;
        const defaultOptions: RequestInit = {
            headers: API_CONFIG.HEADERS,
            ...options,
        };

        try {
            const response = await fetch(url, defaultOptions);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    async get<T>(endpoint: string): Promise<T> {
        try {
            const response = await this.request<T>(endpoint, { method: 'GET' });

            // Jeśli dostaliśmy odpowiedź, oznacza to że serwer działa
            connectionStore.updateLabViewConnection(true);

            return response;
        } catch {
            // Jeśli wystąpił błąd, oznacza to problem z połączeniem
            connectionStore.updateLabViewConnection(false);
            throw new Error('Error connecting to server');
        }
    }

    async post<T>(endpoint: string, data: unknown): Promise<T> {
        try {
            const response = await this.request<T>(endpoint, {
                method: 'POST',
                body: JSON.stringify(data),
            });

            // Jeśli dostaliśmy odpowiedź, oznacza to że serwer działa
            connectionStore.updateLabViewConnection(true);

            return response;
        } catch {
            // Jeśli wystąpił błąd, oznacza to problem z połączeniem
            connectionStore.updateLabViewConnection(false);
            throw new Error('Error connecting to server');
        }
    }
}

export const apiService = new ApiService();
