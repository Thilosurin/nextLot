import React, { Component } from 'react'
import Period from '../ethereum/period';
import factory from '../ethereum/factory'
import web3 from '../ethereum/web3';
import { Card, Button, Segment, Embed } from 'semantic-ui-react'
import { Link } from '../server/routes/routes'
import BaseLayout from '../components/layouts/BaseLayout'

class PeriodInfo extends Component {
    static async getInitialProps() {
        const periods = await factory.methods.getDeployedPeriods().call()

        // const arrDefuseAlarm = periods.map(async address => {
        //     const period = Period(address)
        //     const defuseAlarm = await period.methods.defuseAlarm().call()
        //     console.log(defuseAlarm);
            
        //     // const accounts = await web3.eth.getAccounts()
        //     // const player = accounts[0];
        // }).reverse();
        // console.log(arrDefuseAlarm);

        return { periods }
    }

    renderPeriod() {
        let j = 1;
        const items = this.props.periods.map(address => {
            // const lotteries = await Promise.all(
                // Array(parseInt(lotteriesCount)).fill().map((element, index) => {
                    // return period.methods.lotteries(index).call()
                // })
            // )
            const period = Period(address)
            const defuseAlarm = period.methods.defuseAlarm().call()
            // console.log(defuseAlarm);

            return {
                header: `period : ${j++}`,
                meta: `period address => ${address}`,
                description: (
                    <Button floated='right' inverted color="grey">
                        <Link prefetch route={`/${address}`}>
                            <a>Go to Period</a>
                        </Link>
                    </Button>
                ),
                fluid: true,
                // color: `${defuseAlarm === true ? '' : 'green'}`
            }
        }).reverse();
        return <Card.Group items={items} />
    }
    
    render() {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date().toLocaleString('thai', options);
        const time = new Date().toLocaleTimeString();
        const { admin, user, isAuthenticated } = this.props.auth;
        const nameUndefined = !!user ? user : 'No User!';

        return (
            <BaseLayout {...this.props.auth}>
                {isAuthenticated && user ? (
                <div>
                    <Segment raised color={admin ? 'green' : 'blue'}>
                        <h3>Periods</h3>
                        {admin ? (
                            <Link prefetch route="/admin/period">
                                <a>
                                    <Button 
                                        content="Create Period"
                                        icon="add circle"
                                        floated="right"
                                        positive
                                    />
                                </a>
                            </Link>
                        ) : (
                            <h4>Hi : {nameUndefined.name}!</h4>
                        )}
                        <h5>{time}<br/>{date}</h5>
                    </Segment>

                    {this.renderPeriod()}
                </div>
                ) : (
                    <Embed aspectRatio='4:3' id='ZsQzYjxEVCo' placeholder='../static/images/timeOnly.jpg' source='youtube' />
                )}
            </BaseLayout>
        )
    }
}

export default PeriodInfo