import * as React from "react";
import { graphql, HeadFC, Link } from "gatsby";
import Layout from "../components/Layout";

const IndexPage = () => {
  return <Layout>Hello there world</Layout>;
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
