import React from "react";
import Layout from "./Layout";
import { graphql } from "gatsby";

export default function Lesson({ data }: any) {
  const lesson = data.file;

  return (
    <Layout>
      <h1>{lesson.name}</h1>
      <video
        controls
        loop
        src={lesson.publicURL}
        className="rounded-xl"
      ></video>
    </Layout>
  );
}

export const query = graphql`
  query ($name: String!) {
    file(name: { eq: $name }) {
      extension
      name
      relativeDirectory
      relativePath
      publicURL
      prettySize
    }
  }
`;
