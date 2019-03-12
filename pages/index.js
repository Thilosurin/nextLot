import React, { Component } from 'react'
import factory from '../ethereum/factory'
import { Card, Button, Segment } from 'semantic-ui-react'
import App from '../components/App'
import { Link } from '../routes'

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
                    <Button floated='right' inverted color='black'>
                        <Link route={`/${address}`}>
                            <a>Go to Period</a>
                        </Link>
                    </Button>
                ),
                fluid: true,
                // href: `/${address}`
            }
        }).reverse();

        return <Card.Group items={items} />
    }
    
    render() {
        const date = new Date().toLocaleString();
        const admin = true;

        return (
            <App>
                <div>
                    <Segment raised color={admin ? 'green' : 'blue'}>
                        <h3>Periods</h3>
                        <h5>{date}</h5>

                        {admin ? (
                            <Link route="/admin/new">
                                <a>
                                    <Button 
                                        content="Create Period"
                                        icon="add circle"
                                        positive
                                    />
                                </a>
                            </Link>
                        ) : (
                            <h5>Hi : user!</h5>
                        )}
                    </Segment>
                    

                    {/* admin only */}
                    {/* <Link route="/admin/new">
                    <a>
                        <Button 
                            floated="right"
                            content="Create Period"
                            icon="add circle"
                            primary
                        />
                    </a>
                    </Link> */}

                    {this.renderPeriod()}
                </div>
            </App>
        )
    }
}

export default PeriodInfo