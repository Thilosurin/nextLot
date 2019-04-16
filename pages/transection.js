import { Component } from 'react'
import { Button, Table, Segment, Dimmer, Image, Breadcrumb, Divider, Loader } from 'semantic-ui-react'
import { Link } from '../server/routes/routes'
import BaseLayout from '../components/layouts/BaseLayout'
import LotteryRow from '../components/lottery/LotteryRow'

import { getTicketsByPeriod } from '../lib/api'
import withAuth from '../components/hoc/withAuth';

class Transection extends Component {
    state = {
        lotteries: [],
        reward: '',
        loading: false,
        errorMessage: '',
        isLoading: true,
    }

    static async getInitialProps(props) {
        const { address } = props.query;
        return { address }
    }

    componentDidMount() {
        getTicketsByPeriod(this.props.address)
            .then(lotteries => this.setState({ lotteries, isLoading: false }))
    }

    renderRows() {
        const { lotteries } = this.state
        
        if (lotteries) {
            return lotteries.map((lottery, index) => {
                return <LotteryRow 
                    key={index}
                    index={index}
                    lottery={lottery}
                />
            })    
        }
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
                {this.state.isLoading ? (
                    <Segment >
                        <Dimmer active inverted inline='centered'>
                            <Loader size='massive'>Loading</Loader>
                        </Dimmer>
                        <p>
                            <Image src='/static/images/paragraph.png' centered />
                        </p>
                        <p>
                            <Image src='/static/images/paragraph.png' centered />
                        </p>
                    </Segment>
                    ) : (
                        <div>
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
                                        <HeaderCell>Account</HeaderCell>
                                        <HeaderCell>Name</HeaderCell>
                                        <HeaderCell>Date</HeaderCell>
                                        <HeaderCell>Reward</HeaderCell>
                                        <HeaderCell>Prize (ETH)</HeaderCell>
                                    </Row>
                                </Header>
                                <Body>{this.renderRows()}</Body>
                            </Table>
                            <div style={{float: 'right'}}>Found {this.state.lotteries ? this.state.lotteries.length : 0} Lotteries.</div>
                        </div>
                    )}
            </BaseLayout>
        )
    }
}

export default withAuth()(Transection)