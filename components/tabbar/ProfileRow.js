import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';

class ProfileRow extends Component {

  render() {
      const { Row, Cell } = Table;
      const { index, ticket } = this.props;
      const objTicket = ticket.tkPeriod.pop()
      // console.log(Object.values(objTicket)[2]);
      
      return (
        <Row
          disabled={ticket.tkReward.toString() === 'true'}
          positive={ticket.tkPrize !== 0}
        >
          <Cell>{index+1}</Cell>
          <Cell>{ticket.tkNumber}</Cell>
          <Cell>{Object.values(objTicket)[2]}</Cell>
          <Cell>{ticket.tkReward.toString()}</Cell>
          <Cell>{ticket.tkPrize}</Cell>
        </Row>

        // <Row
        //   disabled={ticket.tkReward.toString() === 'true'}
        //   positive={ticket.tkPrize !== 0}
        // >
        //   <Cell>{index+1}</Cell>
        //   <Cell>{ticket.tkNumber}</Cell>
        //   <Cell>{ticket.tkPeriod}</Cell>
        //   <Cell>{ticket.tkReward.toString()}</Cell>
        //   <Cell>{ticket.tkPrize}</Cell>
        // </Row>
      );
  }
}

export default ProfileRow;