import BaseLayout from '../../components/layouts/BaseLayout'
import { Button, Form, Grid, Header, Message, Segment, Modal, Icon } from 'semantic-ui-react'
import { Link } from '../../routes'
import Router from "next/router";
import { signinUser } from "../../lib/auth";

class Signin extends React.Component {
    state = {
      email: '',
      password: '',
      error: "",
      openError: false,
      isLoading: false
  };

  handleClose = () => this.setState({ openError: false });

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    const { email, password } = this.state;
    
    event.preventDefault();
    const user = { email, password };
    this.setState({ isLoading: true, error: "" });

    signinUser(user)
      .then(() => {
        (user.email === "roninchayakorn@gmail.com") ? Router.push('/admin') : Router.push('/');
      }).catch(this.showError);
      // .then(() => {
      //   Router.push('/');
      // }).catch(this.showError);
  };

  showError = err => {
    const error = err.response && err.response.data || err.message;
    this.setState({ error, openError: true, isLoading: false });
  };
  
  render() {
    const { error, openError, isLoading } = this.state;
    
    return (
      <BaseLayout>
        <div>
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='blue' textAlign='center'>
                LogIn to your account
              </Header>
              <Form size='large' onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Form.Input 
                    fluid 
                    name="email"
                    icon='user' 
                    iconPosition='left' 
                    placeholder='E-mail address' 
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    fluid
                    name="password"
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    onChange={this.handleChange}
                  />
                  <Button color='blue' fluid size='large' disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign in"}
                  </Button>
                </Segment>
              </Form>
              <Message>
                New to us? 
                <Link prefetch route="/auth/signup">
                  <a> Sign Up</a>
                </Link>
              </Message>
            </Grid.Column>
          </Grid>
        </div>

        {error && <Modal
          size='mini'
          dimmer="blurring"
          open={openError}
          onClose={this.handleClose}
        >
          <Header icon='exclamation triangle' content='ERROR!' color="red"/>
          <Modal.Content>
            <h3>{error}</h3>
          </Modal.Content>
          <Modal.Actions>
            <Button color='red' onClick={this.handleClose} inverted>
              <Icon name='close' /> try again...
            </Button>
          </Modal.Actions>
        </Modal>}
      </BaseLayout>

    )
  }
}

export default Signin