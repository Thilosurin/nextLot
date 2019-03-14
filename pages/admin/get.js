import { Component } from 'react'
import { Form, Button, Message, Input } from 'semantic-ui-react'
import Period from '../../ethereum/period'
import web3 from '../../ethereum/web3'
import { Link, Router } from '../../routes'
import BaseLayout from '../../components/layouts/BaseLayout'

import withAuth from '../../components/hoc/withAuth';

class GetReward extends Component {
    state = {
        prizeNumber: '',
        prizeReward: '',
        loading: false,
        errorMessage: '',
        reward: '',
        getPlayer: '',
        getPrize: '',
        total: '',
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
        console.log(getCheckReward);
        getCheckReward === '' ? 0 : this.setState({ show: !this.state.show, getPlayer: getCheckReward[1], getPrize: getCheckReward[0] })
        
        // console.log(getCheckReward[0], getCheckReward[1]);

        this.setState({ loading: false, total: (this.state.getPlayer * this.state.getPrize) })
    }

    onSendHandler = async event => {
        event.preventDefault()

        const period = Period(this.props.address)
        const accounts = await web3.eth.getAccounts();

        try {
            await period.methods.sendReward().send({
                value: web3.utils.toWei(this.state.reward, 'ether'),
                from: accounts[0]
            })

            Router.pushRoute(`/${this.props.address}/transection`)
        } catch (err) {
            this.setState({ errorMessage: err.message })
        }
        this.setState({ prizeNumber: '', prizeReward: '', loading: false, errorMessage: '', reward: '', getPlayer: '',getPrize: '', total: '', show: true })
    }
    
    render() {
        const { errorMessage, prizeNumber, prizeReward, loading, show, getPlayer, getPrize, total } = this.state;

        const isEnabled = !isNaN(prizeNumber) && prizeNumber !== '' && prizeNumber.length === 6
        && !isNaN(prizeReward) && prizeReward !== '' && this.state.show ? false : true;

        return (
            <BaseLayout {...this.props.auth}>
                <Link prefetch route={`/${this.props.address}/transection`}>
                    <a>Back</a>
                </Link>
                <h3>Reward!</h3>
                <Form onSubmit={this.onSubmit} error={!!errorMessage}>
                    <Form.Group widths='equal'>
                        <Form.Input fluid 
                            label='Number Lottery Reward' 
                            placeholder='000000'
                            value={prizeNumber}
                            error={isNaN(prizeNumber)}
                            onChange={event => this.setState({ prizeNumber: event.target.value })}
                        />

                        <Form.Input fluid 
                            label='Value Prize (ether)' 
                            placeholder='0.001' 
                            value={prizeReward}
                            error={isNaN(prizeReward)}
                            onChange={event => this.setState({ prizeReward: event.target.value })}
                        />
                    </Form.Group>

                    <Message error header="Oops!" content={errorMessage} />
                    <Button primary loading={loading} disabled={isEnabled} floated="right">Add Reward!</Button>
                </Form>
                <br/><br/><br/>

                
                {!!show ? null : (
                    <div>
                        <Message success header="Reward Infomation!" 
                                list={[
                                    `player win : ${getPlayer} player`, `value prize : ${web3.utils.fromWei((getPrize).toString(), 'ether')} ether` ]}
                        />
                        <Message success header={`You must send reward :  ${web3.utils.fromWei((total).toString(), 'ether')} ether`} />
                        <Form onSubmit={this.onSendHandler} error={!!errorMessage} style={{ float: "right" }} >
                            <Form.Field inline>
                                <Input  
                                    label='ETH'
                                    placeholder='total value prize' 
                                    labelPosition="right"
                                    onChange={event => this.setState({ reward: event.target.value })}
                                />

                                <Message error header="Oops!" content={errorMessage} />
                                <Button color='green' loading={loading}  style={{ marginBottom: "10px" }}>Send Reward!</Button>
                            </Form.Field>
                        </Form>
                    </div>
                )}
            </BaseLayout>
        )
    }
}

export default withAuth()(GetReward)