import React, { Component } from 'react'
import Link from "next/link";

import {
  Container,
  Dropdown,
  Image,
  Menu,
  Button,
  Visibility,
} from 'semantic-ui-react'

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

const LeftImage = () => (
  <Image
    floated='left'
    size='medium'
    src='/images/wireframe/square-image.png'
    style={{ margin: '2em 2em 2em -4em' }}
  />
)

const RightImage = () => (
  <Image
    floated='right'
    size='medium'
    src='/images/wireframe/square-image.png'
    style={{ margin: '2em -4em 2em 2em' }}
  />
)

export default class StickyLayout extends Component {

  state = {
    menuFixed: false
  }

  stickTopMenu = () => this.setState({ menuFixed: true })

  unStickTopMenu = () => this.setState({ menuFixed: false })

  render() {
    const { menuFixed } = this.state
    const { pathname, authenticated, query = false } = this.props;

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
              <Menu.Item as='a'>
                {authenticated &&
                    <Link prefetch href="/user">
                        Home
                    </Link>}
                {/* {!authenticated &&
                    <Link prefetch href="/">
                        home
                    </Link>} */}
              </Menu.Item>
              <Menu.Item as='a'>
                {authenticated &&
                    <Link prefetch href="/user/buy">
                        buy
                    </Link>}
                {/* {!authenticated &&
                    <Link prefetch href="/">
                        wallet
                    </Link>} */}
              </Menu.Item>
              <Menu.Item as='a'>
                {authenticated &&
                    <Link prefetch href="/user/check">
                        check
                    </Link>}
                {/* {!authenticated &&
                    <Link prefetch href="/">
                        coin
                    </Link>} */}
              </Menu.Item>
              
              <Menu.Menu position='right'>
              {/* {authenticated ? ( */}
                <Dropdown text='shit' pointing className='link item'>
                  <Dropdown.Menu>
                    <Dropdown.Item>List Item</Dropdown.Item>
                    <Dropdown.Item>List Item</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              {/* ) : ( */}
                <Menu.Item as='a'>
                {!authenticated && pathname !== "/auth/login" ? (
                    <Link prefetch href="/auth/login">
                        <Button inverted><a>Sign Up</a></Button>
                    </Link>
                ) : (
                    <Link prefetch href="/auth/register">
                        Register
                    </Link>
                )}
                </Menu.Item>
              {/* )} */}
              </Menu.Menu>
            </Container>
          </Menu>
        </Visibility>

      </div>
    )
  }
}