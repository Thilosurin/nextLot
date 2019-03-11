import { Component } from 'react'
import { Button, Table, Form, Message, Input } from 'semantic-ui-react'
import { Link } from '../../routes'
import App from '../../components/App'
import Period from '../../ethereum/period'
import LotteryRow from '../../components/LotteryRow'

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

    onCheck = async () => {
        const { period } = this.props;

        const getCheckReward = await period.methods.getCheckReward().call();
        // console.log(getCheckReward[0]);
        // console.log(getCheckReward[1]);
    }

    //////////////////////////////////////////////////////////
    onSubmit = async (event) => {
        event.preventDefault()

        const { period } = this.props;
        
        this.setState({ loading: true, errorMessage: '' })

        try {
            const accounts = await web3.eth.getAccounts()
            await period.methods.sendReward().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.reward, 'ether')
            })

            Router.replaceRoute(`/admin/${this.props.address}`)
        } catch (err) {
            this.setState({ errorMessage: err.message })
        }

        this.setState({ loading: false, reward: '', show: false })
    }
    /////////////////////////////////////////////////////////////

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
                <Link route={`/${this.props.address}`}>
                    <a>Back</a>
                </Link>
                <h3>Transection</h3>
                {!this.state.show ? (
                    <Link route={`/admin/${this.props.address}/get`}>
                    <a>
                        <Button primary floated="right" style={{ marginBottom: "10px" }}>Add Reward</Button>
                    </a>
                    </Link>
                ) : (
                    <Button primary floated="right" loading={this.state.loading} style={{ marginBottom: "10px" }} >true Reward!</Button>
                )}

                {/* {!!this.state.show ? null : (
                    <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} style={{ float: "right" }}>
                        <Form.Field inline>
                            <Input 
                                label='Value Prize (wei)' 
                                placeholder='2000000000000000' 
                                labelPosition="right"
                                value={this.state.reward}
                                onChange={event => this.setState({ reward: event.target.value })}
                            />

                            <Message error header="Oops!" content={this.state.errorMessage} />
                            <Button color='green' loading={this.state.loading}  style={{ marginBottom: "10px" }}>Send Reward!</Button>
                        </Form.Field>
                    </Form>
                )} */}

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