import { Component } from 'react'
import { Form, Button, Message } from 'semantic-ui-react'
import BaseLayout from '../../components/layouts/BaseLayout'
import factory from '../../ethereum/factory'
import Period from '../../ethereum/period'
import web3 from '../../ethereum/web3'
import { Link, Router } from '../../server/routes/routes'

import withAuth from '../../components/hoc/withAuth';
import { createPeriod } from '../../lib/api'

class AdminNewPeriod extends Component {
    state = {
        priceLottery: '',
        lotteryPerNum: '',
        closingTime: '',
        errorMessage: '',
        loading: false,
    }

    onSubmit = async (event) => {
        event.preventDefault()

        this.setState({ loading: true, errorMessage: '' })

        try {
            const accounts = await web3.eth.getAccounts();

            const newPeriod = await factory.methods
                .createPeriod(
                    web3.utils.toWei(this.state.priceLottery, 'ether'), 
                    this.state.lotteryPerNum, 
                    this.state.closingTime)
                .send({ from: accounts[0] })
            
            if (newPeriod) {
                const periodId = await factory.methods.getDeployedPeriods().call()
                    .then(prs => prs[prs.length-1])
                const period = Period(periodId)
                const periodInfo = await period.methods.getPeriodInfo().call()
                periodInfo.address = periodId
                
                createPeriod(periodInfo)
                    .then(() => Router.pushRoute('/'))
                    .catch(this.showError)
            }
            
        } catch (err) {
            this.setState({ errorMessage: err.message })
        }

        this.setState({ loading: false })
    }

    render() {
        const { errorMessage, loading, priceLottery, lotteryPerNum, closingTime } = this.state;
       
        const isEnabled = !isNaN(priceLottery) && priceLottery !== ''
                            && !isNaN(lotteryPerNum) && lotteryPerNum !== '' 
                            && !isNaN(closingTime) && closingTime !== '' 
                            && closingTime.length === 10 ? false : true;

        return (
            <BaseLayout {...this.props.auth}>
                <Link prefetch route={'/'}>
                    <a>Back</a>
                </Link>

                <h3>Create a Period!</h3>   
                <Form onSubmit={this.onSubmit} error={!!errorMessage}>
                    <Form.Group widths='equal'>
                        <Form.Input fluid 
                            label='Price Lottery (ETH)' 
                            placeholder='0.001'
                            value={priceLottery}
                            error={isNaN(priceLottery)}
                            onChange={event => this.setState({ priceLottery: event.target.value })} 
                        />
                
                        <Form.Input fluid 
                            label='Amount Lottery / Number' 
                            placeholder='2' 
                            value={lotteryPerNum}
                            error={isNaN(lotteryPerNum)}
                            onChange={event => this.setState({ lotteryPerNum: event.target.value })} 
                        />

                        <Form.Input fluid 
                            label='Time Out (sec)' 
                            placeholder='1552115292' 
                            value={closingTime}
                            error={isNaN(closingTime)}
                            onChange={event => this.setState({ closingTime: event.target.value })} 
                        />
                    </Form.Group>

                    <Message error header="Oops!" content={errorMessage} />
                    <Button loading={loading} floated="right" disabled={isEnabled} primary>Create!</Button>
                </Form>
            </BaseLayout>
        )
    }
}

export default withAuth()(AdminNewPeriod)