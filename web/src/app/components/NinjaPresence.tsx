'use client';

import { useState } from 'react';
import { spacing, typography } from '@/design-system';

export const NinjaPresence = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <button
      aria-label="Toggle ninja mode"
      aria-pressed={isActive}
      className={`fixed rounded-full bg-foreground/10 backdrop-blur-sm transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-ring ${
        isActive ? 'scale-110 bg-foreground/20' : 'hover:bg-foreground/15'
      }`}
      style={{
        bottom: spacing.md,
        right: spacing.md,
        width: spacing.xxl,
        height: spacing.xxl,
      }}
      onClick={() => {
        setIsActive(!isActive);
        alert('👁 Ninja Mode ' + (isActive ? 'Deactivated' : 'Activated'));
      }}
    >
      <span
        className="transition-transform duration-300"
        style={{ fontSize: typography.h2, transform: isActive ? 'scale(1.1)' : undefined }}
      >
        👁
      </span>
    </button>
  );
};
