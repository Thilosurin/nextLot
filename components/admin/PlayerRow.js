import React, { Component } from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';

import DeleteUser from './DeleteUser'
import { updateStatusUser } from "../../lib/api";
import { Link } from '../../server/routes/routes'
import Router from "next/router";

class PlayerRow extends Component {
  handleStatusChange = () => {
    event.preventDefault();
    const { player } = this.props

    updateStatusUser(player)
      .then(() => Router.replace('/success'))
      .catch(this.showError)
  };

  render() {
    const { Row, Cell, Body } = Table;
    const { player, index } = this.props;
    
    return (
      <Body>
        <Row
          disabled={false}
          positive={player.status}
        >
          <Cell>{index+1}</Cell>
          <Cell>
            <Link prefetch route={`/profile/${player._id}`}>
            <a>
              {player.name}
            </a>
            </Link>
          </Cell>
          <Cell>
            <strong style={{color: 'green'}}>
              {player.account.length === 0 
                ? 'No Account' 
                : player.account.map((user, i) => 
                    user[i] = player.account[i]["accAddress"] + '\n')
            }</strong>
            {/* {player.account} */}
          </Cell>
          <Cell>
            <Button color={player.status ? 'green' : 'grey'} basic onClick={this.handleStatusChange}>
              <Icon name='user' /> {player.status ? 'Admin' : 'Player'}
            </Button>
          </Cell>
          <Cell>
            <DeleteUser player={player}/>
          </Cell>
        </Row>
      </Body>
    );
  }
}

export default PlayerRow;