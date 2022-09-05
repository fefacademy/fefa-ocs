import { createStyles } from "@mantine/core";

export const useGlobalStyles = createStyles((theme) => {
  return {
    borderCard: {
      border: theme.colorScheme !== "dark" ? "1px solid lightgrey" : "none",
    },

    showcase: {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[1],
    },

    dimmedText: {
      color:
        theme.colorScheme === "dark"
          ? theme.colors.gray[4]
          : theme.colors.gray[6],
    },

    card: {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[3],
    },
  };
});
