import type { VFC } from 'react'
import { SEO } from '@components/common'

const Head: VFC = () => {
  return (
    <SEO>
      <meta
        key="viewport"
        name="viewport"
        content="width=device-width, initial-scale=1"
      />
      <link rel="manifest" href="/my-site-3/_api/hack-reverse-proxy/site.webmanifest" key="site-manifest" />
    </SEO>
  )
}

export default Head
