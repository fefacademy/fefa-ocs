import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { MoonIcon, SunIcon } from "@modulz/radix-icons";
import React from "react";
import { IconSun, IconMoon } from "@tabler/icons";

const ThemeButton = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <div>
      <ActionIcon
        variant="outline"
        color={dark ? "yellow" : "blue"}
        onClick={() => toggleColorScheme()}
        title="Toggle theme"
        style={{ width: 30, height: 30 }}
      >
        {dark ? (
          <IconSun size={20} stroke={2} />
        ) : (
          <IconMoon size={20} stroke={2} />
        )}
      </ActionIcon>
    </div>
  );
};

export default ThemeButton;
