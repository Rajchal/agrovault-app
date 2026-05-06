import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Language } from './i18n';

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
