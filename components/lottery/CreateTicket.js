import { Component } from 'react'
import { Form, Input, Message, Button, Card } from 'semantic-ui-react'
import Period from '../../ethereum/period'
import web3 from '../../ethereum/web3'
import { Router } from '../../server/routes/routes'
// import Router from "next/router";

import { insertAccountUser, updateUser } from '../../lib/api'

class CreateTicket extends Component {
    state = {
        value: '',
        errorMessage: '',
        loading: false,
    }

    // componentDidMount() {
        // this.insertAccount()
    // }

    onSubmit = async (event) => {
        event.preventDefault()
        const { address, user } = this.props;

        const period = Period(address)

        // this.setState({ loading: true, errorMessage: '' })

        // try {
            // const getPeriodInfo = await period.methods.getPeriodInfo().call()
            const accounts = await web3.eth.getAccounts()
            // await period.methods.createLottery(this.state.value).send({
            //     from: accounts[0],
            //     value: getPeriodInfo[1]
            // })
            
            
            
//// Insert Account : ether to mongo ////
            // this.insertAccount()

            // const validAcc = user.account === undefined ? true 
                                // : !user.account.includes(accounts[0])
            
            // if (validAcc) {
                // user.account.push(accounts[0]);
                // insertAccountUser(user).catch(this.showError)
            // } else {
                // console.log('It\'s duplicate');
                // console.log(user.account.includes(accounts[0]));
            // }
// setTimeout(() => Router.push(`/${address}`), 1000)

            // Router.replaceRoute(`/${address}`)

        // } catch (err) {
        //     this.setState({ errorMessage: err.message })
        // }

        this.setState({ loading: false, value: '' })
    }

    // insertAccount = async () => {
        // const { user } = this.props;
        // const accounts = await web3.eth.getAccounts()

        // console.log(user.account);

        // const validAcc = user.account === undefined 
                            // ? true : !user.account.includes(accounts[0])
            
        // if (validAcc) {
            // user.account.push(accounts[0]);
            // insertAccountUser(user).catch(this.showError)
        // } else {
            // console.log('It\'s duplicatedddddd');
            // console.log(user.account.includes(accounts[0]));
        // }
    // }

    render() {
        const { errorMessage, value, loading } = this.state;
        const { defuseAlarm } = this.props;
        const isEnabled = value.length === 6 && !isNaN(value) && !defuseAlarm ? false : true;

        return (
            <div>
                <Form onSubmit={this.onSubmit} error={!!errorMessage}>
                    <Form.Field>
                        <label>Input Your Ticket Number</label>
                        <Input 
                            label="6 digits" 
                            labelPosition="right"
                            value={value}
                            disabled={defuseAlarm}
                            error={isEnabled}
                            onChange={event => this.setState({ value: event.target.value })}
                        />
                    </Form.Field>
    
                    <Message error header="Oops!" content={errorMessage} />
                    <Button primary floated="right" disabled={isEnabled} loading={loading}>
                        Create!
                    </Button>
                </Form>
            </div>

        )        
    }
}

export default CreateTicket