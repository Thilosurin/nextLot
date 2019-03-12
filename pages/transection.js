import { Component } from 'react'
import { Button, Table, Form, Message, Input } from 'semantic-ui-react'
import { Link } from '../routes'
import App from '../components/App'
import Period from '../ethereum/period'
import LotteryRow from '../components/LotteryRow'

class Transection extends Component {
    state = {
        reward: '',
        loading: false,
        errorMessage: '',
        show: false
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
        // console.log(lotteries);

        return { address, lotteries, lotteriesCount, period }
    }

    renderRows() {
        return this.props.lotteries.map((lottery, index) => {
            return <LotteryRow 
                key={index}
                no={index}
                lottery={lottery}
            />
        })
    }
    
    render() {
        const { Header, Row, HeaderCell, Body } = Table

        return (
            <App>
                <Link prefetch route={`/${this.props.address}`}>
                    <a>Back</a>
                </Link>
                <h3>Transection</h3>
                {!this.state.show ? (
                    <Link prefetch route={`/admin/${this.props.address}/get`}>
                    <a>
                        <Button primary floated="right" style={{ marginBottom: "10px" }}>Add Reward</Button>
                    </a>
                    </Link>
                ) : (
                    <Button primary floated="right" loading={this.state.loading} style={{ marginBottom: "10px" }} >true Reward!</Button>
                )}

                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>No.</HeaderCell>
                            <HeaderCell>Player</HeaderCell>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>LotteryNumber</HeaderCell>
                            <HeaderCell>Reward</HeaderCell>
                            <HeaderCell>Prize (ETH)</HeaderCell>
                        </Row>
                    </Header>
                    <Body>{this.renderRows()}</Body>
                </Table>
                <div>Found {this.props.lotteriesCount} Lotteries.</div>
            </App>
        )
    }
}

export default Transection