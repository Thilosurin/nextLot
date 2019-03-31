import { Component } from 'react'
import { Segment, Statistic, Icon, Divider } from 'semantic-ui-react'
import web3 from '../../ethereum/web3';


class TicketCard extends Component {    
    render() {
        const { summary } = this.props;
        
        return(
            <div>
                <h3>Summary</h3>
                <Segment padded raised>
                    <Statistic size="large" color="green" horizontal>
                        <Icon name="ticket" color="grey" size="big" />&nbsp;&nbsp;&nbsp;&nbsp;
                        <Statistic.Value>{summary[0]}</Statistic.Value>
                        <Statistic.Label>Lotteries</Statistic.Label>
                    </Statistic>
                    <Divider/>

                    <Statistic size="large" color="green" horizontal>
                        <Icon name="ethereum" color="grey" size="big" />&nbsp;&nbsp;&nbsp;&nbsp;
                        <Statistic.Value>
                            {web3.utils.fromWei(summary[1], 'ether')}
                        </Statistic.Value>
                        <Statistic.Label>Purchase(ETH)</Statistic.Label>
                    </Statistic>
                    <Divider/>

                    <Statistic size="large" color="green" horizontal>
                        <Icon name="money bill alternate" color="grey" size="big" />&nbsp;&nbsp;&nbsp;&nbsp;
                        <Statistic.Value>
                            {web3.utils.fromWei(summary[2], 'ether')}
                        </Statistic.Value>
                        <Statistic.Label>Prize(ETH)</Statistic.Label>
                    </Statistic>
                </Segment>
            </div>
        )
    }
}

export default TicketCard