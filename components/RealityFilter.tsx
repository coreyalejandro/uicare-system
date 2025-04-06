import { useReality } from './RealityProvider';

export const RealityFilter = () => {
  const { filter, setFilter } = useReality();
  return (
    <div>
      {['default', 'ninja', 'red'].map((f) => (
        <button key={f} onClick={() => setFilter(f)} aria-pressed={filter === f}>
          {f === 'ninja' ? '👁 Ninja Vision' : f === 'red' ? '🔴 Protocol' : 'Standard'}
        </button>
      ))}
    </div>
  );
};
