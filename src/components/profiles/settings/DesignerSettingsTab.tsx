"use client";

import type { Profile } from "../../../types/profile";
import { Checkbox } from "../../ui/Checkbox";
// import { Label } from "../../ui/Label"; // No longer needed for this specific checkbox

interface DesignerSettingsTabProps {
  editedProfile: Profile;
  updateProfile: (updates: Partial<Profile>) => void;
}

export function DesignerSettingsTab({
  editedProfile,
  updateProfile,
}: DesignerSettingsTabProps) {

  return (
    <div className="space-y-4 pt-2">
      <div>
        <h3 className="text-3xl font-minecraft text-white mb-3 lowercase">
          Asset Management
        </h3>
        <div className="p-0">
          <div className="flex items-center space-x-3 mb-2">
            <Checkbox
              id="keepLocalAssetsDesigner"
              label="Keep Local Assets"
              checked={false}
              variant="flat"
              className="text-2xl"
            />
          </div>
          <p className="text-xs text-white/70 font-minecraft-ten tracking-wide select-none pl-1">
            If checked, edited assets (wings, norisk.jsons, etc.) will not be 
            overwritten upon relaunch.
          </p>
        </div>
      </div>
      {/* Add more designer-specific settings here in the future if needed */}
    </div>
  );
} 