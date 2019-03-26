import { Component } from 'react'

import withAuth from '../../components/hoc/withAuth';

class ProfileAdmin extends Component {
    render() {
        return(
            <h1>5555</h1>
        )
    }
}

export default  withAuth()(ProfileAdmin)