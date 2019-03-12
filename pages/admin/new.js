import { Component } from 'react'
import PropTypes from 'prop-types';
import { Form, Input, Button, Message } from 'semantic-ui-react'
import App from '../../components/App'
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'
import { Link, Router } from '../../routes'

class AdminNewPeriod extends Component {
    // static 
    
    state = {
        priceLottery: '',
        lotteryPerNum: '',
        closingTime: '',
        errorMessage: '',
        loading: false
    }

    onSubmit = async (event) => {
        event.preventDefault()

        this.setState({ loading: true, errorMessage: '' })

        try {
            const accounts = await web3.eth.getAccounts();

            await factory.methods
                .createPeriod(
                    web3.utils.toWei(this.state.priceLottery, 'ether'), 
                    this.state.lotteryPerNum, 
                    this.state.closingTime)
                .send({ from: accounts[0] })
            
            Router.pushRoute('/')
            
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
            <App>
                <Link prefetch route={'/'}>
                    <a>Back</a>
                </Link>
                <h3>Create a Period!</h3>
                
                <Form onSubmit={this.onSubmit} error={!!errorMessage}>
                    <Form.Group widths='equal'>
                        <Form.Input fluid 
                            label='Price Lottery (ether)' 
                            placeholder='0.001'
                            value={priceLottery}
                            error={isNaN(priceLottery)}
                            onChange={event => this.setState({ priceLottery: event.target.value })} />
                
                        <Form.Input fluid 
                            label='Amount Lottery / Number' 
                            placeholder='2' 
                            value={lotteryPerNum}
                            error={isNaN(lotteryPerNum)}
                            onChange={event => this.setState({ lotteryPerNum: event.target.value })} />

                        <Form.Input fluid 
                            label='Time Out (sec)' 
                            placeholder='1552115292' 
                            value={closingTime}
                            error={isNaN(closingTime)}
                            onChange={event => this.setState({ closingTime: event.target.value })} />
                    </Form.Group>

                    <Message error header="Oops!" content={errorMessage} />
                    <Button loading={loading} floated="right" disabled={isEnabled} primary>Create!</Button>
                </Form>
            </App>
        )
    }
}

AdminNewPeriod.propTypes = {
    priceLottery: PropTypes.number,
    lotteryPerNum: PropTypes.number,
    closingTime: PropTypes.number,
};

export default AdminNewPeriod