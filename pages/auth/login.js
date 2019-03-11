import { Component } from "react";
import Link from "next/link";
import HeaderComponent from "../../components/Header";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }
  static getInitialProps(ctx) {
    if (redirectIfAuthenticated(ctx)) {
      return {};
    }

    const success = getCookie("success", ctx.req);
    if (success) {
      removeCookie("success");
    }
    return {
      success
    };
  }

  render() {
    const { url, success } = this.props;
    const { error } = this.state;
    return (
      <App>
        
        <HeaderComponent authenticated={false} pathname={url.pathname} />
        {success && <Success message={success} />}
        {error && <Error message={error} />}

        <div className='login-form'>
          {/*
            Heads up! The styles below are necessary for the correct render of this example.
            You can do same with CSS, the main idea is that all the elements up to the `Grid`
            below must have a height of 100%.
          */}
          <style>{`
            body > div,
            body > div > div,
            body > div > div > div.login-form {
              height: 100%;
            }
          `}</style>
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='teal' textAlign='center'>
                <Image src='/logo.png' /> Log-in to your account
              </Header>
              <Form size='large' onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' name="email" />
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    name="password"
                  />

                  <Button color='teal' fluid size='large'>
                    Login
                  </Button>
                </Segment>
              </Form>
              <Message>
                {"Don't have a user? "}
                <Link prefetch href="/auth/register">
                  <a>Register</a>
                </Link>
              </Message>
            </Grid.Column>
          </Grid>
        </div>

      </App>
    );
  }

  handleSubmit = async e => {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    const error = await signIn(email, password);

    if (error) {
      this.setState({
        error
      });
      return false;
    }
  };
}
