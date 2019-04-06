import { Component } from "react"
import Period from '../ethereum/period'
import web3 from '../ethereum/web3'
import { Card, Grid, Button, Breadcrumb, Divider } from 'semantic-ui-react'
import BaseLayout from '../components/layouts/BaseLayout'
import { Link } from '../server/routes/routes'

import Summary from '../components/admin/Summary'
import TicketCard from '../components/lottery/TicketCard'
import CreateTicket from '../components/lottery/CreateTicket'

import withAuth from '../components/hoc/withAuth'
import { createdPeriod } from '../lib/api'

class ShowPeriod extends Component {

    static async getInitialProps(props) {
        const period = Period(props.query.address)
        const lotteriesCount = await period.methods.getLotteriesCount().call()
        const periodInfo = await period.methods.getPeriodInfo().call()    
        const summary = await period.methods.getSummary().call()

        const defuseAlarm = await period.methods.defuseAlarm().call()

        const accounts = await web3.eth.getAccounts()
        const account = accounts[0];
        
        const lotteries = await Promise.all(
            Array(parseInt(lotteriesCount))
                .fill()
                .map((element, index) => { return period.methods.lotteries(index).call() })
        )

        const playerLot = lotteries.filter(el => el.players === account)

        return {
            periodInfo,
            playerLot,
            summary,
            defuseAlarm,
            address: props.query.address,
            numPeriod: periodInfo[0], 
            priceLottery: periodInfo[1],
            lotteryPerNum: periodInfo[2],
            timeOut: periodInfo[4],
            creator: periodInfo[5]
        }
    }

    componentDidMount() {
        // this.insertAccount()
        console.log(this.props.periodInfo);
        // console.log(Object.values(this.props.periodInfo));
        // console.log(Object.keys(this.props.periodInfo));
        createdPeriod(this.props.periodInfo).catch(this.showError)
        // createdPeriod(Object.values(this.props.periodInfo)).catch(this.showError)
    }

    // insertAccount = async () => {
    //     const { user } = this.props.auth;
    //     const accounts = await web3.eth.getAccounts()

    //     const notUndefinedAcc0 = user.account.length > 0 
    //                             ? user.account[0]['accAddress'] 
    //                             : false
    //     const validatePushAccClient = !user.account.includes(accounts[0]) 
    //                             && notUndefinedAcc0 !== accounts[0]
                                
    //     if (validatePushAccClient)
    //         user.account.forEach(() => user.account.pop())
    //         user.account.push(accounts[0]);
    // }

  renderCards() {
    const {
        defuseAlarm,
        numPeriod,
        priceLottery,
        lotteryPerNum,
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
            header: `${!defuseAlarm === true ? 'OPEN' : 'CLOSED'}`,
            meta: 'Status Period',
            color: `${!defuseAlarm === true ? 'blue' : 'red'}`
        },
        {
            header: `${dateTimeOut} .... ${timeTimeOut}`,
            meta: 'Time to Stop Buy Lottery (sec)',
            color: `${!defuseAlarm === true ? 'blue' : 'red'}`
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
    const { admin, user } = this.props.auth;
    const { address, summary, defuseAlarm, playerLot } = this.props;
    const { Section } = Breadcrumb

    return (
      <BaseLayout {...this.props.auth}>
        <Breadcrumb size='large'>
            <Section link>
            <Link prefetch route={`/`}>
                <a>Home</a>
            </Link>
            </Section>
            <Breadcrumb.Divider icon='right chevron' />
            <Section active>Period</Section>
        </Breadcrumb>
        <Divider hidden />
        
        <h3>Period Infomation</h3>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>
                        {this.renderCards()}

                        <Link prefetch route={`/${address}/transection`} >
                            <a>
                                <Button primary style={{ marginTop: '1.5rem' }}>View Transaction</Button>
                            </a>
                        </Link>
                    </Grid.Column>

                    {admin ? (
                        <Grid.Column width={6}>
                            <Summary summary={summary}/>
                        </Grid.Column>
                    ) : (
                        <Grid.Column width={6}>
                            <CreateTicket address={address} defuseAlarm={defuseAlarm} user={user} />
                            <br/>
                            <TicketCard address={address} playerLot={playerLot}/>
                        </Grid.Column>
                    )}
                </Grid.Row>
            </Grid>
      </BaseLayout>
    );
  }
}

export default withAuth()(ShowPeriod)