import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import web3 from '../ethereum/web3';

class LotteryRow extends Component {

  render() {
    const { Row, Cell } = Table;
    const { no, lottery } = this.props;

    return (
      <Row
        disabled={lottery.reward}
        positive={lottery.prize > 0}
      >
        <Cell>{no}</Cell>
        <Cell>{lottery.players}</Cell>
        <Cell>{lottery.id}</Cell>
        <Cell>{lottery.numberLottery}</Cell>
        <Cell>{lottery.reward.toString()}</Cell>
        <Cell>{web3.utils.fromWei(lottery.prize, 'ether')}</Cell>
      </Row>
    );
  }
}

export default LotteryRow;