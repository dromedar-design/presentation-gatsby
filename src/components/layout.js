import { motion } from 'framer-motion'
import { graphql, navigate, useStaticQuery } from 'gatsby'
import 'normalize.css'
import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import './layout.css'

const KEYS = [
  { next: false, key: 33 }, // page up
  { next: false, key: 37 }, // left
  { next: false, key: 38 }, // up

  { next: true, key: 34 }, // page down
  { next: true, key: 39 }, // right
  { next: true, key: 40 }, // down
  { next: true, key: 32 }, // space
  { next: true, key: 13 }, // enter
]

export default ({
  children,
  context: { next, prev, title, index, isEditing, setIsEditing },
}) => {
  const data = useStaticQuery(graphql`
    query SlideCount {
      allMarkdownRemark {
        totalCount
      }
    }
  `)

  const changeSlide = (nextSlide = true) => {
    if (isEditing) return

    if (nextSlide) {
      if (!next) return
      return navigate(`/${next}`)
    }

    if (!prev) return
    navigate(`/${prev}`)
  }

  const onKeyDown = ({ keyCode }) => {
    const event = KEYS.find(k => k.key === keyCode)

    if (event) {
      changeSlide(event.next)
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
          background: isEditing ? 'lightyellow' : 'transparent',
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
            flex: 1,
            alignSelf: 'center',
            width: '70rem',
            maxWidth: '100%',
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
            paddingLeft: 50,
          }}
        >
          <a
            target="_blank"
            href="https://dromedar.design"
            rel="noopener noreferrer"
          >
            https://dromedar.design
          </a>

          <button
            className="dd-navigation"
            style={{ width: 'auto', height: 'auto', padding: '10px 20px' }}
            onClick={() => setIsEditing(p => !p)}
          >
            {isEditing ? 'Preview' : 'Edit'}
          </button>

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
