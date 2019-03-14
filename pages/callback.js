import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

import auth0Client from '../services/auth0';
import { withRouter } from 'next/router';

class Callback extends React.Component {

  async componentDidMount() {
    await auth0Client.handleAuthentication();
    this.props.router.push('/');
  }

  render() {
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage>
          <h1> Verifying login data ... </h1>
        </BasePage>
      </BaseLayout>
    )
  }
}

// client ID : 815828311533-37stqgkpa9u28m4kvr2p5oq62sln63nt.apps.googleusercontent.com

// client secret : V828CJUyKR1sVcwwcjZuAPWu

export default withRouter(Callback);
