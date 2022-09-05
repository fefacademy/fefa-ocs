// eslint-disable-next-line no-undef
const path = require("path");

// eslint-disable-next-line no-undef
exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allFile(filter: { extension: { eq: "mp4" } }) {
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

  data.allFile.nodes.forEach((video) => {
    actions.createPage({
      path: `/lesson/${video.name}`,
      component: path.resolve("src/components/Lesson.tsx"),
      context: {
        name: video.name,
      },
    });
  });
};
