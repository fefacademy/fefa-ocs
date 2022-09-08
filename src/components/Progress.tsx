import { RingProgress } from "@mantine/core";
import React from "react";

export default function Progress({ currentProgress, watched }: any) {
  return (
    <RingProgress
      size={28}
      thickness={3}
      roundCaps
      sections={
        currentProgress
          ? [
              {
                color: "teal",
                value: Math.round(currentProgress),
              },
            ]
          : watched > 0
          ? [
              {
                color: "teal",
                value: Math.round(watched),
              },
            ]
          : []
      }
    />
  );
}
