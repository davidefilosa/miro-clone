"use client";

import { useStorage } from "@/liveblocks.config";
import { LayerType } from "@/types/canvas";
import { memo } from "react";
import { Rectangle } from "./rectangle";

interface LayerPreviewProps {
  layerId: string;
  onLayerPonterDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
}
export const LayerPreview = memo(
  ({ layerId, onLayerPonterDown, selectionColor }: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(layerId));
    if (!layer) {
      return null;
    }

    switch (layer.type) {
      case LayerType.Rectangle:
        return (
          <Rectangle
            id={layerId}
            layer={layer}
            onPointerDown={onLayerPonterDown}
            selectionColor={selectionColor}
          />
        );
      default:
        console.warn("Unkwnon layer type");
    }
  }
);

LayerPreview.displayName = "LayerPreview";
