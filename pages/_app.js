import React from 'react';
import App, { Container } from 'next/app';

// import auth0 from '../services/auth0';
import { getSessionFromClient, getSessionFromServer } from '../lib/auth'

export default class MyApp extends App {

  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};
        
    // const userLog = process.browser ? await auth0.clientAuth() : await auth0.serverAuth(ctx.req);

    const authSign = ctx.req ? getSessionFromServer(ctx.req) : getSessionFromClient();
    const user = authSign.user;

    // const user = userLog ? userLog : userSign;

    const nameUndefined = !!user ? user : 'No User!';
    // const admin =  nameUndefined.email === 'roninchayakorn@gmail.com' ? true : false;
    // const admin =  nameUndefined.status === 1 ? true : false;
    const admin =  nameUndefined.status;

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    const checkUser = JSON.stringify(user) == "{}" ? false : true;
   
    const isSiteOwner = user && user[process.env.NAMESPACE + '/role'] === 'siteOwner';
    const auth = { user, admin, isAuthenticated: checkUser, isSiteOwner, router };

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
