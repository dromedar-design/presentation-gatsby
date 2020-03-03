import { motion } from 'framer-motion'
import { graphql, navigate, useStaticQuery } from 'gatsby'
import 'normalize.css'
import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import './layout.css'

const KEYS = [
  { next: false, key: 33, alt: false },
  { next: false, key: 37, alt: true },
  { next: true, key: 34, alt: false },
  { next: true, key: 39, alt: true },
]

export default ({ children, context: { next, prev, title, index } }) => {
  const data = useStaticQuery(graphql`
    query SlideCount {
      allMarkdownRemark {
        totalCount
      }
    }
  `)

  const changeSlide = (nextSlide = true) => {
    if (nextSlide) {
      if (!next) return
      return navigate(`/${next}`)
    }

    if (!prev) return
    navigate(`/${prev}`)
  }

  const onKeyDown = ({ altKey, keyCode }) => {
    const event = KEYS.filter(k => k.alt === altKey).filter(
      k => k.key === keyCode
    )

    if (event.length) {
      changeSlide(event[0].next)
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
          <span>{title}</span>
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
              className="dd-navigation"
            >
              &#8249;
            </button>
            <button
              onClick={() => changeSlide()}
              style={{ margin: 10 }}
              className="dd-navigation"
            >
              &#8250;
            </button>
          </div>
        </footer>
      </div>
    </div>
  )
}
