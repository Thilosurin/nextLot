import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';

class ProfileRow extends Component {

  render() {
    const { Row, Cell } = Table;
    const { } = this.props;

    return (
      <Row
        disabled={false}
        positive={false}
      >
        <Cell>{555555}</Cell>
        <Cell>{555555}</Cell>
        <Cell>{555555}</Cell>
        <Cell>{555555}</Cell>
        <Cell>{555555}</Cell>
      </Row>
    );
  }
}

export default ProfileRow;