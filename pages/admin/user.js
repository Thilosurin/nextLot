import { Component } from 'react'
import { Table } from 'semantic-ui-react'
import { Link } from '../../server/routes/routes'
import BaseLayout from '../../components/layouts/BaseLayout'

import PlayerRow from '../../components/admin/PlayerRow'
import { getUserFeed } from "../../lib/api";
import withAuth from '../../components/hoc/withAuth';

class ManagePlayers extends Component {
    state = {
        players: []
    }

    componentDidMount() {
        getUserFeed(this.props.auth.user._id)
            .then(players => this.setState({ players }));
    }
    
    render() {
        const { Header, Row, HeaderCell } = Table
        const { players } = this.state;
        const { admin } = this.props.auth;

        return (
            <BaseLayout {...this.props.auth}>
            {admin &&
            <div>
                <Link prefetch route={`/`}>
                    <a>Back</a>
                </Link>
                <h3>Manage Players</h3>
                <div style={{float: 'right'}}>Found {players.length} Players.</div>
                <Table celled selectable>
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
            </div>
            }
                <h1>Admin Only!!!</h1>
            </BaseLayout>
        )
    }
}

export default withAuth()(ManagePlayers)