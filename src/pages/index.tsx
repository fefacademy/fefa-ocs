import * as React from "react";
import { graphql, HeadFC, Link } from "gatsby";
import Layout from "../components/Layout";

const IndexPage = () => {
  return (
    <div>
      <section>How to get started with the OCS</section>
      <section>How to customize OCS settings</section>
    </div>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
