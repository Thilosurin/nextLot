import { Component } from 'react'
import { Card } from 'semantic-ui-react'
import web3 from '../../ethereum/web3';


class TicketCard extends Component {

    renderCards() {
        const { summary } = this.props;
        
        const items = [
            {
                header: summary[0],
                meta: 'Amount of Lotteries'
            },
            {
                header: web3.utils.fromWei(summary[1], 'ether'),
                meta: 'Total Buy Lotteries (ether)'
            },
            {
                header: web3.utils.fromWei(summary[2], 'ether'),
                meta: 'Total Rewards (ether)'
            }
        ]
        return <Card.Group items={items} />
    }
    
    render() {
        
        return(
            <div>
                <h3>Summary</h3>
                {this.renderCards()}
            </div>
        )
    }
}

export default TicketCard