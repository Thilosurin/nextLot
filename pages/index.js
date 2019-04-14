import React, { Component } from 'react'
import Period from '../ethereum/period';
import factory from '../ethereum/factory'
import web3 from '../ethereum/web3';
import { Card, Button, Segment, Embed, Item, Image, Icon, Label } from 'semantic-ui-react'
import { Link } from '../server/routes/routes'
import BaseLayout from '../components/layouts/BaseLayout'

class PeriodInfo extends Component {
    static async getInitialProps() {
        const periods = await factory.methods.getDeployedPeriods().call()

        const periodsInformation = await Promise.all(
            periods.map(address => Period(address).methods.getPeriodInfo().call()))

        return { periods, periodsInformation }
    }
    
    renderPeriod() {
        let j = 1;

        const items = this.props.periods.map((address, index) => {
            // console.log(this.props.periodsInformation[index]);

            return (
                <Item key={index}>
                    <Item.Image src='/static/images/profile-image.jpg' />

                    <Item.Content>
                        <Item.Header as='a'>12 Years a Slave</Item.Header>
                        <Item.Meta>
                        <span className='cinema'>Union Square 14</span>
                        </Item.Meta>
                        <Item.Description>{paragraph}</Item.Description>
                        <Item.Extra>
                        <Label>IMAX</Label>
                        <Label icon='globe' content='Additional Languages' />
                        </Item.Extra>
                    </Item.Content>
                </Item>
            )
        }).reverse();
        return <Item.Group divided items={items} />

        //     return {
        //         header: `period : ${j++}`,
        //         meta: `period address => ${address}`,
        //         description: (
        //             <Button floated='right' inverted color="grey">
        //                 <Link prefetch route={`/${address}`}>
        //                     <a>Go to Period</a>
        //                 </Link>
        //             </Button>
        //         ),
        //         fluid: true,
        //     }
        // }).reverse();
        // return <Card.Group items={items} />
    }
    
    render() {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date().toLocaleString('thai', options);
        const time = new Date().toLocaleTimeString();
        const { admin, user, isAuthenticated } = this.props.auth;
        const nameUndefined = !!user ? user : 'No User!';

        // const paragraph = <Image src='/static/images/paragraph.png' />

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

                    {/* {this.renderPeriod()} */}

                    <Item.Group divided >
                    {this.props.periods.map((address, index) => {
                        return (
                            <Item>
                                <Item.Image src='/static/images/ETHEREUM.png' />

                                <Item.Content>
                                    <Item.Header as='a'>Period Number : {index+1}</Item.Header>
                                    <Item.Meta>
                                        <span className='cinema'>created in : 04/04/2562</span>
                                    </Item.Meta>
                                    {/* <Item.Description>{paragraph}</Item.Description> */}
                                    <Item.Description>
                                        <br/>
                                        period address : 516584515151213212
                                    </Item.Description>
                                    <Item.Extra>
                                        <Button floated='right'>
                                            <Link prefetch route={`/${address}`}>
                                                <a>Go to Period</a>
                                            </Link>
                                            <Icon name='right chevron' />
                                        </Button>
                                        <Label color='green'>OPEN</Label>
                                        <Label icon='time' content='closed in : 20/04/2562' />
                                    </Item.Extra>
                                </Item.Content>
                            </Item>
                        )
                    }).reverse()}
                    </Item.Group>
                </div>
                ) : (
                    <Embed aspectRatio='4:3' id='ZsQzYjxEVCo' placeholder='../static/images/timeOnly.jpg' source='youtube' />
                )}
            </BaseLayout>
        )
    }
}

export default PeriodInfo