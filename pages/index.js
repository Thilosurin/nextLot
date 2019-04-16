import React, { Component } from 'react'
import Period from '../ethereum/period';
import factory from '../ethereum/factory'
import { Button, Segment, Embed, Item, Icon, Label, Dimmer, Image, Loader } from 'semantic-ui-react'
import { Link } from '../server/routes/routes'
import BaseLayout from '../components/layouts/BaseLayout'

import { getPeriods } from '../lib/api'

class PeriodInfo extends Component {
    state = {
        periodsDB: [],
        isLoading: true,
    }

    static async getInitialProps() {
        const periods = await factory.methods.getDeployedPeriods().call()

        const periodsInformation = await Promise.all(
            periods.map(address => Period(address).methods.getPeriodInfo().call()))

        return { periods, periodsInformation }
    }

    componentDidMount() {
        getPeriods().then(p => this.setState({ periodsDB: p, isLoading: false }))
    }

    datetime = (pt) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        if (pt) {
            const myDate = new Date(pt)
            return myDate.toLocaleString('thai', options) + ', ' + myDate.toLocaleTimeString()
        }
        return new Date().toLocaleTimeString() + '\n — \n' + new Date().toLocaleString('thai', options)
    }
    
    render() {
        const { periodsDB, isLoading } = this.state;
        const { admin, user, isAuthenticated } = this.props.auth;

        const nameUndefined = !!user ? user : 'No User!';

        return (
            <BaseLayout {...this.props.auth}>
                {isAuthenticated && user ? (
                    <div>
                        {isLoading ? (
                            <Segment>
                                <Dimmer active inverted inline='centered'>
                                    <Loader size='massive'>Loading</Loader>
                                </Dimmer>
                                <p>
                                    <Image src='/static/images/paragraph.png' centered />
                                </p>
                                <p>
                                    <Image src='/static/images/paragraph.png' centered />
                                </p>
                            </Segment>
                        ) : (
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
                                <h5>{this.datetime()}</h5>
                            </Segment>

                            <Item.Group divided >
                            {periodsDB.map(period => {
                                const p = Period(period.prAccount)
                                const defuseAlarm = p.methods.defuseAlarm().call()
                                
                                return (
                                    <Item key={period.prID}>
                                        <Item.Image src='/static/images/ETHEREUM.png' />

                                        <Item.Content>
                                            <Item.Header as='a'>Period Number : {period.prID}</Item.Header>
                                            <Item.Meta>
                                                <span className='cinema'>created in : {this.datetime(period.prCreatedAt)}</span>
                                            </Item.Meta>
                                            <Item.Description>
                                                <br/>
                                                period address : {period.prAccount}
                                                <br/>
                                                creator address : {period.prAddressCreator}
                                            </Item.Description>
                                            <Item.Extra>
                                                <Button floated='right'>
                                                    <Link prefetch route={`/${period.prAccount}`}>
                                                        <a>Go to Period</a>
                                                    </Link>
                                                    <Icon name='right chevron' />
                                                </Button>
                                                <Label color={defuseAlarm ? 'green' : 'black'}>{defuseAlarm ? 'OPEN' : 'CLOSED'}</Label>
                                                <Label icon='time' content={`closed in : ${this.datetime(period.prClosingTime)}`} />
                                            </Item.Extra>
                                        </Item.Content>
                                    </Item>
                                )
                            }).reverse()}
                            </Item.Group>
                        </div>
                        )}
                </div>
                ) : (
                    <Embed aspectRatio='4:3' id='ZsQzYjxEVCo' placeholder='../static/images/timeOnly.jpg' source='youtube' />
                )}
            </BaseLayout>
        )
    }
}

export default PeriodInfo