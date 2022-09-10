export interface ILessonProps {
  data: {
    file: {
      extension: string;
      name: string;
      relativeDirectory: string;
      relativePath: string;
      publicURL: string;
      prettySize: string;
    };

    allFile: {
      nodes: {
        name: string;
      }[];
    };

    mdx: {
      body: string;
      frontmatter: any;
    };
  };
  children: any;
}
