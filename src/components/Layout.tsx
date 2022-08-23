import React, { useState } from "react";
import { AppShell, MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { useFefaColorScheme } from "../hooks/styles";
import { ContextProviderComponent } from "../lib/context";
import LessonNavbar from "./Navbar";
import { useLessonSources } from "../hooks/data";

export default function Layout(props: any) {
  const [opened] = useState(false);
  const sections = useLessonSources();
  const { colorScheme, toggleColorScheme } = useFefaColorScheme();

  return (
    <ContextProviderComponent>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            fontFamily: "Oxygen",
            loader: "dots",
            colorScheme,
          }}
        >
          <AppShell
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            padding={0}
            navbar={<LessonNavbar sections={sections} opened={opened} />}
          >
            {props.children}
          </AppShell>
        </MantineProvider>
      </ColorSchemeProvider>
    </ContextProviderComponent>
  );
}
