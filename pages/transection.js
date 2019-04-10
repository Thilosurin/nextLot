import { Component } from 'react'
import { Button, Table, Form, Message, Input, Breadcrumb, Divider } from 'semantic-ui-react'
import { Link } from '../server/routes/routes'
import BaseLayout from '../components/layouts/BaseLayout'
import Period from '../ethereum/period'
import LotteryRow from '../components/lottery/LotteryRow'

import { getUserFeed, getTicketsByUser } from '../lib/api'
import withAuth from '../components/hoc/withAuth';

class Transection extends Component {
    state = {
        players: [],
        lotteries: [],
        reward: '',
        loading: false,
        errorMessage: '',
    }

    static async getInitialProps(props) {
        const { address } = props.query;
        const period = Period(address)
        const lotteriesCount = await period.methods.getLotteriesCount().call()

        const lotteries = await Promise.all(
            Array(parseInt(lotteriesCount)).fill().map((element, index) => {
                return period.methods.lotteries(index).call()
            })
        )

        // return { address, lotteriesCount, period }
        return { address, lotteries, lotteriesCount, period }
    }

    componentDidMount() {
        getUserFeed(this.props.auth.user._id)
            .then(players => players.filter(players => this.setState({ players })))
                // console.log(players.map(id => id = id['_id'])))
        
        // getUserFeed(this.props.auth.user._id)
        //     .then(players => 
        //         players.map(player => 
        //             getTicketsByUser(player['_id'])
        //                 .then((lotteries) => this.setState({ lotteries }))))
    }

    renderRows() {
        // console.log(this.state.lotteries);
        console.log(this.state.players);
        
        // return this.state.lotteries.map((lottery, index) => {
        return this.props.lotteries.map((lottery, index) => {
            return <LotteryRow 
                key={index}
                index={index}
                lottery={lottery}
                players={this.state.players}
            />
        })
    }
    
    render() {
        const { Header, Row, HeaderCell, Body } = Table
        const { admin } = this.props.auth;
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
                    <Section active>
                    <Link prefetch route={`/${this.props.address}`}>
                        <a>Period</a>
                    </Link>
                    </Section>
                    <Breadcrumb.Divider icon='right chevron' />
                    <Section active>Transection</Section>
                </Breadcrumb>
                <Divider hidden />
                
                <h3>Transection</h3>
                {admin &&
                <Link prefetch route={`/admin/${this.props.address}/reward`}>
                    <a>
                        <Button primary floated="right" style={{ marginBottom: "10px", clear: 'right' }}>Add Reward</Button>
                    </a>
                </Link>}

                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>No.</HeaderCell>
                            <HeaderCell>LotteryNumber</HeaderCell>
                            <HeaderCell>Address</HeaderCell>
                            <HeaderCell>Name</HeaderCell>
                            <HeaderCell>Date</HeaderCell>
                            <HeaderCell>Reward</HeaderCell>
                            <HeaderCell>Prize (ETH)</HeaderCell>
                        </Row>
                    </Header>
                    <Body>{this.renderRows()}</Body>
                </Table>
                <div style={{float: 'right'}}>Found {this.props.lotteriesCount} Lotteries.</div>
            </BaseLayout>
        )
    }
}

export default withAuth()(Transection)