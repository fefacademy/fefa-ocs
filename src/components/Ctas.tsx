import { Anchor, Card, Group, Text, Title } from "@mantine/core";
import {
  IconBrandGithub,
  IconBrandTwitter,
  IconBrandYoutube,
  IconCash,
  IconDeviceTv,
} from "@tabler/icons";
import React from "react";
import { useGlobalStyles } from "../lib/shared";

export default function Ctas() {
  const { classes } = useGlobalStyles();
  const size = 45;
  const data = [
    {
      icon: <IconCash size={size} className="text-green-400" />,
      title: "Donate",
      body: "Contribute to our cause and help us grow by making a donation.",
    },
    {
      icon: <IconBrandYoutube size={size} className="text-red-400" />,
      title: "Enjoying our content?",
      body: "Explore more Fefa academy lessons on youtube.",
    },
    {
      icon: <IconBrandGithub size={size} />,
      title: "See an issue on this site?",
      body: "Fix it by making a PR on github.",
    },
    {
      icon: <IconDeviceTv size={size} className="text-teal-400" />,
      title: "Moree please...",
      body: "View more courses on the Fefa website.",
    },
    {
      icon: <IconBrandTwitter size={size} className="text-blue-400" />,
      title: "Spread the word",
      body: "Tweet about Fefa Academy to help us get noticed.",
    },
  ];

  const items = data.map((d, i) => {
    return (
      <Anchor href="/" underline={false}>
        <Card style={{ display: "flex" }} key={i} className={classes.card}>
          <Group noWrap align={"flex-start"}>
            {d.icon}
            <div>
              <Title size={"lg"}>{d.title} </Title>
              <Text color={"dimmed"}>{d.body}</Text>
            </div>
          </Group>
        </Card>
      </Anchor>
    );
  });

  return <div className="flex flex-col space-y-5">{items}</div>;
}
