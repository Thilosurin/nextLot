import React, { Component } from 'react'
import { Link, Router } from '../server/routes/routes'

import {
  Container,
  Dropdown,
  Menu,
  Button,
  Visibility,
  Label,
  Icon,
  Modal
} from 'semantic-ui-react'
// import auth0 from '../services/auth0'
import { signoutUser } from '../lib/auth';
import { deleteMessages } from '../lib/api';

const menuStyle = {
  boxShadow: 'none',
  marginBottom: '1em',
  backgroundColor: '#fff',
  transition: 'box-shadow 0.5s ease, padding 0.5s ease',
}

const fixedMenuStyle = {
  backgroundColor: '#fbfcf7',
  border: '1px solid #ddd',
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
}

export default class Header extends Component {
  state = {
    menuFixed: false,
    open: false,
    delete: false,
    AmountMss: 0
  }

  componentDidMount = () => {
    if (this.props.isAuthenticated && this.props.user)
      this.setState({ AmountMss: this.props.user.messages.length })
  }

  closeConfigShow = (closeOnDimmerClick) => () => {
    this.setState({ closeOnDimmerClick, open: true })
  }

  deleteMss = () => this.setState({ open: false, delete: true })

  close = () => this.setState({ open: false })

  stickTopMenu = () => this.setState({ menuFixed: true })

  unStickTopMenu = () => this.setState({ menuFixed: false })

  render() {
    const { menuFixed, open, closeOnDimmerClick } = this.state
    const { user, isAuthenticated, admin, router } = this.props;
    
    return (
      <div>
        <style>{`
          html, body {
            background: #f4f2f1;
          }
        `}</style>

        <Visibility
          onBottomPassed={this.stickTopMenu}
          onBottomVisible={this.unStickTopMenu}
          once={false}
        >
          <Menu
            size='large'
            borderless
            fixed={menuFixed ? 'top' : undefined}
            style={menuFixed ? fixedMenuStyle : menuStyle}
          >
            <Container>
              <Menu.Item header>
                <Link prefetch route="/">
                  <a style={{ color: `${admin ? 'green' : 'blue'}` }}>NextLottery</a>
                </Link>
              </Menu.Item> 
              
              <Menu.Menu position='right'>
              {isAuthenticated && user && !admin ? (
                <Menu.Item>
                  <a onClick={this.closeConfigShow(true, false)}>
                    <Label as='a' size='medium' basic color='blue'>
                      <Icon name='mail' />
                      {this.state.AmountMss}
                      <Label.Detail>Messages</Label.Detail>
                    </Label>
                  </a>
                </Menu.Item> 
              ) : (
                null
              )}
              {isAuthenticated && user ? (
                <div>
                  <Dropdown text={user.name} pointing className='link item' style={{ color: `${admin ? 'green' : 'blue'}`, height: '100%' }}>
                    <Dropdown.Menu>
                      
                      <Dropdown.Item>
                        <Link prefetch route={`/profile/${user._id}`}>
                            <a>Profile</a>
                        </Link>
                      </Dropdown.Item>
                      {isAuthenticated && admin ? (
                        <Dropdown.Item>
                          <Link prefetch route="/admin/user">
                              <a>Users</a>
                          </Link>
                        </Dropdown.Item>
                      ) : (
                          <Dropdown.Item>
                            <Link prefetch route="/how">
                                <a>How to</a>
                            </Link>
                          </Dropdown.Item>
                      )}
                      <Dropdown.Divider />
                      {/* <Dropdown.Item onClick={auth0.logout}>logout</Dropdown.Item> */}
                      <Dropdown.Item onClick={signoutUser}>SIGN OUT</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  {/* <Menu.Item as="a" style={{display: 'inline-block'}}>
                    <Link>
                        <Button onClick={signoutUser} inverted><a>signout</a></Button>
                    </Link>
                  </Menu.Item> */}
                </div>
              ) : (
                <div>
                  {/* <Menu.Item as="a" style={{display: 'inline-block'}}>
                    <Link>
                        <Button onClick={auth0.login} inverted><a>login</a></Button>
                    </Link>
                  </Menu.Item> */}
                  {router.pathname === "/auth/signin" ? (
                    <Menu.Item as="a" style={{display: 'inline-block'}}>
                      <Link prefetch route="/auth/signup">
                          <Button inverted style={{color: 'blue'}}>sign up</Button>
                      </Link>
                    </Menu.Item>
                  ) : (
                    <Menu.Item as="a" style={{display: 'inline-block'}}>
                      <Link prefetch route="/auth/signin">
                          <Button inverted style={{color: 'blue'}}>sign in</Button>
                      </Link>
                    </Menu.Item>
                  )}
                </div>
              )}
              </Menu.Menu>
            </Container>
          </Menu>
        </Visibility>

        <Modal
          dimmer='inverted'
          open={open}
          closeOnDimmerClick={closeOnDimmerClick}
          onClose={this.close}
        >
          <Modal.Header>Your Messages</Modal.Header>
          {open ? user.messages.map(m => {
            return (
              <Modal.Content>
                <p>{m}</p>
              </Modal.Content>
          )}) : null}
          <Modal.Actions>
            <Button onClick={this.deleteMss} negative>
            { this.state.delete 
              ? deleteMessages(user._id)
              .then(() => this.setState({ delete: false, AmountMss: 0 }))
              .then(setTimeout(() => Router.reload('/'), 1000))
              : 'Delete' }
            </Button>
            <Button
              onClick={this.close}
              positive
              labelPosition='right'
              icon='checkmark'
              content='OK!'
            />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}