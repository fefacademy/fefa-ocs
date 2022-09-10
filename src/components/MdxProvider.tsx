import { Code, Text } from "@mantine/core";
import { Prism } from "@mantine/prism";
import { MDXProvider } from "@mdx-js/react";
import { MDXComponents } from "mdx/types";
import React from "react";
import MdxTitle from "./MdxTitle";

const h = (order: 1 | 2 | 3 | 4 | 5 | 6) => (props: any) =>
  <MdxTitle order={order} {...props} />;

export const components: MDXComponents = {
  h1: h(1),
  h2: h(2),
  h3: h(3),
  h4: h(4),
  h5: h(5),
  h6: h(6),
  inlineCode: (props: any) => <Code {...props} />,
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => {
    return (
      <Text component="a" variant="link" href={href}>
        {children}
      </Text>
    );
  },
  p: (props: any) => <p {...props} style={{ lineHeight: 1.55 }} />,
  ul: (props: any) => (
    <ul
      {...props}
      style={{ lineHeight: 1.65, marginBottom: 20, marginTop: 10 }}
    />
  ),
  li: (props: any) => <li {...props} style={{ marginTop: 4 }} />,
  pre: (props: any) => {
    const matches = (props.children.props.className || "").match(
      /language-(?<lang>.*)/
    );

    return (
      <Prism
        language={
          matches && matches.groups && matches.groups.lang
            ? matches.groups.lang
            : ""
        }
        mb={20}
      >
        {props.children.props.children}
      </Prism>
    );
  },
};

export default function MdxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
