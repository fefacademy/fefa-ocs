import { graphql, useStaticQuery } from "gatsby";

export function useLessonSources() {
  const data = useStaticQuery(graphql`
    query {
      videos: allFile(
        filter: { extension: { eq: "mp4" } }
        sort: { fields: name, order: ASC }
      ) {
        nodes {
          extension
          name
          relativeDirectory
          relativePath
          publicURL
          prettySize
        }
      }
    }
  `);
  const sources = data.videos.nodes;
  const sections: any = {};

  sources.forEach((s: any) => {
    sections[s.relativeDirectory] = [];
  });
  sources.forEach((s: any) => {
    sections[s.relativeDirectory].push(s);
  });

  return sections;
}
