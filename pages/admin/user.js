import { Component } from 'react'
import { Table, Grid, Dimmer, Loader, Image } from 'semantic-ui-react'
import { Link } from '../../server/routes/routes'
import BaseLayout from '../../components/layouts/BaseLayout'

import PlayerRow from '../../components/admin/PlayerRow'
import { getUserFeed } from "../../lib/api";
import withAuth from '../../components/hoc/withAuth';

class ManagePlayers extends Component {
    state = {
        players: [],
        isLoading: true,
    }

    componentDidMount() {
        getUserFeed(this.props.auth.user._id)
            .then(players => this.setState({ players, isLoading: false }));
    }
    
    render() {
        const { Header, Row, HeaderCell } = Table
        const { players, isLoading } = this.state;
        const { admin } = this.props.auth;

        return (
            <BaseLayout {...this.props.auth}>
            {admin ? (
                <div>
                    <Link prefetch route={`/`}>
                        <a>Back</a>
                    </Link>
                    <h3>Manage Players</h3>
                    <Grid>
                        {isLoading ? (
                        <Grid.Column width={16}>
                            <Dimmer active inverted inline='centered'>
                                <Loader size='massive'>Loading</Loader>
                            </Dimmer>
                            <p>
                                <Image src='/static/images/paragraph.png' />
                            </p>
                            <p>
                                <Image src='/static/images/paragraph.png' />
                            </p>
                        </Grid.Column>
                        ) : (
                            <Grid.Column width={16}>
                                <div style={{float: 'right'}}>Found {players.length} Players.</div>
                                <Table celled selectable textAlign="center">
                                    <Header>
                                        <Row>
                                            <HeaderCell>No.</HeaderCell>
                                            <HeaderCell>Username</HeaderCell>
                                            <HeaderCell>Account</HeaderCell>
                                            <HeaderCell>Change Status</HeaderCell>
                                            <HeaderCell>Delete User</HeaderCell>
                                        </Row>
                                    </Header>
                                    {players.map((player, index) => (
                                        <PlayerRow key={player._id} index={index} player={player} />
                                    ))}
                                </Table>
                            </Grid.Column>
                        )}
                    </Grid>
                </div>
                ) : (
                <h1>Admin Only!!!</h1>
            )}
            </BaseLayout>
        )
    }
}

export default withAuth()(ManagePlayers)