import { Component } from 'react'
import { Card } from 'semantic-ui-react'
import web3 from '../ethereum/web3';


class TicketCard extends Component {

    renderCards() {
        const { playerLot } = this.props;        
    
        const items = playerLot.reverse().map(playerLot => {
            return {
                header: playerLot.numberLottery,
                description: 'prize : ' + web3.utils.fromWei(playerLot.prize, 'ether'),
                fluid: true
            }
        });
    
        return <Card.Group items={items} />
    }
    
    render() {
        // const { address, lottery } = this.props;
        
        return(
            <div>
                <h3>Your Ticket</h3>
                {/* <h1>Hello { address }</h1> */}
                {this.renderCards()}
            </div>
        )
    }
        

    // const items = await period.methods.reverse().map(address => {
    //     return {
    //         header: address,
    //         description: (
    //             <Link route={`/${address}`}>
    //                 <a>View Period</a>
    //             </Link>
    //         ),
    //         fluid: true
    //     }
    // });

}

export default TicketCard