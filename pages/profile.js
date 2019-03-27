import { Component } from 'react'
import BaseLayout from '../components/layouts/BaseLayout'
import DeleteUser from '../components/admin/DeleteUser'

import withAuth from '../components/hoc/withAuth';

class ProfileAdmin extends Component {
    render() {
        const { admin, user } = this.props.auth;
        
        return(
            <BaseLayout {...this.props.auth}>
                <div>
                    <h1>5555</h1>
                    <DeleteUser user={user}/>
                </div>
            </BaseLayout>
        )
    }
}

export default  withAuth()(ProfileAdmin)