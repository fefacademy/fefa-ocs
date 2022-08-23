import { Card, Container, Divider, Switch } from "@mantine/core";
import { IconRefresh, IconTrash } from "@tabler/icons";
import React from "react";
import ThemeButton from "../components/ThemeButton";

export default function Settings() {
  return (
    <Container
      p={"xl"}
      size="sm"
      className="flex items-center justify-center w-full h-full"
    >
      <Card radius={"lg"} className="w-full space-y-3">
        <div className="flex items-center justify-between p-2 text-xl">
          <h1>Theme</h1>
          <ThemeButton />
        </div>
        <div className="flex items-center justify-between p-2 text-xl">
          <h1>Autoplay</h1>
          <Switch />
        </div>
        <div className="flex items-center justify-between p-2 text-xl">
          <h1>Reset course progress</h1>
          <IconTrash />
        </div>
        <div className="flex items-center justify-between p-2 text-xl">
          <h1>Restore default settings</h1>
          <IconRefresh />
        </div>
        <Divider />
      </Card>
    </Container>
  );
}
