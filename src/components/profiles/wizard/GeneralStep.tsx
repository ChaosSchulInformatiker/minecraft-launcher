"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import type { Profile } from "../../../types/profile";
import { invoke } from "@tauri-apps/api/core";
import { useThemeStore } from "../../../store/useThemeStore";
import { Input } from "../../ui/Input";
import { Select } from "../../ui/Select";
import { RangeSlider } from "../../ui/RangeSlider";
import { Card } from "../../ui/Card";
import { gsap } from "gsap";

interface GeneralStepProps {
  profile: Partial<Profile>;
  updateProfile: (updates: Partial<Profile>) => void;
  systemRamMb: number;
}

interface NoriskPack {
  displayName: string;
  description: string;
  isExperimental?: boolean;
}

export function GeneralStep({
  profile,
  updateProfile,
  systemRamMb,
}: GeneralStepProps) {
  const [nameError, setNameError] = useState<string | null>(null);
  const [noriskPacks, setNoriskPacks] = useState<Record<string, NoriskPack>>(
    {},
  );
  const [loading, setLoading] = useState(false);
  const [memoryMaxMb, setMemoryMaxMb] = useState<number>(
    profile.settings?.memory?.max || 4096,
  );
  const accentColor = useThemeStore((state) => state.accentColor);
  const isBackgroundAnimationEnabled = useThemeStore(
    (state) => state.isBackgroundAnimationEnabled,
  );
  const detailsCardRef = useRef<HTMLDivElement>(null);
  const settingsCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      isBackgroundAnimationEnabled &&
      detailsCardRef.current &&
      settingsCardRef.current
    ) {
      gsap.fromTo(
        [detailsCardRef.current, settingsCardRef.current],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
        },
      );
    }

    const loadNoriskPacks = async () => {
      try {
        setLoading(true);
        const packsData = await invoke<{ packs: Record<string, NoriskPack> }>(
          "get_norisk_packs",
        ).catch(() => ({
          packs: {},
        }));
        setNoriskPacks(packsData.packs);
      } catch (err) {
        console.error("Failed to load NoRisk packs:", err);
      } finally {
        setLoading(false);
      }
    };

    loadNoriskPacks();
  }, [isBackgroundAnimationEnabled]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    updateProfile({ name });

    if (!name) {
      setNameError("profile name is required");
    } else {
      setNameError(null);
    }
  };

  const handleMemoryChange = (value: number) => {
    setMemoryMaxMb(value);
    updateProfile({
      settings: {
        ...profile.settings!,
        memory: {
          min: 1024,
          max: value,
        },
      },
    });
  };

  const noriskPackOptions = Object.entries(noriskPacks).map(
    ([packId, packDef]) => ({
      value: packId,
      label: `${packDef.displayName} ${packDef.isExperimental ? "(experimental)" : ""}`,
    }),
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-minecraft text-white mb-3 lowercase">
          profile details
        </h2>
        <p className="text-xs text-white/70 font-minecraft-ten tracking-wide">
          Enter basic information about your Minecraft profile.
        </p>
      </div>

      <Card
        ref={detailsCardRef}
        variant="flat"
        className="p-6 space-y-6 bg-black/20 border border-white/10"
      >
        <div>
          <label className="block text-2xl font-minecraft text-white mb-2 lowercase">
            profile name <span className="text-red-400">*</span>
          </label>
          <Input
            value={profile.name || ""}
            onChange={handleNameChange}
            placeholder="My Awesome Profile"
            error={nameError}
            icon={<Icon icon="solar:user-bold" className="w-5 h-5" />}
          />
        </div>

        <div>
          <label className="block text-2xl font-minecraft text-white mb-2 lowercase">
            group
          </label>
          <Input
            value={profile.group || ""}
            onChange={(e) => updateProfile({ group: e.target.value || null })}
            placeholder="e.g. modpacks, vanilla+"
            icon={<Icon icon="solar:folder-bold" className="w-5 h-5" />}
          />
        </div>
      </Card>

      <Card
        ref={settingsCardRef}
        variant="flat"
        className="p-6 space-y-6 bg-black/20 border border-white/10"
      >
        <div>
          <label className="block text-2xl font-minecraft text-white mb-2 lowercase">
            maximum ram: {memoryMaxMb} MiB ({(memoryMaxMb / 1024).toFixed(1)} GiB)
          </label>
          <RangeSlider
            value={memoryMaxMb}
            onChange={handleMemoryChange}
            min={1024}
            max={systemRamMb}
            step={512}
            minLabel="1 GiB"
            maxLabel={`${(systemRamMb / 1024).toFixed(1)} GiB`}
          />
          {(() => {
            let recommendedDisplayRam;
            if (systemRamMb <= 8192) {
              recommendedDisplayRam = Math.min(2048, systemRamMb);
            } else {
              recommendedDisplayRam = Math.min(4096, systemRamMb);
            }
            recommendedDisplayRam = Math.max(recommendedDisplayRam, 1024); // Ensure at least 1024

            return (
              <p className="text-xs text-white/60 mt-3 font-minecraft-ten tracking-wide">
                Recommended: {recommendedDisplayRam} MiB (
                {(recommendedDisplayRam / 1024).toFixed(1)} GiB)
              </p>
            );
          })()}
        </div>
      </Card>
    </div>
  );
}
