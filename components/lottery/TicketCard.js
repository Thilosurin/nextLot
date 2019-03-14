import { Component } from 'react'
import { Card } from 'semantic-ui-react'
import web3 from '../../ethereum/web3';


class TicketCard extends Component {

    renderCards() {
        const { playerLot } = this.props;
        
        const items = playerLot.reverse().map(playerLot => {
            const ticketColor = playerLot.reward ? 'green' : '';

            return {
                header: playerLot.numberLottery,
                meta: 'reward : ' + web3.utils.fromWei(playerLot.prize, 'ether') + ' ether',
                color: ticketColor,
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