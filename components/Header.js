import React, { Component } from 'react'
import Link from "next/link";
import {
  Container,
  Dropdown,
  Menu,
  Button,
  Visibility,
} from 'semantic-ui-react'
import auth0 from '../services/auth0'

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

  // renderAdminMenu() {
  //   const { isSiteOwner } = this.props;

  //   if (isSiteOwner) {
  //     return (
        
  //     )
  //   }

  //   return (
  //     <NavItem className="port-navbar-item">
  //       <BsNavLink route="/blogs" title="Blog" />
  //     </NavItem>
  //   )
  // }

  render() {
    const { menuFixed } = this.state
    const { pathname, user, isAuthenticated, query = false } = this.props;

    console.log(user);
    
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
              <Menu.Item>
                {/* <Image size='mini' src='/logo.png' /> */}
              </Menu.Item>
              <Menu.Item header>
                <Link prefetch href="/">
                  NextLottery
                </Link>
              </Menu.Item>    
              
              <Menu.Menu position='right'>
              {isAuthenticated ? (
                <Dropdown text={user.name} pointing className='link item'>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Link prefetch href="/">
                          Home
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>List Item</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={auth0.logout}>LogOut</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Menu.Item as='a'>
                  <Link>
                      <Button onClick={auth0.login} inverted><a>LogIn</a></Button>
                  </Link>
                </Menu.Item>
              )}
              </Menu.Menu>
            </Container>
          </Menu>
        </Visibility>

      </div>
    )
  }
}