import React from 'react';
import App, { Container } from 'next/app';

import auth0 from '../services/auth0';
import { getSessionFromClient, getSessionFromServer } from '../lib/auth'

export default class MyApp extends App {

  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    const currentPath = ctx.req ? ctx.req.url : window.location.pathname;
    
    let user;
    if (currentPath !== "/auth/signin") {
      user = process.browser ? await auth0.clientAuth() : await auth0.serverAuth(ctx.req);
    } else {
      const auth = ctx.req ? getSessionFromServer(ctx.req) : getSessionFromClient();
      user = auth.user;
    }

    const nameUndefined = !!user ? user : 'No User!';
    const admin =  nameUndefined.name === 'Th!losurin' ? true : false;

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    const isSiteOwner = user && user[process.env.NAMESPACE + '/role'] === 'siteOwner';
    const auth = { user, admin, isAuthenticated: !!user, isSiteOwner };

    return { pageProps, auth }
  }

  render () {
    const { Component, pageProps, auth } = this.props

    return (
      <Container>
        <Component {...pageProps} auth={auth}/>
      </Container>
    )
  }
}
