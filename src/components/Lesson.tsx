import {
  Button,
  Card,
  Group,
  Switch,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconChevronLeft,
  IconChevronRight,
  IconDeviceDesktop,
  IconRefresh,
} from "@tabler/icons";
import { graphql } from "gatsby";
import React from "react";
import ReactPlayer from "react-player/file";
import slugify from "slugify";
import ContextConsumer from "../lib/context";
import {
  fetchItem,
  getLessonIndex,
  navigateToLesson,
  refineName,
  setItem,
} from "../utils";

interface ILessonProps {
  data: {
    file: {
      extension: string;
      name: string;
      relativeDirectory: string;
      relativePath: string;
      publicURL: string;
      prettySize: string;
    };

    allFile: {
      nodes: {
        name: string;
      }[];
    };
  };
}

export default function Lesson({ data }: ILessonProps) {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const lesson = data.file;
  const name = lesson.name;
  const sources = data.allFile.nodes;
  const progress = fetchItem("fefa-ocs-progress-course");

  const handlePlayback = ({ played, data, set }: any) => {
    const percent = played * 100;
    const newProgress: any = Object.assign({}, data.current);
    newProgress[name] = percent;

    // updated in react ctx session for live feedback
    set({
      current: {
        ...newProgress,
      },
    });

    // update in localStorage for persistence
    let oldValue = progress[slugify(name)];
    if (!oldValue || (oldValue && oldValue < percent)) {
      progress[slugify(name)] = percent;
      setItem("fefa-ocs-progress-course", progress);
    }
  };

  const handleCompleted = ({ data, set }: any) => {
    const completed = data.current.completed || [];
    completed.push(slugify(lesson.name));

    set({
      current: {
        ...data.current,
        completed,
      },
    });

    // mark lesson completed
    let values = fetchItem("fefa-ocs-completed");
    let prev = values.completed ?? [];
    values.completed = [...prev, slugify(lesson.name)];
    setItem("fefa-ocs-completed", values);
  };

  return (
    <ContextConsumer>
      {({ data, set }) => {
        return (
          <>
            <div className="p-14 flex flex-col space-y-5">
              <Card radius={"lg"}>
                <div className="flex space-x-3 items-center mb-3 justify-between">
                  <Group>
                    <IconDeviceDesktop size={30} stroke={2} />
                    <h2 className="text-2xl font-medium">
                      {refineName(lesson.name)}
                    </h2>
                  </Group>
                  <section className="flex ml-auto">
                    <button
                      disabled={getLessonIndex(sources) === 0}
                      className="navButton"
                      onClick={() => navigateToLesson("prev", sources)}
                    >
                      <IconChevronLeft size={20} />
                      <span>Previous</span>
                    </button>

                    <button
                      disabled={getLessonIndex(sources) === sources.length}
                      className={`navButton text-blue-400`}
                      onClick={() => navigateToLesson("next", sources)}
                    >
                      <span>Next</span>
                      <IconChevronRight size={20} />
                    </button>
                  </section>
                </div>
                <Card.Section>
                  <ReactPlayer
                    controls
                    url={lesson.publicURL}
                    progressInterval={5000}
                    width={"100%"}
                    height={"auto"}
                    config={{ forceVideo: true }}
                    onProgress={({ played }) =>
                      handlePlayback({ played, data, set })
                    }
                    onEnded={() => handleCompleted({ data, set })}
                  />
                </Card.Section>
                <div className="flex items-center justify-between pt-4">
                  <Group>
                    <Switch onLabel="ON" offLabel="OFF" />
                    <h1>Autoplay</h1>
                  </Group>
                  <Button variant="subtle" leftIcon={<IconRefresh />}>
                    <h1>Reset progress</h1>
                  </Button>
                </div>
              </Card>
            </div>
          </>
        );
      }}
    </ContextConsumer>
  );
}

export const query = graphql`
  query ($name: String!) {
    file(name: { eq: $name }) {
      extension
      name
      relativeDirectory
      relativePath
      publicURL
      prettySize
    }

    allFile(
      filter: { extension: { eq: "mp4" } }
      sort: { fields: name, order: ASC }
    ) {
      nodes {
        name
      }
    }
  }
`;
