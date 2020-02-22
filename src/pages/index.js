import { navigate } from 'gatsby'
import { useEffect } from 'react'

const IndexPage = () => {
  useEffect(() => {
    navigate('/1', {
      replace: true,
    })
  }, [])

  return null
}

export default IndexPage
