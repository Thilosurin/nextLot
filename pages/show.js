import { Component } from "react"
import Period from '../ethereum/period'
import web3 from '../ethereum/web3'
import { Card, Grid, Button, Breadcrumb, Divider, Header, Icon, Table } from 'semantic-ui-react'
import BaseLayout from '../components/layouts/BaseLayout'
import { Link } from '../server/routes/routes'

import Summary from '../components/admin/Summary'
import TicketCard from '../components/lottery/TicketCard'
import CreateTicket from '../components/lottery/CreateTicket'

import withAuth from '../components/hoc/withAuth'

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
            Array(parseInt(lotteriesCount)).fill()
                .map((element, index) => { return period.methods.lotteries(index).call() })
        )

        const playerLot = lotteries.filter(el => el.players === account)

        return {
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

    render() {
        const { admin, user } = this.props.auth;
        const { address, summary, playerLot, defuseAlarm,
                numPeriod,
                priceLottery,
                lotteryPerNum,
                timeOut,
                creator } = this.props;
        const myDate = new Date(timeOut*1000);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateTimeOut = myDate.toLocaleString('thai', options);
        const timeTimeOut = myDate.toLocaleTimeString();

    return (
        <BaseLayout {...this.props.auth}>
            <Breadcrumb size='large'>
                <Breadcrumb.Section link>
                    <Link prefetch route={`/`}>
                        <a>Home</a>
                    </Link>
                </Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section active>Period</Breadcrumb.Section>
            </Breadcrumb>
            <Divider hidden />
            
            <h3>Period Infomation</h3>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>
                        <Divider horizontal>
                            <Header as='h4'>
                                <Icon name='tag' />
                                Description
                            </Header>
                        </Divider>

                        <p style={{textAlign: 'center'}}>Investment risk investors, study the information before making investment decisions.</p>

                        <Divider horizontal>
                            <Header as='h4'>
                                <Icon name='bar chart' />
                                Period Specifications
                            </Header>
                        </Divider>

                        <Table definition>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell width={4}>Period Number</Table.Cell>
                                    <Table.Cell>{ numPeriod }</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Lottery Price (ether)</Table.Cell>
                                    <Table.Cell>{ web3.utils.fromWei(priceLottery, 'ether') }</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Amount / Number</Table.Cell>
                                    <Table.Cell>{ lotteryPerNum }</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Status Period</Table.Cell>
                                    <Table.Cell>{ !defuseAlarm === true ? 'OPEN' : 'CLOSED' }</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Closing Time</Table.Cell>
                                    <Table.Cell>{ timeTimeOut + ', ' +  dateTimeOut }</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Account Creator</Table.Cell>
                                    <Table.Cell>{ creator }</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>

                        <Button primary style={{ marginTop: '1.5rem' }}>
                            <Link prefetch route={`/${address}/transection`} >
                                <a style={{color: 'white'}}>View Transaction</a>
                            </Link>
                        </Button>

                    </Grid.Column>

                    {admin ? (
                        <Grid.Column width={6}>
                            <Summary summary={summary}/>
                        </Grid.Column>
                    ) : (
                        <Grid.Column width={6}>
                            <CreateTicket address={address} defuseAlarm={defuseAlarm} user={user} />
                                <br/>
                            <TicketCard address={address} playerLot={playerLot} />
                        </Grid.Column>
                    )}
                </Grid.Row>
            </Grid>
        </BaseLayout>
    );
  }
}

export default withAuth()(ShowPeriod)