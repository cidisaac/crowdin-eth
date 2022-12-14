import React, {Component} from "react";
import Layout from "../../../components/Layout";
import Campaign from '../../../ethereum/campaign';
import {Button, Card, Grid, GridColumn} from "semantic-ui-react";
import web3 from '../../../ethereum/web3';
import ContributeForm from "../../../components/ContributeForm";
import {Link} from '../../../routes';

class CampaignShow extends Component {

    static async getInitialProps(props) {
        const campaignAddress = props.query.address;
        const campaign = Campaign(campaignAddress);
        const summary = await campaign.methods.getSummary().call();

        return {
            address: campaignAddress,
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };
    }

    renderCards() {

        const {
            balance,
            manager,
            minimumContribution,
            requestsCount,
            approversCount
        } = this.props;

        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: 'The manager creates this campaign and can create requests to withdraw money',
                style: {overflowWrap: 'break-word'}
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description: 'You must contribute at least this much wei to become an approver',
                style: {overflowWrap: 'break-word'}
            },
            {
                header: requestsCount,
                meta: 'Number of requests',
                description: 'A request tries to withdraw money from the contract. Request must be approve by approvers',
                style: {overflowWrap: 'break-word'}
            },
            {
                header: approversCount,
                meta: 'Number of Approvers',
                description: 'Number of people who have already donated to this campaign',
                style: {overflowWrap: 'break-word'}
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign balance (ether)',
                description: 'The balance is how much money this campaign has left to spend',
                style: {overflowWrap: 'break-word'}
            },
        ];

        return <Card.Group items={items}/>
    }

    state = {};

    render() {
        return (
            <Layout>
                <h3>Campaign Details</h3>
                <Grid>
                    <Grid.Row>
                        <GridColumn width={10}>
                            {this.renderCards()}
                        </GridColumn>
                        <GridColumn width={6}>
                            <ContributeForm address={this.props.address}/>
                        </GridColumn>
                    </Grid.Row>
                    <Grid.Row>
                        <GridColumn>
                            <Link route={`/campaigns/${this.props.address}/requests`}>
                                <a>
                                    <Button primary>View Requests</Button>
                                </a>
                            </Link>
                        </GridColumn>
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    }
}

export default CampaignShow;