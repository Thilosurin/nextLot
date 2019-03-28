import { Component } from 'react'
import { Button, Table, Form, Message, Input } from 'semantic-ui-react'
import { Link } from '../../server/routes/routes'
import BaseLayout from '../../components/layouts/BaseLayout'
import Period from '../../ethereum/period'

import PlayersRow from '../../components/admin/PlayersRow'

import withAuth from '../../components/hoc/withAuth';

class ManagePlayers extends Component {
    state = {
        reward: '',
        loading: false,
        errorMessage: '',
    }

    static async getInitialProps(props) {

        return {  }
    }

    // renderRows() {
    //     return this.props.players.map((player, index) => {
    //         return <PlayersRow 
    //             key={index}
    //             user={user}
    //             player={player}
    //         />
    //     })
    // }
    
    render() {
        const { Header, Row, HeaderCell, Body } = Table
        const { admin, user } = this.props.auth;

        return (
            <BaseLayout {...this.props.auth}>
            {admin &&
            <div>
                <Link prefetch route={`/`}>
                    <a>Back</a>
                </Link>
                <h3>Manage Players</h3>
                <div style={{float: 'right'}}>Found {} Players.</div>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>No.</HeaderCell>
                            <HeaderCell>Username</HeaderCell>
                            <HeaderCell>Account</HeaderCell>
                            <HeaderCell>Status</HeaderCell>
                            <HeaderCell>Delete User</HeaderCell>
                        </Row>
                    </Header>
                    
                    <PlayersRow key={1} user={user} />
                    {/* <Body>{this.renderRows()}</Body> */}
                </Table>
            </div>
            }
            </BaseLayout>
        )
    }
}

export default withAuth()(ManagePlayers)