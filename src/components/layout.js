import { motion } from 'framer-motion'
import { graphql, navigate, useStaticQuery } from 'gatsby'
import 'normalize.css'
import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import './layout.css'

const NEXT = [13, 32, 39]
const PREV = [37]

export default ({ children, index }) => {
  const data = useStaticQuery(graphql`
    query SlideCount {
      allMarkdownRemark {
        totalCount
      }
    }
  `)

  const changeSlide = (next = true) => {
    const newIndex = index + (next ? 1 : -1)
    if (newIndex > data.allMarkdownRemark.totalCount || newIndex < 1) {
      return
    }

    navigate(`/${newIndex}`)
  }

  const onKeyDown = ({ keyCode }) => {
    if (NEXT.indexOf(keyCode) !== -1) {
      changeSlide()
      return
    }

    if (PREV.indexOf(keyCode) !== -1) {
      changeSlide(false)
      return
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)

    return () => document.removeEventListener('keydown', onKeyDown)
  })

  return (
    <div>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem',
        }}
      >
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>Gábor</span>
          <div>{`${index} / ${data.allMarkdownRemark.totalCount}`}</div>
        </header>

        <motion.main
          className={index % 2 ? 'dd-slide-odd' : 'dd-slide-even'}
          transition={{
            y: { type: 'spring', damping: 20, stiffness: 300 },
            opacity: { duration: 0.3 },
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            alignSelf: 'center',
            flex: 1,
            maxWidth: '70rem',
            padding: '2rem',
          }}
        >
          {children}
        </motion.main>

        <footer
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <a
            target="_blank"
            href="https://dromedar.design"
            rel="noopener noreferrer"
          >
            https://dromedar.design
          </a>

          <div>
            <button
              onClick={() => changeSlide(false)}
              style={{ margin: 10 }}
              class="dd-navigation"
            >
              &#8249;
            </button>
            <button
              onClick={() => changeSlide()}
              style={{ margin: 10 }}
              class="dd-navigation"
            >
              &#8250;
            </button>
          </div>
        </footer>
      </div>
    </div>
  )
}
