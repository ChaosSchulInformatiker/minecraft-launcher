"use client";

import { Icon } from "@iconify/react";
import { Modal } from "../ui/Modal";
import { useThemeStore } from "../../store/useThemeStore";
import { IconButton } from "../ui/buttons/IconButton";

interface CreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreditsModal({ isOpen, onClose }: CreditsModalProps) {
  const accentColor = useThemeStore((state) => state.accentColor);
  
  if (!isOpen) return null;

  return (
    <Modal
      title="Credits"
      titleIcon={<Icon icon="solar:code-bold" className="w-6 h-6" />}
      onClose={onClose}
      width="md"
    >
      <div className="p-6">        <div className="space-y-6">
        <div className="flex items-center justify-between p-4 rounded-lg bg-black/20 border-2 border-white/20 transition-colors">
          <div className="flex items-center gap-4">
            <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${accentColor.value}40` }}
            >
              <Icon
                  icon="solar:server-bold"
                  className="w-5 h-5"
                  style={{ color: accentColor.value }}
              />
            </div>
            <div className="min-h-[3rem] flex flex-col justify-center">
              <div className="flex items-baseline gap-2">
                <h4 className="text-2xl font-minecraft text-white lowercase tracking-wider">
                  FauxKiwi
                </h4>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white/80 font-minecraft text-lg lowercase tracking-wide">
              CSI Minecraft Launcher (Fork)
            </p>
          </div>
        </div>
          <div className="flex items-center justify-between p-4 rounded-lg bg-black/20 border-2 border-white/20 transition-colors">
            <div className="flex items-center gap-4">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${accentColor.value}40` }}
              >
                <Icon
                  icon="solar:server-bold"
                  className="w-5 h-5"
                  style={{ color: accentColor.value }}
                />
              </div>
              <div className="min-h-[3rem] flex flex-col justify-center">
                <div className="flex items-baseline gap-2">
                  <h4 className="text-2xl font-minecraft text-white lowercase tracking-wider">
                    NoRisk Launcher Team
                  </h4>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white/80 font-minecraft text-lg lowercase tracking-wide">
                The original Launcher
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
