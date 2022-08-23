import React from "react";
import Layout from "./Layout";
import { graphql } from "gatsby";
import { IconDeviceDesktop } from "@tabler/icons";
import ReactPlayer from "react-player/file";
import ContextConsumer from "../lib/context";
import slugify from "slugify";

export default function Lesson({ data }: any) {
  const lesson = data.file;
  const refine = (val: string) => {
    let value = val.replace(/^\d+-/i, "").replace(/^\d\.+/i, "");
    return value;
  };

  let progressData: any;
  if (typeof window !== "undefined") {
    progressData = JSON.parse(
      localStorage.getItem("fefa-ocs-progress-course") ?? "{}"
    );
  }

  return (
    <ContextConsumer>
      {({ data, set }) => {
        console.log(data);
        return (
          <div className="flex flex-col space-y-5">
            <div className="flex space-x-3 items-center">
              <IconDeviceDesktop size={30} stroke={2} />
              <h2 className="text-2xl font-bold">{refine(lesson.name)}</h2>
            </div>
            <ReactPlayer
              controls
              url={lesson.publicURL}
              progressInterval={5000}
              width={"100%"}
              height={"auto"}
              config={{ forceVideo: true }}
              onProgress={({ played }) => {
                const name = lesson.name;
                const obj: any = {};
                obj[name] = played * 100;
                set({
                  current: {
                    ...data.current,
                    ...obj,
                  },
                });

                if (typeof window !== "undefined") {
                  let value = progressData[slugify(name)];
                  if (!value || (value && value < played * 100)) {
                    progressData[slugify(name)] = played * 100;
                    localStorage.setItem(
                      "fefa-ocs-progress-course",
                      JSON.stringify(progressData)
                    );
                  }
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
                if (typeof window !== "undefined") {
                  let values = JSON.parse(
                    localStorage.getItem("fefa-ocs-completed") ?? "{}"
                  );
                  let prev = values.completed ?? [];
                  values.completed = [...prev, slugify(lesson.name)];
                  localStorage.setItem(
                    "fefa-ocs-completed",
                    JSON.stringify(values)
                  );
                }
              }}
            />
          </div>
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
  }
`;
