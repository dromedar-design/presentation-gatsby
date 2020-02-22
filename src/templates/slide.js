import { graphql } from 'gatsby'
import React from 'react'
import Layout from '../components/layout'

export default ({ data }) => (
  <Layout index={data.slide.index}>
    <div
      style={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: data.slide.html }} />
    </div>
  </Layout>
)

export const QUERY = graphql`
  query SlideQuery($index: Int!) {
    slide(index: { eq: $index }) {
      html
      index
    }
  }
`
