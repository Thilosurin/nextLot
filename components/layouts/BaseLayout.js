import React from 'react';
import Header from '../Header';
import Head from 'next/head';
import { Container } from 'semantic-ui-react'

const BaseLayout = (props) => {
  const { children, isAuthenticated, user, admin, isSiteOwner } = props;
  const title = props.title || 'NextLottery';

  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content="Project Thesis Ethereum  Next Lottery"/>
        <meta property="og:title" content="Thilosurin - programmer, developer, booklover" />
        <meta property="og:locale" content="en_EU" />
        <meta property="og:url" content={`${process.env.BASE_URL}`}/>
        <meta property="og:type" content="website"/>
        <meta property="og:description" content="This is my ethereum lottery thesis project"/>
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css"/>
      </Head>
      <div>
        <Header
          isAuthenticated={isAuthenticated}
          user={user}
          admin={admin}
          isSiteOwner={isSiteOwner}/>
        <main>
          <div>
            <Container>
              {children}
            </Container>
          </div>
        </main>
      </div>
    </React.Fragment>
  )
}

export default BaseLayout;

