import React, { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  MantineProvider,
  ColorSchemeProvider,
  Paper,
} from "@mantine/core";
import { useFefaColorScheme } from "../hooks/styles";
import { graphql, Link, useStaticQuery } from "gatsby";

export default function Layout(props: any) {
  const data = useStaticQuery(graphql`
    query {
      videos: allFile(
        filter: { extension: { eq: "mp4" } }
        sort: { fields: name, order: ASC }
      ) {
        nodes {
          extension
          name
          relativeDirectory
          relativePath
          publicURL
          prettySize
        }
      }
    }
  `);
  const sources = data.videos.nodes;
  const refine = (val: string) => {
    val.replace(/^\d/i, "");
  };

  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useFefaColorScheme();
  const [opened, setOpened] = useState(false);
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          fontFamily: "inherit",
          loader: "dots",
          colorScheme,
        }}
      >
        <AppShell
          navbarOffsetBreakpoint="sm"
          asideOffsetBreakpoint="sm"
          navbar={
            <Navbar
              p={0}
              hiddenBreakpoint="sm"
              hidden={!opened}
              width={{ sm: 200, lg: 300 }}
            >
              <div className="flex flex-col">
                {sources.map((s: any) => {
                  return (
                    <Link to={`/lesson/${s.name}`}>
                      <div
                        className={`block w-full  p-3 ${
                          colorScheme === "dark"
                            ? "hover:bg-gray-700"
                            : "hover:bg-gray-200"
                        }`}
                      >
                        {s.name}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </Navbar>
          }
          aside={
            <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
              <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
                <Text>Application sidebar</Text>
              </Aside>
            </MediaQuery>
          }
          header={
            <Header height={70} p="md">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                  <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size="sm"
                    color={theme.colors.gray[6]}
                    mr="xl"
                  />
                </MediaQuery>
                <Text>Application header</Text>
              </div>
            </Header>
          }
        >
          {props.children}
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
