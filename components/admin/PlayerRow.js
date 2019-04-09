import React, { Component } from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';

import DeleteUser from './DeleteUser'
import { updateStatusUser } from "../../lib/api";
import { Link } from '../../server/routes/routes'
import Router from "next/router";

import { getTicketsByUser } from '../../lib/api'

class PlayerRow extends Component {
  state = {
    tickets: []
  }

  componentDidMount() {
    const { player } = this.props
    
    getTicketsByUser(player._id)
      .then((tickets) => this.setState({ tickets }))
  }
  
  handleStatusChange = () => {
    event.preventDefault();
    const { player } = this.props

    updateStatusUser(player)
      .then(() => Router.replace('/success'))
      .catch(this.showError)
  };

  render() {
    const { Row, Cell, Body } = Table
    const { player, index } = this.props
    const { tickets } = this.state
    let acc = []
    tickets.map((tk, i) => acc.length===0 || !acc.includes(tickets[i]["tkAccount"]) ? acc.push(tickets[i]["tkAccount"]) : '')
    
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
          <Cell style={{width: '50%'}}>
            <strong style={{color: 'green'}}>       
              {tickets.length === 0 
                ? 'No Account' 
                : acc.map(i => i + '\n')}
            </strong>
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