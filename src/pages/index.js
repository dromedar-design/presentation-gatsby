import { navigate } from 'gatsby'
import { useEffect } from 'react'

const IndexPage = () => {
  useEffect(() => {
    navigate('/start', {
      replace: true,
    })
  }, [])

  return null
}

export default IndexPage
