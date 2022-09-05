import { Navbar, ScrollArea } from "@mantine/core";
import { Link } from "gatsby";
import React from "react";
import { getCurrentLesson } from "../utils";
import LessonEntry from "./LessonEntry";
import SectionHeading from "./SectionHeading";
import ThemeButton from "./ThemeButton";

export default function LessonNavbar({ opened, sections }: any) {
  return (
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
        <ThemeButton />
      </Navbar.Section>
      <ScrollArea>
        <div className="flex flex-col">
          <h2 className="text-2xl my-4 text-center">
            The Course Title to go here. Descriptive and short
          </h2>
          {Object.keys(sections).map((name: any) => {
            return (
              <div>
                <SectionHeading heading={name} />
                {sections[name].map((lesson: any) => {
                  const active = getCurrentLesson() === lesson.name;
                  return <LessonEntry lesson={lesson} active={active} />;
                })}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </Navbar>
  );
}
