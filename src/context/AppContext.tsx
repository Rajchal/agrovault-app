import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Language } from './i18n';
import { fetchSensorDataWithRetry, SensorData } from '../services/api';

const HISTORY_LIMIT = 12;

const pushHistory = (history: number[], value: number) => {
    const next = [...history, value];
    return next.slice(-HISTORY_LIMIT);
};

interface AppContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    mode: 'AUTO' | 'ECO' | 'PRECOOL' | 'MANUAL';
    setMode: (mode: 'AUTO' | 'ECO' | 'PRECOOL' | 'MANUAL') => void;
    selectedCrops: string[];
    setSelectedCrops: (crops: string[]) => void;
    doorOpen: boolean;
    setDoorOpen: (open: boolean) => void;
    gridOn: boolean;
    setGridOn: (on: boolean) => void;
    temp: number;
    setTemp: (temp: number) => void;
    humidity: number;
    setHumidity: (hum: number) => void;
    battery: number;
    setBattery: (bat: number) => void;
    solar: number;
    setSolar: (sol: number) => void;
    ambient: number;
    setAmbient: (amb: number) => void;
    compressorOn: boolean;
    setCompressorOn: (on: boolean) => void;
    loading: boolean;
    refreshing: boolean;
    error: string | null;
    lastUpdateTime: number;
    tempHistory: number[];
    humidityHistory: number[];
    refreshData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('ne');
    const [mode, setMode] = useState<'AUTO' | 'ECO' | 'PRECOOL' | 'MANUAL'>('AUTO');
    const [selectedCrops, setSelectedCrops] = useState<string[]>(['TOMATO']);
    const [doorOpen, setDoorOpen] = useState(false);
    const [gridOn, setGridOn] = useState(true);
    const [temp, setTemp] = useState(11.5);
    const [humidity, setHumidity] = useState(88);
    const [battery, setBattery] = useState(84);
    const [solar, setSolar] = useState(220);
    const [ambient, setAmbient] = useState(33);
    const [compressorOn, setCompressorOn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdateTime, setLastUpdateTime] = useState(0);
    const [tempHistory, setTempHistory] = useState<number[]>([11.5, 11.5, 11.5, 11.5, 11.5]);
    const [humidityHistory, setHumidityHistory] = useState<number[]>([88, 88, 88, 88, 88]);

    const refreshData = async (options?: { silent?: boolean }) => {
        const silent = options?.silent ?? false;

        try {
            if (silent) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }
            setError(null);
            const data = await fetchSensorDataWithRetry();

            if (data.temperature !== undefined) setTemp(data.temperature);
            if (data.humidity !== undefined) setHumidity(data.humidity);
            if (data.battery !== undefined) setBattery(data.battery);
            if (data.solar !== undefined) setSolar(data.solar);
            if (data.ambient !== undefined) setAmbient(data.ambient);
            if (data.compressor !== undefined) setCompressorOn(data.compressor);
            if (data.doorOpen !== undefined) setDoorOpen(data.doorOpen);
            if (data.gridOn !== undefined) setGridOn(data.gridOn);
            if (data.vegetables !== undefined) setSelectedCrops(data.vegetables);
            if (data.temperature !== undefined) {
                setTempHistory(current => pushHistory(current, data.temperature as number));
            }
            if (data.humidity !== undefined) {
                setHumidityHistory(current => pushHistory(current, data.humidity as number));
            }

            setLastUpdateTime(Date.now());
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Failed to fetch sensor data';
            setError(errorMsg);
            console.error('AppContext refresh error:', err);
        } finally {
            if (silent) {
                setRefreshing(false);
            } else {
                setLoading(false);
            }
        }
    };

    // Initial fetch on mount
    useEffect(() => {
        refreshData();
    }, []);

    // Auto-refresh every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => refreshData({ silent: true }), 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <AppContext.Provider
            value={{
                language,
                setLanguage,
                mode,
                setMode,
                selectedCrops,
                setSelectedCrops,
                doorOpen,
                setDoorOpen,
                gridOn,
                setGridOn,
                temp,
                setTemp,
                humidity,
                setHumidity,
                battery,
                setBattery,
                solar,
                setSolar,
                ambient,
                setAmbient,
                compressorOn,
                setCompressorOn,
                loading,
                refreshing,
                error,
                lastUpdateTime,
                tempHistory,
                humidityHistory,
                refreshData,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within AppProvider');
    }
    return context;
};
