import React from "react";
import { graphql } from "gatsby";
import {
  IconChevronLeft,
  IconChevronRight,
  IconDeviceDesktop,
} from "@tabler/icons";
import ReactPlayer from "react-player/file";
import ContextConsumer from "../lib/context";
import slugify from "slugify";
import { useMantineColorScheme } from "@mantine/core";
import {
  fetchItem,
  getLessonIndex,
  navigateToLesson,
  refineName,
  setItem,
} from "../utils";

export default function Lesson({ data }: any) {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const lesson = data.file;
  const name = lesson.name;
  const sources = data.allFile.nodes;
  const progress = fetchItem("fefa-ocs-progress-course");

  return (
    <ContextConsumer>
      {({ data, set }) => {
        return (
          <>
            <section className="w-full grid grid-cols-2 shadow-xl font-bold">
              <button
                disabled={getLessonIndex(sources) === 0}
                className="navButton"
                onClick={() => navigateToLesson("prev", sources)}
              >
                <IconChevronLeft size={20} />
                <span>Previous Lecture</span>
              </button>
              <button
                disabled={getLessonIndex(sources) === sources.length}
                className={`navButton ${dark ? "bg-teal-800" : "bg-teal-200"}`}
                onClick={() => navigateToLesson("next", sources)}
              >
                <span>Next Lecture</span>
                <IconChevronRight size={20} />
              </button>
            </section>

            <div className="p-10 flex flex-col space-y-5">
              <div className="flex space-x-3 items-center">
                <IconDeviceDesktop size={30} stroke={2} />
                <h2 className="text-2xl font-bold">
                  {refineName(lesson.name)}
                </h2>
              </div>
              <ReactPlayer
                controls
                url={lesson.publicURL}
                progressInterval={5000}
                width={"100%"}
                height={"auto"}
                config={{ forceVideo: true }}
                onProgress={({ played }) => {
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
                }}
                onEnded={() => {
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
                }}
              />
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
