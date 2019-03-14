import React, { Component } from 'react'
import factory from '../ethereum/factory'
import { Card, Button, Segment } from 'semantic-ui-react'
import { Link } from '../routes'
import BaseLayout from '../components/layouts/BaseLayout'

class PeriodInfo extends Component {
    static async getInitialProps() {
        const periods = await factory.methods.getDeployedPeriods().call()

        return { periods }
    }

    renderPeriod() {
        // let i = this.props.periods.length;
        let j = 1;
        const items = this.props.periods.map(address => {
            return {
                link: 'http://localhost:3000/${address}',
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
            }
        }).reverse();
        return <Card.Group items={items} />
    }
    
    render() {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date().toLocaleString('thai', options);
        const time = new Date().toLocaleTimeString();
        const { admin, user } = this.props.auth;
        const nameUndefined = !!user ? user : 'No User!';

        return (
            <BaseLayout {...this.props.auth}>
                <div>
                    <Segment raised color={admin ? 'green' : 'blue'}>
                        <h3>Periods</h3>
                        {admin ? (
                            <Link prefetch route="/admin/new">
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
            </BaseLayout>
        )
    }
}

export default PeriodInfo