import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import { Link } from '../../server/routes/routes'
import web3 from '../../ethereum/web3';

class LotteryRow extends Component {

  render() {
    const { Row, Cell } = Table;
    const { index, lottery, players } = this.props;
    const ticket = Object.values(lottery)
    // const player = Object.values(players)

    return (
      <Row
        disabled={ticket[0] === 'true'}
        positive={ticket[8] > 0}
      >
        <Cell>{index+1}</Cell>
        <Cell>{ticket[5]}</Cell>
        <Cell>{ticket[6]}</Cell>
        <Cell>
          <Link prefetch route={`/profile/${ticket[3].map(name => name = name._id)}`}>
            <a>
              {ticket[3].map(name => name = name.name)}
            </a>
          </Link>
        </Cell>
        <Cell>{new Date(ticket[7]).toLocaleString()}</Cell>
        <Cell>{ticket[0].toString()}</Cell>
        <Cell>{ticket[8]}</Cell>
      </Row>
    );
  }

  //   return (
  //     <Row
  //       disabled={lottery.reward}
  //       positive={lottery.prize > 0}
  //     >
  //       <Cell>{lottery.id}</Cell>
  //       <Cell>{lottery.numberLottery}</Cell>
  //       <Cell>{lottery.players}</Cell>
  //       <Cell>
  //         {/* <Link prefetch route={`/profile/${player}`}> */}
  //         <Link prefetch route={`/profile/`}>
  //           <a>
  //             {/* {player[3]} */}
  //           </a>
  //         </Link>
  //       </Cell>
  //       <Cell>{new Date(lottery.timeBuy*1000).toLocaleString()}</Cell>
  //       <Cell>{lottery.reward.toString()}</Cell>
  //       <Cell>{web3.utils.fromWei(lottery.prize, 'ether')}</Cell>
  //     </Row>
  //   );
  // }

}

export default LotteryRow;