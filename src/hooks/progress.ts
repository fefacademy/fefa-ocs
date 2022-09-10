import { graphql, useStaticQuery } from "gatsby";
import { fetchItem } from "../utils";

export function useCourseProgress() {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          courseID
        }
      }
    }
  `);

  const id = data.site.siteMetadata.courseID;
  const progress = fetchItem(`fefa-ocs-${id}-progress`);
  const completed = fetchItem(`fefa-ocs-${id}-completed`);

  return { progress, completed };
}
