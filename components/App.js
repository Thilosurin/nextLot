import React from 'react'
import Head from 'next/head'
import { Container } from 'semantic-ui-react'

export default ({ children }) => {
  return (
    <div>
      <Head>
          <link
              rel="stylesheet"
              href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css"
          />
      </Head>

      <Container>
        {children}
      </Container>
    </div>
  )
}