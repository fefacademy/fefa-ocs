import { AppShell, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import React, { useState } from "react";
import { useLessonSources } from "../hooks/data";
import { useFefaColorScheme } from "../hooks/styles";
import { ContextProviderComponent } from "../lib/context";
import MdxProvider from "./MdxProvider";
import LessonNavbar from "./Navbar";

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
            <MdxProvider>{props.children}</MdxProvider>
          </AppShell>
        </MantineProvider>
      </ColorSchemeProvider>
    </ContextProviderComponent>
  );
}
