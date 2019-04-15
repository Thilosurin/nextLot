import { Component } from 'react'
import { Form, Button, Message, Input } from 'semantic-ui-react'
import Period from '../../ethereum/period'
import web3 from '../../ethereum/web3'
import { Link, Router } from '../../server/routes/routes'
import BaseLayout from '../../components/layouts/BaseLayout'

import { createReward, getTicketsByPeriod, createMessages } from '../../lib/api'
import withAuth from '../../components/hoc/withAuth';

class GetReward extends Component {
    state = {
        prizeNumber: 477477,
        prizeReward: '',
        nameReward: '',
        loading: false,
        errorMessage: '',
        reward: '',
        getPlayer: 0,
        getPrize: 0,
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
        const { prizeReward, prizeNumber, nameReward, getPlayer, getPrize } = this.state

        this.setState({ loading: true, errorMessage: '' })

        try {
            const accounts = await web3.eth.getAccounts();
            await period.methods.checkReward(
                prizeNumber,
                web3.utils.toWei(prizeReward, 'ether')
            ).send({ from: accounts[0] })

        } catch (err) {
            this.setState({ errorMessage: err.message })
        }

        const getCheckReward = await period.methods.getCheckReward().call();
        console.log(getCheckReward);
        getCheckReward === '' ? 0 : this.setState({ show: !this.state.show, getPlayer: getCheckReward[1], getPrize: getCheckReward[0] })

        const arr = [{prizeNumber, nameReward, prizeReward, getPlayer, getPrize}]
        createReward(this.props.address, arr)
        
        // console.log(getCheckReward[0], getCheckReward[1]);

        this.setState({ loading: false, total: (this.state.getPlayer * this.state.getPrize) })
    }

    onSendHandler = async event => {
        event.preventDefault()

        const period = Period(this.props.address)
        const accounts = await web3.eth.getAccounts();

        this.setState({ loading: true, errorMessage: '' })

        // try {
        //     await period.methods.sendReward().send({
        //         value: web3.utils.toWei(this.state.reward, 'ether'),
        //         from: accounts[0]
        //     })

            // Add Message
            const messages = `Congratulations, you are rewarded from \n Lottery Number: ${this.state.prizeNumber} \n Reward Prize: ${this.state.prizeReward} \n period address : ${this.props.address}`
            getTicketsByPeriod(this.props.address)
                .then(lotteries => lotteries.filter(l => l.tkNumber === this.state.prizeNumber))
                .then((lwin) => lwin.map(() => lwin.pop().tkPlayerBuy[0]._id))
                .then((pId) => pId.filter(id => createMessages(id, {messages})))

        //     this.setState({ prizeNumber: '', prizeReward: '', loading: false, errorMessage: '', reward: '', getPlayer: 0,getPrize: 0, total: '', show: true })
       
        //     Router.pushRoute(`/${this.props.address}/transection`)
        // } catch (err) {
        //     this.setState({ errorMessage: err.message })
        // }
    }
    
    render() {
        const { errorMessage, prizeNumber, nameReward, prizeReward, loading, show, getPlayer, getPrize, total } = this.state;

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
                            label='Name Reward' 
                            placeholder='prize number one' 
                            value={nameReward}
                            onChange={event => this.setState({ nameReward: event.target.value })}
                        />

                        <Form.Input fluid 
                            label='Value Prize (ether)' 
                            placeholder='1' 
                            value={prizeReward}
                            error={isNaN(prizeReward)}
                            onChange={event => this.setState({ prizeReward: event.target.value })}
                        />
                    </Form.Group>

                    <Message error header="Oops!" content={errorMessage} />
                    <Button primary loading={loading} disabled={isEnabled} floated="right">Add Reward!</Button>
                </Form>
                <br/><br/><br/>

                
                {!show ? null : (
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