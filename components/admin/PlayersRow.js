import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';

class PlayersRow extends Component {

  render() {
    const { Row, Cell } = Table;
    const {  } = this.props;

    return (
      <Row
        disabled={false}
        positive={true}
      >
        <Cell>{}</Cell>
        <Cell>{}</Cell>
        <Cell>{}</Cell>
        <Cell>{}</Cell>
        <Cell>{}</Cell>
      </Row>
    );
  }
}

export default PlayersRow;