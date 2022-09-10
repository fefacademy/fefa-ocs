import { createStyles, Title } from "@mantine/core";
import React from "react";

const useStyles = createStyles((theme) => ({
  title: {
    marginTop: theme.spacing.xl * 1.2,
    marginBottom: theme.spacing.md,
    wordBreak: "break-word",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },

  link: {
    ...theme.fn.focusStyles(),
    textDecoration: "none",
    color: "inherit",
  },

  offset: {
    position: "relative",
    top: -62,
  },
}));

export default function MdxTitle({
  id,
  children,
  order,
  ...others
}: React.ComponentPropsWithoutRef<typeof Title>) {
  const { classes } = useStyles();

  if (order === 1) {
    return (
      <Title className={classes.title} sx={{ fontWeight: 900, fontSize: 44 }}>
        {children}
      </Title>
    );
  }

  return (
    <>
      <div id={id} className={classes.offset} />
      <Title
        order={order}
        className={classes.title}
        sx={{ fontWeight: 600 }}
        {...others}
      >
        <a className={classes.link} href={`#${id}`}>
          {children}
        </a>
      </Title>
    </>
  );
}
