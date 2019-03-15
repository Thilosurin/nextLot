import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';

class LotteryRow extends Component {

  render() {
    const { Row, Cell } = Table;
    const { lottery } = this.props;

    return (
      <Row
        disabled={lottery.reward}
        positive={lottery.prize > 0}
      >
        <Cell>{lottery.id}</Cell>
        <Cell>{lottery.numberLottery}</Cell>
        <Cell>{lottery.players}</Cell>
        <Cell>{new Date(lottery.timeBuy*1000).toLocaleString()}</Cell>
        {/* <Cell>{'20/04/2540'}</Cell> */}
        <Cell>{lottery.reward.toString()}</Cell>
        <Cell>{web3.utils.fromWei(lottery.prize, 'ether')}</Cell>
      </Row>
    );
  }
}

export default LotteryRow;