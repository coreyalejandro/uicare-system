'use client';

import { useState } from 'react';
import { useSettings } from './SettingsContext';
import { spacing, typography } from '@/design-system';

export default function SettingsPanel() {
  const { settings, updateSettings } = useSettings();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed z-50" style={{ bottom: spacing.md, left: spacing.md }}>
      <button
        aria-label="Open settings"
        aria-expanded={isOpen}
        aria-controls="settings-panel"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full bg-foreground/10 backdrop-blur-sm hover:bg-foreground/20 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
        style={{ padding: spacing.sm }}
      >
        ⚙️
      </button>

      {isOpen && (
        <div
          id="settings-panel"
          role="dialog"
          className="absolute bg-background/90 backdrop-blur-sm border border-foreground/20 rounded-lg shadow-lg"
          style={{ bottom: spacing.xl, left: 0, width: spacing.panel, padding: spacing.md }}
        >
          <h3 className="font-semibold" style={{ fontSize: typography.h3, marginBottom: spacing.md }}>
            Settings
          </h3>

          <div className="space-y-4">
            {/* Audio Settings */}
            <div>
              <h4 className="font-medium" style={{ marginBottom: spacing.sm }}>
                Audio Feedback
              </h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={settings.audioEnabled}
                    onChange={(e) => updateSettings({ audioEnabled: e.target.checked })}
                    className="rounded border-foreground/20"
                  />
                  <span>Enable Audio</span>
                </label>

                <div>
                  <label className="block text-sm" style={{ marginBottom: spacing.xs }}>
                    Volume
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={settings.audioVolume}
                    onChange={(e) => updateSettings({ audioVolume: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm" style={{ marginBottom: spacing.xs }}>
                    Frequency (Hz)
                  </label>
                  <input
                    type="range"
                    min="220"
                    max="880"
                    step="1"
                    value={settings.audioFrequency}
                    onChange={(e) => updateSettings({ audioFrequency: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Filter Intensity Settings */}
            <div>
              <h4 className="font-medium" style={{ marginBottom: spacing.sm }}>
                Filter Intensity
              </h4>
              <div className="space-y-2">
                <div>
                  <label className="block text-sm" style={{ marginBottom: spacing.xs }}>
                    Ninja Vision
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={settings.filterIntensity.ninja}
                    onChange={(e) =>
                      updateSettings({
                        filterIntensity: {
                          ...settings.filterIntensity,
                          ninja: parseFloat(e.target.value)
                        }
                      })
                    }
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm" style={{ marginBottom: spacing.xs }}>
                    Protocol
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={settings.filterIntensity.protocol}
                    onChange={(e) =>
                      updateSettings({
                        filterIntensity: {
                          ...settings.filterIntensity,
                          protocol: parseFloat(e.target.value)
                        }
                      })
                    }
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
