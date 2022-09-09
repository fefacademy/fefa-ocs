import { Anchor, Card, Text } from "@mantine/core";
import { HeadFC } from "gatsby";
import * as React from "react";
import SocialLinks from "../components/CommunityLinks";
import Ctas from "../components/Ctas";
import { useGlobalStyles } from "../lib/shared";

const IndexPage = () => {
  const { classes } = useGlobalStyles();

  return (
    <div className="w-full h-full p-10 py-14">
      <Card className={classes.card}>
        <h1 className="text-4xl font-medium mb-5">⚓ Ahoy, Kemosabe 👋</h1>
        <Text color="dimmed" mb={"xl"}>
          Welcome to the Fefa Academy Offline Course Server, or OCS, as the cool
          kids call it. The purpose of going through all the trouble of running
          a server to watch a course is to bring in some perks that
          wouldn&apos;t be possible were you to use something like VLC. The OCS
          provides you with progress tracking, customization options and each
          lesson comes accompanied with a write-up that will prove useful to
          you. If this is your first time using the OCS, watch the getting
          started videos.
        </Text>
        <Anchor href="https://fefaacademy.me" target={"_blank"} mt="sm">
          Visit Fefa Academy website
        </Anchor>
      </Card>
      <section className="w-full flex space-x-6 my-8">
        <div className="w-2/3">
          <Ctas />
        </div>
        <div className="w-1/3">
          <Card className={classes.card}>
            <Text className="text-xl mb-3 font-medium">
              Join the Fefa Family
            </Text>
            <Text mb={"xl"} color="dimmed">
              Make new friends, find a study-buddy, connect with others and much
              more in the Fefa community
            </Text>
            <SocialLinks />
          </Card>
        </div>
      </section>
    </div>
  );
};

export default IndexPage;

export const Head: HeadFC = () => {
  return (
    <>
      <title>Fefa Academy | Offline Course Server</title>
      <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      <link
        rel="preload"
        as="font"
        href="/fonts/Oxygen-Regular.ttf"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        as="font"
        href="/fonts/Oxygen-Bold.ttf"
        crossOrigin="anonymous"
      />
    </>
  );
};
