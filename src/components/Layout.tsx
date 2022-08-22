import React, { useEffect, useRef, useState } from "react";
import {
  AppShell,
  MantineProvider,
  ColorSchemeProvider,
  RingProgress,
  Navbar,
  ScrollArea,
} from "@mantine/core";
import { useFefaColorScheme } from "../hooks/styles";
import { graphql, Link, useStaticQuery, navigate } from "gatsby";
import {
  IconChevronLeft,
  IconChevronRight,
  IconDeviceDesktop,
  IconSettings,
} from "@tabler/icons";
import { refineName } from "../utils";
import { ContextProviderComponent } from "../lib/context";
import ContextConsumer from "../lib/context";
import slugify from "slugify";

function SectionHeading({ colorScheme, heading }: any) {
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

function LessonEntry({ lesson, active, colorScheme }: any) {
  let progressData: any = JSON.parse(
    localStorage.getItem("fefa-ocs-progress-course") ?? "{}"
  );
  const [watched] = useState(progressData[slugify(lesson.name)] || 0);

  return (
    <ContextConsumer>
      {({ data }) => {
        return (
          <Link to={`/lesson/${lesson.name}`}>
            <div
              className={`w-full flex items-center justify-between  p-3 ${
                colorScheme === "dark"
                  ? "hover:bg-teal-900"
                  : "hover:bg-teal-200"
              } ${
                active &&
                `text-teal-400 ${
                  colorScheme === "dark" ? "bg-teal-800" : "bg-teal-100"
                }`
              }`}
            >
              <div className="flex items-center space-x-3 w-full">
                <IconDeviceDesktop size={20} stroke={2} />
                <span className="w-2/3 text-ellipsis">
                  {refineName(lesson.name)} ({lesson.prettySize})
                </span>
              </div>

              <RingProgress
                size={30}
                thickness={3}
                roundCaps
                sections={
                  watched > 0
                    ? [
                        {
                          color: "teal",
                          value: Math.round(watched),
                        },
                      ]
                    : data.current.name === lesson.name
                    ? [
                        {
                          color: "teal",
                          value: Math.round(data.current.value),
                        },
                      ]
                    : []
                }
              />
            </div>
          </Link>
        );
      }}
    </ContextConsumer>
  );
}

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
  const sections: any = {};

  sources.forEach((s: any) => {
    sections[s.relativeDirectory] = [];
  });
  sources.forEach((s: any) => {
    sections[s.relativeDirectory].push(s);
  });

  const { colorScheme, toggleColorScheme } = useFefaColorScheme();
  const [opened, setOpened] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";
  const currentLesson = decodeURI(url.split("/")[4]);
  const dark = colorScheme === "dark";

  const getLessonIndex = () => {
    let index = -1;
    sources.forEach((s: any, i: number) => {
      if (s.name === currentLesson) {
        index = i;
      }
    });
    return index;
  };

  const navigateLesson = (dir: string) => {
    const index = getLessonIndex();

    switch (dir) {
      case "next":
        {
          if (index >= 0) {
            const next = sources[index + 1];
            navigate(`/lesson/${next.name}`);
          }
        }
        break;
      case "prev": {
        if (index > 0) {
          const next = sources[index - 1];
          navigate(`/lesson/${next.name}`);
        }
      }
    }
  };

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
            navbar={
              <Navbar
                p={0}
                hiddenBreakpoint="sm"
                hidden={!opened}
                width={{ sm: 200, lg: 350 }}
              >
                <Navbar.Section
                  p={"md"}
                  className="shadow-lg flex items-center justify-between"
                >
                  <Link to="/" className="h-full">
                    <img
                      src="/images/fefa_name_logo.png"
                      alt="fefa_academy"
                      width={247}
                      height={40}
                    />
                  </Link>
                  <Link to="/settings">
                    <IconSettings size={30} />
                  </Link>
                </Navbar.Section>
                <ScrollArea>
                  <div className="flex flex-col">
                    <h2 className="text-2xl my-4 text-center">
                      The Course Title to go here. Descriptive and short
                    </h2>
                    {Object.keys(sections).map((name: any) => {
                      return (
                        <div>
                          <SectionHeading
                            colorScheme={colorScheme}
                            heading={name}
                          />
                          {sections[name].map((lesson: any) => {
                            const active = currentLesson === lesson.name;
                            return (
                              <LessonEntry
                                lesson={lesson}
                                active={active}
                                colorScheme={colorScheme}
                              />
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </Navbar>
            }
          >
            <section className="w-full grid grid-cols-2 shadow-xl font-bold">
              <button
                disabled={getLessonIndex() === 0}
                className="flex items-center justify-center uppercase p-6 cursor-pointer disabled:opacity-20"
                onClick={() => navigateLesson("prev")}
              >
                <IconChevronLeft size={20} />
                <span>Previous Lecture</span>
              </button>
              <button
                disabled={getLessonIndex() === sources.length}
                className={`flex items-center justify-center uppercase p-6 cursor-pointer disabled:opacity-20 ${
                  dark ? "bg-teal-800" : "bg-teal-200"
                }`}
                onClick={() => navigateLesson("next")}
              >
                <span>Next Lecture</span>
                <IconChevronRight size={20} />
              </button>
            </section>
            <div className="p-10 flex flex-col space-y-5">
              {props.children}
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
                possimus eum vero eaque numquam maiores adipisci tempore ab
                soluta aliquid, ipsa ex perferendis quisquam repellendus
                deserunt, dolores nisi error iure expedita exercitationem porro
                odit reiciendis. Corporis soluta perferendis sapiente optio
                natus possimus! Impedit
              </span>
            </div>
          </AppShell>
        </MantineProvider>
      </ColorSchemeProvider>
    </ContextProviderComponent>
  );
}
