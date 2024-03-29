import { Component } from 'react'
import web3 from '../ethereum/web3'
import { Grid, Card, Icon, Image, Segment, Button, Statistic, Divider, Table, Dimmer, Loader } from 'semantic-ui-react'
import { Link } from '../server/routes/routes'
import BaseLayout from '../components/layouts/BaseLayout'
import DeleteUser from '../components/admin/DeleteUser'
import format from "date-fns/format"
import ProfileRow from '../components/tabbar/ProfileRow'
import { getUser, getTicketsByUser, updateEther } from '../lib/api'
import withAuth from '../components/hoc/withAuth'

class Profile extends Component {
    state = {
        userState: [],
        tickets: [],
        isAuth: false,
        isLoading: true,
        ether: 0
    }

    componentDidMount = async() => {
        const { user, router } = this.props.auth;

        const accounts = await web3.eth.getAccounts()
        const getEther = await web3.eth.getBalance(accounts[0])
        this.setState({ ether: web3.utils.fromWei(getEther, 'ether') })

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

    updatedEthereum() {
        const eth = parseFloat(this.state.ether).toFixed(2)
        if (this.state.isAuth) 
            updateEther(this.props.auth.user._id, {ethereum: eth})
        return this.props.auth.user.ethereum
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

    sumPeriod() {
        let arrPeriod = []
        this.state.tickets.map((tk, i) => {
            tk[i] = this.state.tickets[i]['tkPeriod'][0]['prID']
            if (!arrPeriod.includes(tk[i])) {
                return arrPeriod.push(tk[i])
            }
        })
        return arrPeriod
    }

    handleAcc() {
        let acc = []
        const { tickets } = this.state
        tickets.map((tk, i) => acc.length===0 
            || !acc.includes(tickets[i]["tkAccount"]) 
            ? acc.push(tickets[i]["tkAccount"]) : '')
        return acc
    }
    
    formatDate = date => format(date, "dddd, MMMM Do, YYYY");
    
    render() {
        const { isLoading, userState, isAuth, tickets } = this.state;
        const { user } = this.props.auth;
        const { Header, Body, Row, HeaderCell } = Table;
        
        const sumPrize = tickets.map((tk, i) => tk[i] = tickets[i]['tkPrize'])
        
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
                            <Image src='/static/images/paragraph.png' centered />
                        </p>
                        <p>
                            <Image src='/static/images/paragraph.png' centered />
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
                                        : this.handleAcc().map(i => i + '\n')
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
                                        <Statistic.Value>
                                            {isAuth ? this.updatedEthereum() : userState.ethereum}
                                        </Statistic.Value>
                                        <Statistic.Label>ETH</Statistic.Label>
                                    </Statistic>

                                    <Statistic>
                                        <Statistic.Value>{this.sumPeriod().length}</Statistic.Value>
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