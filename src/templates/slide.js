import { Wysiwyg } from '@tinacms/fields'
import { TinaField } from '@tinacms/form-builder'
import { graphql } from 'gatsby'
import { inlineRemarkForm } from 'gatsby-tinacms-remark'
import React from 'react'

const Slide = ({ data, isEditing, setIsEditing }) => (
  <div
    style={{
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <h1>{data.markdownRemark.frontmatter.title}</h1>
    <TinaField name="rawMarkdownBody" Component={Wysiwyg}>
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
    </TinaField>
    <button onClick={() => setIsEditing(p => !p)}>
      {isEditing ? 'Preview' : 'Edit'}
    </button>
  </div>
)

export const QUERY = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
      ...TinaRemark
    }
  }
`

export default inlineRemarkForm(Slide)
