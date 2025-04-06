import { createContext, useState, useContext, useEffect } from 'react';

type RealityFilter = 'default' | 'ninja' | 'red';

const RealityContext = createContext({
  filter: 'default' as RealityFilter,
  setFilter: (f: RealityFilter) => {},
});

export const useReality = () => useContext(RealityContext);

export const RealityProvider = ({ children }) => {
  const [filter, setFilter] = useState<RealityFilter>('default');

  useEffect(() => {
    if (filter === 'red') {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      const play = () => {
        const osc = context.createOscillator();
        const gain = context.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(54.7, context.currentTime);
        gain.gain.setValueAtTime(0.3, context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 1.5);
        osc.connect(gain).connect(context.destination);
        osc.start();
        osc.stop(context.currentTime + 1.6);
      };
      const interval = setInterval(play, 13000);
      return () => clearInterval(interval);
    }
  }, [filter]);

  return (
    <RealityContext.Provider value={{ filter, setFilter }}>
      <div className={`reality-layer ${filter}`}>{children}</div>
    </RealityContext.Provider>
  );
};
