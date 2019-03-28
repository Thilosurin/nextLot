import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import DeleteUser from '../../components/admin/DeleteUser'

class PlayersRow extends Component {

  render() {
    const { Row, Cell } = Table;
    const { user } = this.props;

    return (
      <Row
        disabled={false}
        positive={true}
      >
        <Cell>{'5555555555555555555555'}</Cell>
        <Cell>{'5555555555555555555555'}</Cell>
        <Cell>{'5555555555555555555555'}</Cell>
        <Cell>{'user'}</Cell>
        <Cell>
          <DeleteUser user={user}/>
        </Cell>
      </Row>
    );
  }
}

export default PlayersRow;