import { Component } from 'react'
import { Form, Input, Message, Button, Card } from 'semantic-ui-react'
import Period from '../../ethereum/period'
import web3 from '../../ethereum/web3'
import { Router } from '../../server/routes/routes'

import { insertAccountUser, updateUser } from '../../lib/api'

class CreateTicket extends Component {
    state = {
        value: '',
        errorMessage: '',
        loading: false,
    }

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
            
            Router.replaceRoute(`/${address}`)

            //// Insert Account : ether to mongo ////
            const validAcc = user.account.length > 0 
                ? user.account.find((acc, i) => acc === undefined ? undefined : Object.values(acc[i]))
                : undefined
                
            console.log(validAcc);
            // console.log(user.account.length!==0 ? Object.values(user.account[0]) : user.account);

            if (validAcc === undefined) {
                user.account.push(accounts[0]);

                insertAccountUser(user).catch(this.showError)
            } else {
                console.log('It\'s duplicate');
            }
            console.log(user);
            

        // } catch (err) {
        //     this.setState({ errorMessage: err.message })
        // }

        this.setState({ loading: false, value: '' })
    }

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