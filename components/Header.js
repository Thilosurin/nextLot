import React, { Component } from 'react'
import { Link } from '../server/routes/routes'

import {
  Container,
  Dropdown,
  Menu,
  Button,
  Visibility,
} from 'semantic-ui-react'
import auth0 from '../services/auth0'
import { signoutUser } from '../lib/auth';

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
    menuFixed: false
  }

  stickTopMenu = () => this.setState({ menuFixed: true })

  unStickTopMenu = () => this.setState({ menuFixed: false })

  render() {
    const { menuFixed } = this.state
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
              {isAuthenticated && user ? (
                <div>
                  <Dropdown text={user.name} pointing className='link item' style={{ color: `${admin ? 'green' : 'blue'}`, display: 'inline-block' }}>
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Link prefetch route="/profile">
                            <a>profile</a>
                        </Link>
                      </Dropdown.Item>
                      {isAuthenticated && admin ? (
                        <Dropdown.Item>
                          <Link prefetch route="/admin/user">
                              <a>manage user</a>
                          </Link>
                        </Dropdown.Item>
                      ) : (
                        <Dropdown.Item>
                          <Link prefetch route="/show">
                              <a>something</a>
                          </Link>
                        </Dropdown.Item>
                      )}
                      <Dropdown.Divider />
                      {/* <Dropdown.Item onClick={auth0.logout}>logout</Dropdown.Item> */}
                      <Dropdown.Item onClick={signoutUser}>signout</Dropdown.Item>
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
                          <Button inverted><a>sign up</a></Button>
                      </Link>
                    </Menu.Item>
                  ) : (
                    <Menu.Item as="a" style={{display: 'inline-block'}}>
                      <Link prefetch route="/auth/signin">
                          <Button inverted><a>sign in</a></Button>
                      </Link>
                    </Menu.Item>
                  )}
                </div>
              )}
              </Menu.Menu>
            </Container>
          </Menu>
        </Visibility>

      </div>
    )
  }
}