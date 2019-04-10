import { Component } from 'react'
import { Grid, Card, Icon, Image, Segment, Button, Statistic, Divider, Table, Dimmer, Loader } from 'semantic-ui-react'

import { Link } from '../server/routes/routes'
import BaseLayout from '../components/layouts/BaseLayout'
import DeleteUser from '../components/admin/DeleteUser'
import format from "date-fns/format"
import ProfileRow from '../components/tabbar/ProfileRow'
import { getUser, getTicketsByUser } from '../lib/api'
import withAuth from '../components/hoc/withAuth'

class Profile extends Component {
    state = {
        userState: [],
        tickets: [],
        isAuth: false,
        isLoading: true,
    }

    componentDidMount() {
        const { user, router } = this.props.auth;

        getTicketsByUser(router.query.userId)
            .then((tickets) => this.setState({ tickets }))
        
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

    renderRows() {
        const { tickets } = this.state;

        return tickets.map((ticket, index) => {
            return <ProfileRow 
                key={index}
                index={index}
                ticket={ticket}
            />
        })
    }
    
    formatDate = date => format(date, "dddd, MMMM Do, YYYY");
    
    render() {
        const { isLoading, userState, isAuth, tickets } = this.state;
        const { user } = this.props.auth;
        const { Header, Body, Row, HeaderCell } = Table;
        
        const sumPrize = tickets.map((tk, i)=> tk[i] = tickets[i]['tkPrize'])
        let acc = []
        const handleAcc = tickets.map((tk, i) => acc.length===0 
            || !acc.includes(tickets[i]["tkAccount"]) 
            ? acc.push(tickets[i]["tkAccount"]) : '')
        
        return(
            <BaseLayout {...this.props.auth}>
                <Link prefetch route={`/`}>
                    <a>Back</a>
                </Link>
                <h3>Profile</h3>
                <Grid>
                {isLoading ? (
                    <Grid.Column width={16}>
                    <Segment>
                        <Dimmer active inverted inline='centered'>
                            <Loader size='massive'>Loading</Loader>
                        </Dimmer>
                        <p>
                            <Image src='/static/images/paragraph.png' />
                        </p>
                        <p>
                            <Image src='/static/images/paragraph.png' />
                        </p>
                    </Segment>
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
                                    <span className='date'>Joined : {this.formatDate(userState.createdAt)}</span>
                                </Card.Meta>
                                <Card.Description>
                                    Account : <strong style={{color: 'green'}}>{tickets.length === 0 
                                        ? 'No Account' 
                                        : acc.map(i => i + '\n')
                                    }</strong>
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
                                        <Statistic.Label>Periods</Statistic.Label>
                                    </Statistic>

                                    <Statistic>
                                        <Statistic.Value>
                                            { tickets.length }
                                        </Statistic.Value>
                                        <Statistic.Label>
                                            Tickets
                                        </Statistic.Label>
                                    </Statistic>

                                    <Statistic>
                                        <Statistic.Value>
                                            { sumPrize.length !== 0
                                                ? sumPrize.reduce((a, p) => a += p)
                                                : 0 }
                                        </Statistic.Value>
                                        <Statistic.Label>
                                            Prize(ETH)
                                        </Statistic.Label>
                                    </Statistic>
                                </Statistic.Group>

                                <Divider />

                                <Table celled>
                                    <Header>
                                        <Row>
                                            <HeaderCell>No.</HeaderCell>
                                            <HeaderCell>LotteryNumber</HeaderCell>
                                            <HeaderCell>Period</HeaderCell>
                                            <HeaderCell>Reward</HeaderCell>
                                            <HeaderCell>Prize (ETH)</HeaderCell>
                                        </Row>
                                    </Header>
                                    <Body>{this.renderRows()}</Body>
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