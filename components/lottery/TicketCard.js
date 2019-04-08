import { Component } from 'react'
import { Card } from 'semantic-ui-react'
import web3 from '../../ethereum/web3';


class TicketCard extends Component {

    renderCards() {
        const { playerLot } = this.props;
        
        const items = playerLot.reverse().map(playerLot => {
            const ticketColor = playerLot.reward ? 'green' : '';
            const showReward = web3.utils.fromWei(playerLot.prize, 'ether') === '0' ? '' :  web3.utils.fromWei(playerLot.prize, 'ether') + ' ETH';

            return {
                key: playerLot.id,
                header: playerLot.numberLottery,
                description: [showReward],
                meta: 'time',
                meta: new Date(playerLot.timeBuy*1000).toLocaleString(),
                color: [ticketColor],
                fluid: true
            }
        });
        return <Card.Group items={items} />
    }
    
    render() {
        
        return(
            <div>
                <h3>Your Ticket</h3>
                {this.renderCards()}
            </div>
        )
    }
}

export default TicketCard