import { Component } from "react"
import { Segment, Grid, Button, Divider, Image } from 'semantic-ui-react'
import BaseLayout from '../components/layouts/BaseLayout'
import { Link } from '../server/routes/routes'

import withAuth from '../components/hoc/withAuth'

class Guide extends Component {

    render() {
        return (
            <BaseLayout {...this.props.auth}>
                    <Link prefetch route={`/`}>
                        <a>Back</a>
                    </Link>
                
                <h3>How to ...</h3>
                <Segment>
                    <Grid columns={2} relaxed='very'>
                        <Grid.Column textAlign="center">
                            <Image
                                src='../static/images/howEth.png'
                                as='a'
                                size='medium'
                                href='https://siamblockchain.com/2017/09/08/%E0%B8%A7%E0%B8%B4%E0%B8%98%E0%B8%B5-%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD-omisego-omg-%E0%B9%83%E0%B8%99%E0%B9%84%E0%B8%97%E0%B8%A2/'
                                target='_blank'
                            />
                            <h3>Buy Ethereum Coin in web: <a target="_blank" href="https://bx.in.th/">www.bx.in.th</a></h3>
                        </Grid.Column>
                        <Grid.Column textAlign="center">
                            <Image
                                src='../static/images/howWallet.png'
                                as='a'
                                size='medium'
                                href='https://medium.com/@artiya4u/make-secure-ethereum-wallet-for-buying-ico-da2670b71463'
                                target='_blank'
                            />
                            <h3>Install MetaMask (Ethereum Wallet) Extension Google Chrome</h3>
                        </Grid.Column>
                    </Grid>
                    <Divider vertical>And</Divider>
                </Segment>
            </BaseLayout>
        );
    }
}

export default withAuth()(Guide)