import { Component } from "react";
import Period from '../ethereum/period';
import web3 from '../ethereum/web3';
import { Card, Grid, Button } from 'semantic-ui-react';
import App from "../components/App";
import { Link } from '../routes';

import TicketCard from '../components/TicketCard';
import CreateTicket from '../components/CreateTicket';

export default class ShowPeriod extends Component {

  static async getInitialProps(props) {
    const period = Period(props.query.address)
    const lotteriesCount = await period.methods.getLotteriesCount().call()
    const periodInfo = await period.methods.getPeriodInfo().call()    

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
    console.log(dateTimeOut);
    
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
            header: runStatus.toString(),
            meta: 'Status Period'
        },
        {
            header: `${dateTimeOut} .... ${timeTimeOut}`,
            meta: 'Time to Stop Buy Lottery (sec)'
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

    return (
      <App>
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

                  <Grid.Column width={6}>
                        {/* User */}
                      <CreateTicket address={this.props.address} />
                      <br/>
                      <TicketCard address={this.props.address} playerLot={this.props.playerLot}/>
                  </Grid.Column>
              </Grid.Row>

              {/* <Grid.Row> */}
                  {/* <Grid.Column> */}
                    {/* Admin */}
                      {/* <Link route={`/admin/${this.props.address}`}>
                      <a>
                          <Button primary>View Transaction</Button>
                      </a>
                      </Link> */}

                  {/* </Grid.Column> */}
              {/* </Grid.Row> */}
          </Grid>
      </App>
    );
  }
}
