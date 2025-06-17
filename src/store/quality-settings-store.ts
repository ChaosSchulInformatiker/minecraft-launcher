import { create } from "zustand";
import { persist } from "zustand/middleware";

export type QualityLevel = "low" | "medium" | "high";

interface QualitySettingsState {
  qualityLevel: QualityLevel;
  setQualityLevel: (level: QualityLevel) => void;
}

export const useQualitySettingsStore = create<QualitySettingsState>()(
  persist(
    (set) => ({
      qualityLevel: "low",
      setQualityLevel: (level) => set({ qualityLevel: level }),
    }),
    {
      name: "csi-quality-settings-storage",
    },
  ),
);
