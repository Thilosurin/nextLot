import web3 from './web3';
import Period from './build/Period.json'

export default (address) => {
    return new web3.eth.Contract(
        JSON.parse(Period.interface),
        address
    )
}