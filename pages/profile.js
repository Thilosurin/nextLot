import { Component } from 'react'
import { Grid, Card, Icon, Image, Segment, Button, Statistic, Divider, Table } from 'semantic-ui-react'

import { Link } from '../server/routes/routes'
import BaseLayout from '../components/layouts/BaseLayout'
import DeleteUser from '../components/admin/DeleteUser'
import format from "date-fns/format"

import ProfileRow from '../components/sidebar/ProfileRow'
import withAuth from '../components/hoc/withAuth'

class ProfileAdmin extends Component {

    // renderRows() {
    //     return ticket.map((user, index) => {
    //         return <ProfileRow 
    //             key={index}
    //             user={user}
    //         />
    //     })
    // }
    
    formatDate = date => format(date, "dddd, MMMM Do, YYYY");
    
    render() {
        const { admin, user } = this.props.auth;
        const { Header, Body, Row, HeaderCell } = Table;
        console.log(user);
        
        return(
            <BaseLayout {...this.props.auth}>
                <Link prefetch route={`/`}>
                    <a>Back</a>
                </Link>
                    <h3>Profile</h3>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={6}>
                                <Button basic>
                                    <Icon name='user' /> Edit profile
                                </Button>
                                <div style={{ float: 'right', margin: '0 8rem 1rem 0' }}>
                                    <DeleteUser user={user}/>
                                </div>
                                <Card>
                                    <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
                                    <Card.Content>
                                    <Card.Header>{user.name}</Card.Header>
                                    <Card.Meta>
                                        <span className='date'>Joined in {this.formatDate(user.createdAt)}</span>
                                    </Card.Meta>
                                    <Card.Description>{user.account}</Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                    <a>
                                        <Icon name='mail' />
                                        {user.email}
                                    </a>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>

                            <Grid.Column width={10}>
                                <Segment piled>
                                    <Statistic.Group widths='four'>
                                        <Statistic>
                                            <Statistic.Value>22</Statistic.Value>
                                            <Statistic.Label>Saves</Statistic.Label>
                                        </Statistic>

                                        <Statistic>
                                            <Statistic.Value text>
                                                Three
                                                <br />Thousand
                                            </Statistic.Value>
                                            <Statistic.Label>
                                                Signups
                                            </Statistic.Label>
                                        </Statistic>

                                        <Statistic>
                                            <Statistic.Value>
                                                <Icon name='plane' />
                                                5
                                            </Statistic.Value>
                                            <Statistic.Label>
                                                Flights
                                            </Statistic.Label>
                                        </Statistic>

                                        <Statistic>
                                            <Statistic.Value>
                                                <Image src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' className='circular inline' />
                                                42
                                            </Statistic.Value>
                                            <Statistic.Label>
                                                Team Members
                                            </Statistic.Label>
                                        </Statistic>
                                    </Statistic.Group>

                                    <Divider />

                                    <Table>
                                        <Header>
                                            <Row>
                                                <HeaderCell>No.</HeaderCell>
                                                <HeaderCell>LotteryNumber</HeaderCell>
                                                <HeaderCell>Period</HeaderCell>
                                                <HeaderCell>Reward</HeaderCell>
                                                <HeaderCell>Prize (ETH)</HeaderCell>
                                            </Row>
                                        </Header>
                                        {/* <Body>{this.renderRows()}</Body> */}
                                        <Body><ProfileRow /></Body>
                                    </Table>
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

            </BaseLayout>
        )
    }
}

export default  withAuth()(ProfileAdmin)