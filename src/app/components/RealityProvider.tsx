'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSettings } from './SettingsContext';

type RealityFilter = 'default' | 'ninja' | 'red';

type RealityContextType = {
  filter: RealityFilter;
  setFilter: (filter: RealityFilter) => void;
};

const RealityContext = createContext<RealityContextType | undefined>(undefined);

export function useReality() {
  const context = useContext(RealityContext);
  if (context === undefined) {
    throw new Error('useReality must be used within a RealityProvider');
  }
  return context;
}

export function RealityProvider({ children }: { children: React.ReactNode }) {
  const [filter, setFilter] = useState<RealityFilter>('default');
  const { settings } = useSettings();

  useEffect(() => {
    if (filter === 'red' && settings.audioEnabled) {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = settings.audioFrequency;
      gainNode.gain.value = settings.audioVolume;
      
      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
        audioContext.close();
      }, 100);
    }
  }, [filter, settings.audioEnabled, settings.audioFrequency, settings.audioVolume]);

  const value = {
    filter,
    setFilter,
  };

  return (
    <RealityContext.Provider value={value}>
      <div className={`reality-layer ${filter}`}>
        {children}
      </div>
    </RealityContext.Provider>
  );
} 