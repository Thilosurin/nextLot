import { Component } from "react";
import Period from '../ethereum/period';
import web3 from '../ethereum/web3';
import { Card, Grid, Button } from 'semantic-ui-react';
import BaseLayout from '../components/layouts/BaseLayout'
import { Link } from '../routes';

import Summary from '../components/lottery/Summary'
import TicketCard from '../components/lottery/TicketCard';
import CreateTicket from '../components/lottery/CreateTicket';

import withAuth from '../components/hoc/withAuth';

class ShowPeriod extends Component {

  static async getInitialProps(props) {
    const period = Period(props.query.address)
    const lotteriesCount = await period.methods.getLotteriesCount().call()
    const periodInfo = await period.methods.getPeriodInfo().call()    

    const summary = await period.methods.getSummary().call()    

    const accounts = await web3.eth.getAccounts()
    const player = accounts[0];
    
    const lotteries = await Promise.all(
        Array(parseInt(lotteriesCount))
            .fill()
            .map((element, index) => { return period.methods.lotteries(index).call() })
    )

    const playerLot = lotteries.filter(el => el.players === player)
    // console.log(lotteries[0].players);
    // console.log(lotteries[0].players === player); // true
    
    
    return { 
        playerLot,
        summary,
        address: props.query.address,
        numPeriod: periodInfo[0], 
        priceLottery: periodInfo[1],
        lotteryPerNum: periodInfo[2],
        runStatus: periodInfo[3],
        timeOut: periodInfo[4],
        creator: periodInfo[5]
    }
  }

  renderCards() {
    const {
        numPeriod,
        priceLottery,
        lotteryPerNum,
        runStatus,
        timeOut,
        creator
    } = this.props;

    const myDate = new Date(timeOut*1000);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateTimeOut = myDate.toLocaleString('thai', options);
    const timeTimeOut = myDate.toLocaleTimeString();
    
    const items = [
        {
            header: numPeriod,
            meta: 'Period Number'
        },
        {
            header: web3.utils.fromWei(priceLottery, 'ether'),
            meta: 'Lottery Price (ether)'
        },
        {
            header: lotteryPerNum,
            meta: 'Amount / Number'
        },
        {
            header: `${runStatus.toString() === 'true' ? 'OPEN' : 'CLOSED'}`,
            meta: 'Status Period',
            color: `${runStatus.toString() === 'true' ? 'blue' : 'red'}`
        },
        {
            header: `${dateTimeOut} .... ${timeTimeOut}`,
            meta: 'Time to Stop Buy Lottery (sec)',
            color: `${runStatus.toString() === 'true' ? 'blue' : 'red'}`
        },
        {
            header: creator,
            meta: 'Address Creator',
            style: { overflowWrap: 'break-word' }
        }
    ]

    return <Card.Group items={items} />
  }

  render() {
    const { admin } = this.props.auth;

    return (
      <BaseLayout {...this.props.auth}>
        <Link prefetch route={`/`}>
            <a>Back</a>
        </Link>
        <h3>Period Infomation</h3>
          <Grid>
              <Grid.Row>
                  <Grid.Column width={10}>
                      {this.renderCards()}

                    <Link prefetch route={`/${this.props.address}/transection`} >
                        <a>
                            <Button primary style={{ marginTop: '1.5rem' }}>View Transaction</Button>
                        </a>
                    </Link>
                  </Grid.Column>

                {admin ? (
                    <Grid.Column width={6}>
                        <Summary summary={this.props.summary}/>
                    </Grid.Column>
                ) : (
                    <Grid.Column width={6}>
                        <CreateTicket address={this.props.address} />
                        <br/>
                        <TicketCard address={this.props.address} playerLot={this.props.playerLot}/>
                    </Grid.Column>
                )}
              </Grid.Row>
          </Grid>
      </BaseLayout>
    );
  }
}

export default withAuth()(ShowPeriod)