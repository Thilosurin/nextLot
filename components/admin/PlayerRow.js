import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import DeleteUser from './DeleteUser'
import PlayerStatus from './PlayerStatus'

class PlayerRow extends Component {

  render() {
    const { Row, Cell } = Table;
    const { player, index } = this.props;
    
    return (
      <Row
        disabled={false}
        positive={player.status === 1}
      >
        <Cell>{index+1}</Cell>
        <Cell>{player.name}</Cell>
        <Cell>{player.account}</Cell>
        <Cell>
          <PlayerStatus player={player}/>
        </Cell>
        <Cell>
          <DeleteUser player={player}/>
        </Cell>
      </Row>
    );
  }
}

export default PlayerRow;