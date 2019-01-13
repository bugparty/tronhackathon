import PaxToken from '../contractRes/PaxToken.json';
export default {
    address: PaxToken.networks[5777].address,
    decimal: 5,
    name: "Paxos Standard Token",
    symbol: "PAX",
    icon: "PaxToken.png",
    abi : PaxToken.abi,
    network: PaxToken.network
}
