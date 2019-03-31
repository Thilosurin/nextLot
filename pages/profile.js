import { Component } from 'react'
import { Grid, Card, Icon, Image, Segment, Button, Statistic, Divider, Table, Dimmer, Loader } from 'semantic-ui-react'

import { Link } from '../server/routes/routes'
import BaseLayout from '../components/layouts/BaseLayout'
import DeleteUser from '../components/admin/DeleteUser'
import format from "date-fns/format"
import ProfileRow from '../components/tabbar/ProfileRow'
import { getUser } from '../lib/api'
import withAuth from '../components/hoc/withAuth'

class Profile extends Component {
    state = {
        userState: null,
        isAuth: false,
        isLoading: true,
    }

    componentDidMount() {
        const { user, router } = this.props.auth;
        
        getUser(router.query.userId).then(async userState => {
            const isAuth = router.query.userId === user._id;
            
            this.setState({
                userState,
                isAuth,
                isLoading: false
            });
        });
    }

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
        const { isLoading, userState, isAuth } = this.state;
        const { user } = this.props.auth;
        const { Header, Body, Row, HeaderCell } = Table;
        
        return(
            <BaseLayout {...this.props.auth}>
                <Link prefetch route={`/`}>
                    <a>Back</a>
                </Link>
                <h3>Profile</h3>
                <Grid>
                {isLoading ? (
                    <Grid.Column width={16}>
                        <Dimmer active inverted inline='centered'>
                            <Loader size='massive'>Loading</Loader>
                        </Dimmer>
                        <Image src='/images/wireframe/paragraph.png' />
                    </Grid.Column>
                ) : (
                    <Grid.Row>
                        <Grid.Column width={6}>
                        {isAuth ? (
                            <div>
                                <Button basic>
                                    <Icon name='user' /> Edit profile
                                </Button>
                                <div style={{ float: 'right', margin: '0 8rem 1rem 0' }}>
                                    <DeleteUser user={user}/>
                                </div>
                            </div>
                        ) : (
                            <Segment style={{width: '72%', textAlign: 'center'}}>
                                <h3>Hello : &nbsp;
                                    <strong style={{color: 'teal'}}>{user.name}</strong>
                                <br/>welcome to my profile
                                </h3>
                            </Segment>
                        )}
                            <Card style={{wordWrap: 'break-word'}}>
                                <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
                                <Card.Content>
                                <Card.Header>{userState.name}</Card.Header>
                                <Card.Meta>
                                    <span className='date'>Joined in {this.formatDate(userState.createdAt)}</span>
                                </Card.Meta>
                                <Card.Description>
                                    Account : <strong style={{color: 'green'}}>{userState.account.length === 0 
                                        ? 'No Account' 
                                        : userState.account.map((user, i) => 
                                            user[i] = userState.account[i]["accAddress"] + '\n')
                                    }</strong>

                                    {/* {JSON.stringify(userState.account[0]["accAddress"]} */}
                                </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                <a>
                                    <Icon name='mail' />
                                    {userState.email}
                                </a>
                                </Card.Content>
                            </Card>
                        </Grid.Column>

                        <Grid.Column width={10}>
                            <Segment piled>
                                <Statistic.Group widths='four' color="grey">
                                    <Statistic>
                                        <Statistic.Value>22</Statistic.Value>
                                        <Statistic.Label>ETH</Statistic.Label>
                                    </Statistic>

                                    <Statistic>
                                        <Statistic.Value>4</Statistic.Value>
                                        <Statistic.Label>Period</Statistic.Label>
                                    </Statistic>

                                    <Statistic>
                                        <Statistic.Value>
                                            {/* <Icon name='ticket' /> */}
                                            5
                                        </Statistic.Value>
                                        <Statistic.Label>
                                            Ticket
                                        </Statistic.Label>
                                    </Statistic>

                                    <Statistic>
                                        <Statistic.Value>
                                            {/* <Image src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' className='circular inline' /> */}
                                            {/* <Icon name='star' /> */}
                                            0
                                        </Statistic.Value>
                                        <Statistic.Label>
                                            Reward Prize(ETH)
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
                )}
                </Grid>
            </BaseLayout>
        )
    }
}

export default  withAuth()(Profile)