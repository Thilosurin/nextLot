import Link from "next/link";
import { Button, Form, Grid, Header, Modal, Segment, Icon } from 'semantic-ui-react'
import BaseLayout from '../../components/layouts/BaseLayout'

import { signupUser } from "../../lib/auth";

class Signup extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: "",
    createdUser: "",
    openError: false,
    openSuccess: false,
    isLoading: false
  };

  handleClose = () => this.setState({ openError: false });

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    const { name, email, password } = this.state;
    
    event.preventDefault();
    const user = { name, email, password }
    this.setState({ isLoading: true, error: "" });

    signupUser(user)
      .then(createdUser => {
        this.setState({
          createdUser,
          error: "",
          openSuccess: true,
          isLoading: false
        })
      }).catch(this.showError);
  };

  showError = err => {
    const error = err.response && err.response.data || err.message;
    this.setState({ error, openError: true, isLoading: false });
  };
  
  render() {
    const { error, openError, openSuccess, createdUser, isLoading, password, confirmPassword } = this.state;
    const validatePassword = password !== confirmPassword;
    const disabledSubmit = password === confirmPassword && password !== '' && confirmPassword !== '' ? false : true;
    
    return (
        <BaseLayout {...this.props.auth}>
          <div>
            <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
              <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='blue' textAlign='center'>
                  Register to your account
                </Header>
                <Form size='large' onSubmit={this.handleSubmit}>
                  <Segment stacked>
                    <Form.Input 
                      fluid 
                      name="name"
                      icon='user' 
                      iconPosition='left' 
                      placeholder='Username' 
                      onChange={this.handleChange}
                    />
                    <Form.Input 
                      fluid 
                      name="email"
                      icon='mail' 
                      iconPosition='left' 
                      placeholder='E-mail address' 
                      type='email'
                      // error={true}
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
                    <Form.Input
                      fluid
                      name="confirmPassword"
                      icon='keyboard'
                      iconPosition='left'
                      placeholder='Confirm Password'
                      type='password'
                      error={validatePassword}
                      onChange={this.handleChange}
                    />
                    <Button color='blue' fluid size='large' disabled={disabledSubmit}>
                      {isLoading ? "Signing up..." : "Sign up"}
                    </Button>
                  </Segment>
                </Form>
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

        <Modal
          size='mini'
          dimmer="blurring"
          open={openSuccess}
        >
          <Header icon='checkmark' content='SUCCESS!' color="green"/>
          <Modal.Content>
            <h3>User {createdUser} successfully created!</h3>
          </Modal.Content>
          <Modal.Actions>
            <Button positive onClick={this.handleClose} inverted>
              <Link prefetch href="/auth/signin">
                  <a style={{color: 'white'}}><Icon name='user circle' /> sign in...</a>
              </Link>
            </Button>
          </Modal.Actions>
        </Modal>
      </BaseLayout>
    )
  }
}

export default Signup
