import { Card, Group, Select, Switch, Text } from "@mantine/core";
import { IconDeviceDesktop } from "@tabler/icons";
import { graphql, HeadFC } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import React, { useRef, useState } from "react";
import ReactPlayer from "react-player/file";
import slugify from "slugify";
import ContextConsumer from "../lib/context";
import { useGlobalStyles } from "../lib/shared";
import {
  fetchItem,
  getSettingValue,
  refineName,
  updateSettings,
} from "../utils";
import { ILessonProps } from "../utils/interfaces";
import { handleLessonCompleted, handleLessonPlayback } from "../utils/player";
import LessonNavigation from "./LessonNavigation";

export default function Lesson({ data }: ILessonProps) {
  const { classes } = useGlobalStyles();
  const lesson = data.file;
  const name = lesson.name;
  const sources = data.allFile.nodes;
  const courseID = data.site.siteMetadata.courseID;
  const progress = fetchItem(`fefa-ocs-${courseID}-progress`);

  let mdxBody: string;
  const hasMdx = data.mdx ? true : false;
  if (hasMdx) {
    const { body } = data.mdx;
    mdxBody = body;
  }

  // Video playback functionality
  const pbCurrent = getSettingValue("playback");
  const [playback, setPlayback] = useState(pbCurrent);
  const videoRef = useRef<ReactPlayer>(null);
  const handleStart = () => {
    // TODO: Create false loading sense
    if (progress[slugify(name)] && playback === "resume") {
      const val = Number(progress[slugify(name)]) / 100;
      videoRef.current?.seekTo(val, "fraction");
    }
  };

  const togglePlaybackSetting = (value: string) => {
    setPlayback(value);
    updateSettings({ playback: value });
  };

  // autoplay functionality
  const apCurrent = getSettingValue("autoplay");
  const [autoplay, setAutoPlay] = useState(apCurrent);

  const toggleAutoplay = (value: boolean) => {
    setAutoPlay(value);
    updateSettings({ autoplay: value });
  };

  return (
    <ContextConsumer>
      {({ data, set }) => {
        const listenerData = {
          data,
          set,
          autoplay,
          name,
          progress,
          sources,
          courseID,
        };
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
                <LessonNavigation sources={sources} />
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
                    handleLessonPlayback({
                      ...listenerData,
                      played,
                    })
                  }
                  onEnded={() =>
                    handleLessonCompleted({
                      ...listenerData,
                      played: 0,
                    })
                  }
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
                    onChange={togglePlaybackSetting}
                    data={[
                      { value: "resume", label: "Resume from last time" },
                      { value: "restart", label: "Start from beginning" },
                    ]}
                  />
                </Group>
              </div>
            </Card>
            {hasMdx && (
              <Card>
                <MDXRenderer>{mdxBody}</MDXRenderer>
              </Card>
            )}
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

    mdx(frontmatter: { name: { eq: $name } }) {
      frontmatter {
        links
        name
        title
      }
      body
    }

    site {
      siteMetadata {
        courseID
      }
    }
  }
`;
