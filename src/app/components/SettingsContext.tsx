'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Settings = {
  audioEnabled: boolean;
  audioVolume: number;
  audioFrequency: number;
  filterIntensity: {
    ninja: number;
    protocol: number;
  };
};

type SettingsContextType = {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
};

const defaultSettings: Settings = {
  audioEnabled: true,
  audioVolume: 0.1,
  audioFrequency: 440,
  filterIntensity: {
    ninja: 1,
    protocol: 1,
  },
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(() => {
    // Load settings from localStorage if available
    if (typeof window !== 'undefined') {
      const savedSettings = localStorage.getItem('uicare-settings');
      if (savedSettings) {
        return { ...defaultSettings, ...JSON.parse(savedSettings) };
      }
    }
    return defaultSettings;
  });

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem('uicare-settings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
} 