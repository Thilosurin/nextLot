import { Component } from 'react'
import { Form, Button, Message, Input } from 'semantic-ui-react'
import Period from '../../ethereum/period'
import web3 from '../../ethereum/web3'
import { Link, Router } from '../../routes'
import App from '../../components/App'

class GetReward extends Component {
    state = {
        prizeNumber: '',
        prizeReward: '',
        loading: false,
        errorMessage: '',
        reward: '',
        getCheckReward: '',
        show: true
    }

    static async getInitialProps(props) {
        const { address } = props.query;

        return { address }
    }

    onSubmit = async event => {
        event.preventDefault()

        const period = Period(this.props.address)
        const { prizeReward, prizeNumber } = this.state

        this.setState({ loading: true, errorMessage: '' })

        try {
            const accounts = await web3.eth.getAccounts();
            await period.methods.checkReward(
                prizeNumber,
                web3.utils.toWei(prizeReward, 'ether')
            ).send({ from: accounts[0] })

            // Router.pushRoute(`/admin/${this.props.address}`)
        } catch (err) {
            this.setState({ errorMessage: err.message })
        }

        const getCheckReward = await period.methods.getCheckReward().call();
        getCheckReward === '' ? null : this.setState({ getCheckReward: getCheckReward, show: !this.state.show })
        // console.log(getCheckReward[0], getCheckReward[1]);

        this.setState({ loading: false })
    }

    // onShow = async () => {
    //     this.setState({ show: !this.state.show })

    //     const getCheckReward = await period.methods.getCheckReward().call();
    //     console.log(getCheckReward[0]);
    //     console.log(getCheckReward[1]);

    //     this.setState({ getCheckReward: getCheckReward });
    // }

    onSendHandler = async () => {

    }
    
    render() {
        const { errorMessage, prizeNumber, prizeReward, loading, show, getCheckReward, reward } = this.state;
        const getPlayer = parseInt(getCheckReward[1]);
        const getPrize = parseInt(getCheckReward[0]);
        // const getPrizeReward = web3.utils.toWei(getPrize, 'ether');

        return (
            <App>
                <Link route={`/admin/${this.props.address}`}>
                    <a>Back</a>
                </Link>
                <h3>Add Reward Number</h3>
                <Form onSubmit={this.onSubmit} error={!!errorMessage}>
                    <Form.Group widths='equal'>
                        <Form.Input fluid 
                            label='Number Lottery Reward' 
                            placeholder='000000'
                            value={prizeNumber}
                            onChange={event => this.setState({ prizeNumber: event.target.value })}
                        />

                        <Form.Input fluid 
                            label='Value Prize (ether)' 
                            placeholder='0.001' 
                            value={prizeReward}
                            onChange={event => this.setState({ prizeReward: event.target.value })}
                        />
                    </Form.Group>

                    <Message error header="Oops!" content={errorMessage} />
                    <Button primary loading={loading} floated="right">Add Reward!</Button>
                </Form>

                {/* <Button primary loading={loading} floated="right" onClick={this.onShow}>Test Button</Button> */}
                <br/><br/><br/>

                
                {!!show ? null : (
                    <div>
                        <Message success header="Reward Infomation!" 
                                list={[
                                    `player win : ${getPlayer} player`, `value prize : ${getPrize} wei` ]}
                        />
                        <Message success header={`You must send reward : ${getPlayer * getPrize} wei`} />
                        <Form onSubmit={this.onSendHandler} error={!!errorMessage} style={{ float: "right" }} >
                            <Form.Field inline>
                                <Input  
                                    label='Value Prize (ether)'
                                    placeholder='2000000000000000' 
                                    labelPosition="right"
                                    value={reward}
                                    onChange={event => this.setState({ reward: event.target.value })}
                                />

                                <Message error header="Oops!" content={errorMessage} />
                                <Button color='green' loading={loading}  style={{ marginBottom: "10px" }}>Send Reward!</Button>
                            </Form.Field>
                        </Form>
                    </div>
                )}
            </App>
        )
    }
}

export default GetReward