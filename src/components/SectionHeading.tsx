import { Group, useMantineColorScheme } from "@mantine/core";
import { IconFolder } from "@tabler/icons";
import React from "react";
import { refineName } from "../utils";

export default function SectionHeading({ heading }: any) {
  const { colorScheme } = useMantineColorScheme();
  return (
    <div
      className={`w-full block bg-gray-400 uppercase p-5 ${
        colorScheme === "dark" ? "bg-cyan-800" : "bg-blue-200"
      }`}
    >
      <Group noWrap spacing={"xs"}>
        <IconFolder />
        <h5 className="font-['Oxygen_Bold'] text-lg tracking-wide">
          {refineName(heading)}
        </h5>
      </Group>
    </div>
  );
}
