import { Card, Group, Select, Switch, Text } from "@mantine/core";
import {
  IconChevronLeft,
  IconChevronRight,
  IconDeviceDesktop,
} from "@tabler/icons";
import { graphql, HeadFC } from "gatsby";
import React, { useRef, useState } from "react";
import ReactPlayer from "react-player/file";
import slugify from "slugify";
import ContextConsumer from "../lib/context";
import { useGlobalStyles } from "../lib/shared";
import {
  fetchItem,
  getLessonIndex,
  navigateToLesson,
  refineName,
  setItem,
} from "../utils";
import { ILessonProps } from "../utils/interfaces";

export default function Lesson({ data }: ILessonProps) {
  const { classes } = useGlobalStyles();
  const lesson = data.file;
  const name = lesson.name;
  const sources = data.allFile.nodes;
  const progress = fetchItem("fefa-ocs-progress-course");

  let contents = "";
  if (data.markdownRemark) {
    contents = data.markdownRemark.html;
  }

  const initial = fetchItem("fefa-ocs-settings").playback ?? "resume";
  const [playback, setPlayback] = useState(initial);
  const videoRef = useRef<ReactPlayer>(null);
  const handleStart = () => {
    const shouldResume = playback === "resume";

    // check if has last play time
    // TODO: Create false loading sense
    if (progress[slugify(name)] && shouldResume) {
      const val = Number(progress[slugify(name)]) / 100;
      videoRef.current?.seekTo(val, "fraction");
    }
  };

  const handlePlaybackSettings = (value: string) => {
    setPlayback(value);
    setItem("fefa-ocs-settings", {
      ...fetchItem("fefa-ocs-settings"),
      playback: value,
    });
  };

  // autoplay functionality
  const value = Boolean(fetchItem("fefa-ocs-settings").autoplay) ?? false;
  const [autoplay, setAutoPlay] = useState(value);

  const toggleAutoplay = (value: boolean) => {
    setAutoPlay(value);
    let settings = fetchItem("fefa-ocs-settings");
    setItem("fefa-ocs-settings", { ...settings, autoplay: value });
  };

  // updated progress ring functionality
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

  // save completed lesson history
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

    if (autoplay) {
      navigateToLesson("next", sources);
    }
  };

  return (
    <ContextConsumer>
      {({ data, set }) => {
        return (
          <div className="p-14 flex flex-col space-y-5">
            <Card radius={"lg"} className={classes.card}>
              <div className="flex space-x-3 items-center mb-3 justify-between">
                <Group noWrap>
                  <IconDeviceDesktop size={30} stroke={2} />
                  <h2 className="text-2xl font-medium">
                    {refineName(lesson.name)}
                  </h2>
                </Group>
                <section className="flex ml-auto">
                  <button
                    disabled={getLessonIndex(sources) === 0}
                    className="navButton text-orange-500"
                    onClick={() => navigateToLesson("prev", sources)}
                  >
                    <IconChevronLeft size={20} />
                    <span>Previous</span>
                  </button>

                  <button
                    disabled={getLessonIndex(sources) === sources.length}
                    className={`navButton text-green-500`}
                    onClick={() => navigateToLesson("next", sources)}
                  >
                    <span>Next</span>
                    <IconChevronRight size={20} />
                  </button>
                </section>
              </div>
              <Card.Section>
                <ReactPlayer
                  ref={videoRef}
                  controls
                  url={lesson.publicURL}
                  progressInterval={5000}
                  width={"100%"}
                  height={"auto"}
                  config={{ forceVideo: true }}
                  playing={autoplay}
                  onStart={handleStart}
                  onProgress={({ played }) =>
                    handlePlayback({ played, data, set })
                  }
                  onEnded={() => handleCompleted({ data, set })}
                />
              </Card.Section>
              <div className="flex items-center justify-between pt-4">
                <Group>
                  <Switch
                    onLabel="ON"
                    offLabel="OFF"
                    size="md"
                    color={"orange"}
                    checked={autoplay}
                    onChange={(event) =>
                      toggleAutoplay(event.currentTarget.checked)
                    }
                  />
                  <Text>Autoplay</Text>
                </Group>
                <Group>
                  <Text>Playback settings:</Text>
                  <Select
                    value={playback}
                    onChange={handlePlaybackSettings}
                    data={[
                      { value: "resume", label: "Resume from last time" },
                      { value: "restart", label: "Start from beginning" },
                    ]}
                  />
                </Group>
              </div>
            </Card>
            <Card>
              <div dangerouslySetInnerHTML={{ __html: contents }}></div>
            </Card>
          </div>
        );
      }}
    </ContextConsumer>
  );
}

export const Head: HeadFC = () => {
  return (
    <>
      <title>Fefa Academy | Offline Course Server</title>
      <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
    </>
  );
};

export const query = graphql`
  query ($name: String!) {
    file(name: { eq: $name }, extension: { eq: "mp4" }) {
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

    markdownRemark(frontmatter: { title: { eq: $name } }) {
      html
    }
  }
`;
