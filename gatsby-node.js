const path = require(`path`)
var slugify = require('slugify')

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const template = path.resolve(`src/templates/slide.js`)

  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fileRelativePath
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const nodes = result.data.allMarkdownRemark.edges.sort((a, b) =>
    a.node.fileRelativePath > b.node.fileRelativePath ? 1 : -1
  )

  nodes.forEach(({ node }, index) => {
    createPage({
      path: `/${node.fields.slug}`,
      component: template,
      context: {
        index: index + 1,
        slug: node.fields.slug,
        prev: index > 0 ? nodes[index - 1].node.fields.slug : null,
        next:
          index < nodes.length - 1 ? nodes[index + 1].node.fields.slug : null,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    createNodeField({
      node,
      name: 'slug',
      value: node.frontmatter.slug || slugify(node.frontmatter.title),
    })
  }
}
