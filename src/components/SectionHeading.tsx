import { useMantineColorScheme } from "@mantine/core";
import React from "react";

export default function SectionHeading({ heading }: any) {
  const { colorScheme } = useMantineColorScheme();
  return (
    <div
      className={`w-full block bg-gray-400 uppercase p-5 ${
        colorScheme === "dark" ? "bg-cyan-800" : "bg-blue-200"
      }`}
    >
      <h5 className="font-bold text-lg">{heading}</h5>
    </div>
  );
}
