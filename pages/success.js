import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import Router from "next/router";

class SuccessPage extends React.Component {

componentDidMount() {
    const { admin, address } = this.props.auth

    if (admin)
      setTimeout(() => Router.push(`/admin/user`), 2000)
}

render() {
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage>
          <h1> Successfuly! </h1>
          <h1> Please wait a minute ... </h1>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default SuccessPage;