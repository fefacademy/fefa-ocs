import { RingProgress, useMantineColorScheme } from "@mantine/core";
import { IconCircleCheck, IconDeviceDesktop } from "@tabler/icons";
import { Link } from "gatsby";
import React, { useState } from "react";
import slugify from "slugify";
import ContextConsumer from "../lib/context";
import { fetchItem, getCurrentLesson, refineName } from "../utils";

export default function LessonEntry({ lesson }: any) {
  const { colorScheme } = useMantineColorScheme();
  const isActive = getCurrentLesson() === lesson.name;

  const archived = fetchItem("fefa-ocs-completed");
  const progress = fetchItem("fefa-ocs-progress-course");
  const completed = archived.completed ?? [];
  const isComplete = completed.includes(slugify(lesson.name));

  const [watched] = useState(
    progress ? progress[slugify(lesson.name)] || 0 : 0
  );

  return (
    <ContextConsumer>
      {({ data }) => {
        const sessionComplete = data.current.completed ?? [];
        const currentProgress: number = data.current[lesson.name];
        const completedInSession = sessionComplete.includes(
          slugify(lesson.name)
        );

        return (
          <Link to={`/lesson/${lesson.name}`}>
            <div
              className={`w-full flex items-center justify-between  p-3 ${
                colorScheme === "dark"
                  ? "hover:bg-teal-900"
                  : "hover:bg-teal-200"
              } ${
                isActive &&
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
              {isComplete || completedInSession ? (
                <IconCircleCheck size={33} color="teal" />
              ) : (
                <RingProgress
                  size={30}
                  thickness={3}
                  roundCaps
                  sections={
                    currentProgress
                      ? [
                          {
                            color: "teal",
                            value: Math.round(currentProgress),
                          },
                        ]
                      : watched > 0
                      ? [
                          {
                            color: "teal",
                            value: Math.round(watched),
                          },
                        ]
                      : []
                  }
                />
              )}
            </div>
          </Link>
        );
      }}
    </ContextConsumer>
  );
}
