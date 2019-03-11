import React, { Component } from 'react'
import factory from '../ethereum/factory'
import { Card, Button } from 'semantic-ui-react'
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
                header: `period : ${j++}`,
                meta: `period address => ${address}`,
                description: (
                    <Button floated='right'>
                        <Link route={`/${address}`}>
                            <a>Go to Period</a>
                        </Link>
                    </Button>
                ),
                fluid: true
            }
        }).reverse();

        return <Card.Group items={items} />
    }
    
    render() {
        return (
            <App>
                <div>
                    <h3>Periods</h3>

                    {/* admin only */}
                    <Link route="/admin/new">
                    <a>
                        <Button 
                            floated="right"
                            content="Create Period"
                            icon="add circle"
                            primary
                        />
                    </a>
                    </Link>

                    {this.renderPeriod()}
                </div>
            </App>
        )
    }
}

export default PeriodInfo