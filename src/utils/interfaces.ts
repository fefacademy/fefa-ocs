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

    markdownRemark: {
      html: string;
    };
  };
}
