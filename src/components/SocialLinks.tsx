import { Anchor, Group, Text } from "@mantine/core";
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandReddit,
  IconBrandTwitter,
} from "@tabler/icons";
import React from "react";

export default function SocialLinks() {
  const size = 30;
  const data = [
    {
      link: "https://github.com/fefaacademy",
      icon: <IconBrandGithub size={size} color="teal" />,
      text: "Github",
    },
    {
      link: "https://github.com/fefaacademy",
      icon: <IconBrandDiscord size={size} color="teal" />,
      text: "Discord",
    },
    {
      link: "https://reddit.com/r/FefaAcademy",
      icon: <IconBrandReddit size={size} color="teal" />,
      text: "Reddit",
    },
    {
      link: "https://github.com/fefaacademy",
      icon: <IconBrandTwitter size={size} color="teal" />,
      text: "Twitter",
    },
    {
      link: "https://github.com/fefaacademy",
      icon: <IconBrandLinkedin size={size} color="teal" />,
      text: "Github",
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-5 gap-y-8">
      {data.map((d, i) => (
        <Anchor
          href={d.link}
          target="_blank"
          key={i}
          underline={false}
          color="inherit"
        >
          <Group>
            {d.icon}
            <Text>{d.text}</Text>
          </Group>
        </Anchor>
      ))}
    </div>
  );
}
