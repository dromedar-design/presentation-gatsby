import { Wysiwyg } from '@tinacms/fields'
import { TinaField } from '@tinacms/form-builder'
import { graphql } from 'gatsby'
import { inlineRemarkForm } from 'gatsby-tinacms-remark'
import React from 'react'
import Layout from '../components/layout'

const Slide = ({ data, isEditing, setIsEditing, pageContext }) => {
  return (
    <Layout
      context={{ ...pageContext, title: data.markdownRemark.frontmatter.title }}
      style={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TinaField name="rawMarkdownBody" Component={Wysiwyg}>
        <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      </TinaField>

      <button onClick={() => setIsEditing(p => !p)}>
        {isEditing ? 'Preview' : 'Edit'}
      </button>
    </Layout>
  )
}

export const QUERY = graphql`
  query BySlug($slug: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
      ...TinaRemark
    }
  }
`

export default inlineRemarkForm(Slide)
