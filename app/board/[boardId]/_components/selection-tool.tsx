"use client";

import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { useMutation, useSelf } from "@/liveblocks.config";
import { Camera, Color } from "@/types/canvas";
import { memo } from "react";
import { ColorPicker } from "./color-picker";

interface SelectionToolProps {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
}
export const SelectionTool = memo(
  ({ camera, setLastUsedColor }: SelectionToolProps) => {
    const selection = useSelf((me) => me.presence.selection);
    const selectionBounds = useSelectionBounds();

    const setFill = useMutation(
      ({ storage }, fill: Color) => {
        const liveLayers = storage.get("layers");
        setLastUsedColor(fill);
        selection.forEach((id) => {
          liveLayers.get(id)?.set("fill", fill);
        });
      },
      [selection, setLastUsedColor]
    );

    if (!selectionBounds) {
      return null;
    }

    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y;

    return (
      <div
        className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none "
        style={{
          transform: `translate(
                calc(${x}px - 50%),
                calc(${y - 16}px - 100%)
              )`,
        }}
      >
        <ColorPicker onChange={setFill} />
      </div>
    );
  }
);

SelectionTool.displayName = "SelectionTool";
