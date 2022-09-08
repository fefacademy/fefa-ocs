import { Text, useMantineColorScheme } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons";
import { Link } from "gatsby";
import React, { useRef, useState } from "react";
import slugify from "slugify";
import ContextConsumer from "../lib/context";
import { fetchItem, getCurrentLesson, refineName } from "../utils";
import Progress from "./Progress";

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState("00:00");

  const handleMetadata = () => {
    let value = videoRef.current!.duration; // in seconds
    const mins = Math.floor(value / 60);
    const secs = Math.floor(value % 60);

    // Prettify values
    const p = (val: number): string => {
      if (val < 10) return `0${val}`;
      return `${val}`;
    };

    setDuration(`${mins}:${p(secs)}`);
  };

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
                {isComplete || completedInSession ? (
                  <IconCircleCheck size={30} color="teal" />
                ) : (
                  <Progress
                    currentProgress={currentProgress}
                    watched={watched}
                  />
                )}
                <span className="w-2/3 text-ellipsis">
                  {refineName(lesson.name)}
                </span>
              </div>
              <Text color={"dimmed"} mr="xs">
                {duration}
              </Text>
            </div>
            {/* empty target to get duration */}
            <video
              className="hidden w-0 h-0"
              src={lesson.publicURL}
              ref={videoRef}
              onLoadedMetadata={handleMetadata}
            ></video>
          </Link>
        );
      }}
    </ContextConsumer>
  );
}
