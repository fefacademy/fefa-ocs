// eslint-disable-next-line no-undef
const path = require("path");

// eslint-disable-next-line no-undef
exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allFile(filter: { extension: { eq: "mp4" } }) {
        nodes {
          name
        }
      }
    }
  `);

  data.allFile.nodes.forEach((node) => {
    actions.createPage({
      path: `/lesson/${node.name}`,
      component: path.resolve("src/components/Lesson.tsx"),
      context: {
        name: node.name,
      },
    });
  });
};
