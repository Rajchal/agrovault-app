const ESP32_API_URL = 'http://192.168.4.1/api';
const TIMEOUT = 10000; // 10 seconds

export interface SensorData {
    temperature?: number;
    humidity?: number;
    vegetables?: string[];
    battery?: number;
    solar?: number;
    ambient?: number;
    compressor?: boolean;
    doorOpen?: boolean;
    gridOn?: boolean;
}

/**
 * Fetch sensor data from ESP32 API
 */
export async function fetchSensorData(): Promise<SensorData> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

        const response = await fetch(ESP32_API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return data as SensorData;
    } catch (error) {
        console.error('Error fetching sensor data:', error);
        throw error;
    }
}

/**
 * Fetch with retry logic
 */
export async function fetchSensorDataWithRetry(
    maxRetries: number = 3,
    delayMs: number = 1000
): Promise<SensorData> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await fetchSensorData();
        } catch (error) {
            lastError = error as Error;
            console.warn(`Fetch attempt ${attempt}/${maxRetries} failed:`, lastError.message);

            if (attempt < maxRetries) {
                await new Promise(resolve => setTimeout(resolve, delayMs));
            }
        }
    }

    throw lastError || new Error('Failed to fetch sensor data after retries');
}
