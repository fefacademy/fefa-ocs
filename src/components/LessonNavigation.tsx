import { IconChevronLeft, IconChevronRight } from "@tabler/icons";
import React from "react";
import { getLessonIndex, navigateToLesson } from "../utils";

export default function LessonNavigation({ sources }: any) {
  return (
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
  );
}
