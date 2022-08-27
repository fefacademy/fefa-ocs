import { HeadFC } from "gatsby";
import * as React from "react";

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
