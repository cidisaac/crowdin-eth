import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    '0xe520442F17b13a37EEB4fcd1865eEdEe63Eea26b'
);

export default instance;