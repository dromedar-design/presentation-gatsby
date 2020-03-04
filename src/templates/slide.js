import { Wysiwyg } from '@tinacms/fields'
import { TinaField } from '@tinacms/form-builder'
import { graphql } from 'gatsby'
import { inlineRemarkForm } from 'gatsby-tinacms-remark'
import React from 'react'
import Layout from '../components/layout'

const Slide = ({ data, isEditing, setIsEditing, pageContext }) => {
  return (
    <Layout
      context={{
        ...pageContext,
        title: data.markdownRemark.frontmatter.title,
        isEditing,
        setIsEditing,
      }}
    >
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <TinaField name="rawMarkdownBody" Component={Wysiwyg}>
          <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
        </TinaField>
      </div>
    </Layout>
  )
}

export const QUERY = graphql`
  query BySlug($slug: String!) {
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
