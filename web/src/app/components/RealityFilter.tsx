'use client';

import { useReality } from './RealityProvider';
import { spacing } from '@/design-system';

export const RealityFilter = () => {
  const { filter, setFilter } = useReality();

  return (
    <div
      className="fixed flex gap-2 bg-background/80 backdrop-blur-sm rounded-lg shadow-lg"
      style={{ top: spacing.md, right: spacing.md, padding: spacing.sm }}
    >
      {[
        { id: 'default' as const, label: 'Standard', icon: '🌐' },
        { id: 'ninja' as const, label: 'Ninja Vision', icon: '👁' },
        { id: 'red' as const, label: 'Protocol', icon: '🔴' }
      ].map(({ id, label, icon }) => (
        <button
          key={id}
          onClick={() => setFilter(id)}
          className={`rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring ${
            filter === id ? 'bg-foreground text-background' : 'hover:bg-foreground/10'
          }`}
          style={{ padding: `${spacing.xs} ${spacing.sm}` }}
          aria-pressed={filter === id}
        >
          <span style={{ marginRight: spacing.xs }}>{icon}</span>
          {label}
        </button>
      ))}
    </div>
  );
};
