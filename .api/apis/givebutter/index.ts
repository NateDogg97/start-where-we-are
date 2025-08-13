import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'givebutter/1 (api/6.1.3)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * Use this endpoint including an id to retrieve a specific contact.
   *
   * @summary Get a Contact
   */
  getContact(metadata: types.GetContactMetadataParam): Promise<FetchResponse<200, types.GetContactResponse200>> {
    return this.core.fetch('/v1/contacts/{id}', 'get', metadata);
  }

  /**
   * All parameters available in the Create a Contact endpoint can be updated.
   *
   * @summary Update Contact
   */
  updateContact(body: types.UpdateContactBodyParam, metadata: types.UpdateContactMetadataParam): Promise<FetchResponse<200, types.UpdateContactResponse200>>;
  updateContact(metadata: types.UpdateContactMetadataParam): Promise<FetchResponse<200, types.UpdateContactResponse200>>;
  updateContact(body?: types.UpdateContactBodyParam | types.UpdateContactMetadataParam, metadata?: types.UpdateContactMetadataParam): Promise<FetchResponse<200, types.UpdateContactResponse200>> {
    return this.core.fetch('/v1/contacts/{id}', 'patch', body, metadata);
  }

  /**
   * Use this endpoint to delete a contact.
   *
   * @summary Archive a Contact
   */
  deleteContact(metadata: types.DeleteContactMetadataParam): Promise<FetchResponse<200, types.DeleteContactResponse200>> {
    return this.core.fetch('/v1/contacts/{id}', 'delete', metadata);
  }

  /**
   * Use this endpoint to create a new contact.
   *
   * @summary Create a Contact
   */
  createContact(body: types.CreateContactBodyParam, metadata?: types.CreateContactMetadataParam): Promise<FetchResponse<201, types.CreateContactResponse201>> {
    return this.core.fetch('/v1/contacts', 'post', body, metadata);
  }

  /**
   * Use this endpoint to retrieve a list of contacts.
   *
   * @summary Get Contacts
   */
  getContacts(metadata?: types.GetContactsMetadataParam): Promise<FetchResponse<200, types.GetContactsResponse200>> {
    return this.core.fetch('/v1/contacts', 'get', metadata);
  }

  /**
   * Use this endpoint to retrieve a list of your campaigns.
   *
   * @summary Get Campaigns
   */
  getCampaigns(metadata?: types.GetCampaignsMetadataParam): Promise<FetchResponse<200, types.GetCampaignsResponse200>> {
    return this.core.fetch('/v1/campaigns', 'get', metadata);
  }

  /**
   * Use this endpoint to create a new campaign.
   *
   * @summary Create a Campaign
   */
  createCampaign(body?: types.CreateCampaignBodyParam): Promise<FetchResponse<201, types.CreateCampaignResponse201>> {
    return this.core.fetch('/v1/campaigns', 'post', body);
  }

  /**
   * Use this endpoint to restore a contact.
   *
   * @summary Restore a Contact
   */
  restoreContact(metadata: types.RestoreContactMetadataParam): Promise<FetchResponse<200, types.RestoreContactResponse200>> {
    return this.core.fetch('/v1/contacts/{id}/restore', 'patch', metadata);
  }

  /**
   * Include an id to retrieve a specific ticket.
   *
   * @summary Get a Ticket
   */
  getTicket(metadata: types.GetTicketMetadataParam): Promise<FetchResponse<200, types.GetTicketResponse200>> {
    return this.core.fetch('/v1/tickets/{id}', 'get', metadata);
  }

  /**
   * Retrieve a list of your plans. Include an id to retrieve a specific plan.
   *
   * @summary Get Plans
   */
  getAllPlans(): Promise<FetchResponse<200, types.GetAllPlansResponse200>> {
    return this.core.fetch('/v1/plans', 'get');
  }

  /**
   * Use this endpoint including an id to retrieve a specific payout.
   *
   * @summary Get a Payout
   */
  getPayout(metadata: types.GetPayoutMetadataParam): Promise<FetchResponse<200, types.GetPayoutResponse200>> {
    return this.core.fetch('/v1/payouts/{id}', 'get', metadata);
  }

  /**
   * Use this endpoint including an id to retrieve a specific transaction.
   *
   * @summary Get a Transaction
   */
  getTransaction(metadata: types.GetTransactionMetadataParam): Promise<FetchResponse<200, types.GetTransactionResponse200>> {
    return this.core.fetch('/v1/transactions/{id}', 'get', metadata);
  }

  /**
   * All parameters available in the Create a Campaign endpoint can be updated.
   *
   * @summary Update a Campaign
   */
  updateCampaign(body: types.UpdateCampaignBodyParam, metadata: types.UpdateCampaignMetadataParam): Promise<FetchResponse<200, types.UpdateCampaignResponse200>>;
  updateCampaign(metadata: types.UpdateCampaignMetadataParam): Promise<FetchResponse<200, types.UpdateCampaignResponse200>>;
  updateCampaign(body?: types.UpdateCampaignBodyParam | types.UpdateCampaignMetadataParam, metadata?: types.UpdateCampaignMetadataParam): Promise<FetchResponse<200, types.UpdateCampaignResponse200>> {
    return this.core.fetch('/v1/campaigns/{id}', 'patch', body, metadata);
  }

  /**
   * Use this endpoint to delete a specific campaign.
   *
   * @summary Delete a Campaign
   */
  deleteCampaign(metadata: types.DeleteCampaignMetadataParam): Promise<FetchResponse<200, types.DeleteCampaignResponse200>> {
    return this.core.fetch('/v1/campaigns/{id}', 'delete', metadata);
  }

  /**
   * Use this endpoint and include an id to retrieve a specific campaign.
   *
   * @summary Get a Campaign
   */
  getCampaign(metadata: types.GetCampaignMetadataParam): Promise<FetchResponse<200, types.GetCampaignResponse200>> {
    return this.core.fetch('/v1/campaigns/{id}', 'get', metadata);
  }

  /**
   * Use this endpoint to retrieve a list of the members of a specific campaign.
   *
   * @summary Get Members
   */
  getMembers(metadata: types.GetMembersMetadataParam): Promise<FetchResponse<200, types.GetMembersResponse200>> {
    return this.core.fetch('/v1/campaigns/{campaign_id}/members', 'get', metadata);
  }

  /**
   * Use this endpoint to delete a member from a campaign.
   *
   * @summary Delete a Member
   */
  deleteMember(metadata: types.DeleteMemberMetadataParam): Promise<FetchResponse<200, types.DeleteMemberResponse200>> {
    return this.core.fetch('/v1/campaigns/{campaign_id}/members/{member_id}', 'delete', metadata);
  }

  /**
   * Use this endpoint including an id to retrieve a specific member.
   *
   * @summary Get a Member
   */
  getMember(metadata: types.GetMemberMetadataParam): Promise<FetchResponse<200, types.GetMemberResponse200>> {
    return this.core.fetch('/v1/campaigns/{campaign_id}/members/{member_id}', 'get', metadata);
  }

  /**
   * Use this endpoint to retrieve a list of the teams under a specific campaign.
   *
   * @summary Get Teams
   */
  getAllTeams(metadata: types.GetAllTeamsMetadataParam): Promise<FetchResponse<200, types.GetAllTeamsResponse200>> {
    return this.core.fetch('/v1/campaigns/{campaign_id}/teams', 'get', metadata);
  }

  /**
   * Use this endpoint and include an id to retrieve a specific team.
   *
   * @summary Get a Team
   */
  getTeam(metadata: types.GetTeamMetadataParam): Promise<FetchResponse<200, types.GetTeamResponse200>> {
    return this.core.fetch('/v1/campaigns/{campaign_id}/teams/{team_id}', 'get', metadata);
  }

  /**
   * Retrieve a list of your tickets.
   *
   * @summary Get Tickets
   */
  getAllTickets(): Promise<FetchResponse<200, types.GetAllTicketsResponse200>> {
    return this.core.fetch('/v1/tickets', 'get');
  }

  /**
   * Get Transactions
   *
   */
  getAllTransactions(metadata?: types.GetAllTransactionsMetadataParam): Promise<FetchResponse<200, types.GetAllTransactionsResponse200>> {
    return this.core.fetch('/v1/transactions', 'get', metadata);
  }

  /**
   * Get Payouts
   *
   */
  getAllPayouts(): Promise<FetchResponse<200, types.GetAllPayoutsResponse200>> {
    return this.core.fetch('/v1/payouts', 'get');
  }

  /**
   * Use this endpoint including an id to retrieve a specific plan.
   *
   * @summary Get a Plan
   */
  getPlan(metadata: types.GetPlanMetadataParam): Promise<FetchResponse<200, types.GetPlanResponse200>> {
    return this.core.fetch('/v1/plans/{id}', 'get', metadata);
  }

  /**
   * Get Funds
   *
   */
  getFunds(): Promise<FetchResponse<200, types.GetFundsResponse200>> {
    return this.core.fetch('/v1/funds', 'get');
  }

  /**
   * Create a Fund
   *
   */
  createAFund(body: types.CreateAFundBodyParam): Promise<FetchResponse<201, types.CreateAFundResponse201>> {
    return this.core.fetch('/v1/funds', 'post', body);
  }

  /**
   * Get a Fund
   *
   */
  getAFund(metadata: types.GetAFundMetadataParam): Promise<FetchResponse<200, types.GetAFundResponse200>> {
    return this.core.fetch('/v1/funds/{id}', 'get', metadata);
  }

  /**
   * Update a Fund
   *
   */
  updateAFund(body: types.UpdateAFundBodyParam, metadata: types.UpdateAFundMetadataParam): Promise<FetchResponse<200, types.UpdateAFundResponse200>> {
    return this.core.fetch('/v1/funds/{id}', 'patch', body, metadata);
  }

  /**
   * Delete a Fund
   *
   */
  deleteAFund(metadata: types.DeleteAFundMetadataParam): Promise<FetchResponse<200, types.DeleteAFundResponse200>> {
    return this.core.fetch('/v1/funds/{id}', 'delete', metadata);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { CreateAFundBodyParam, CreateAFundResponse201, CreateCampaignBodyParam, CreateCampaignResponse201, CreateContactBodyParam, CreateContactMetadataParam, CreateContactResponse201, DeleteAFundMetadataParam, DeleteAFundResponse200, DeleteCampaignMetadataParam, DeleteCampaignResponse200, DeleteContactMetadataParam, DeleteContactResponse200, DeleteMemberMetadataParam, DeleteMemberResponse200, GetAFundMetadataParam, GetAFundResponse200, GetAllPayoutsResponse200, GetAllPlansResponse200, GetAllTeamsMetadataParam, GetAllTeamsResponse200, GetAllTicketsResponse200, GetAllTransactionsMetadataParam, GetAllTransactionsResponse200, GetCampaignMetadataParam, GetCampaignResponse200, GetCampaignsMetadataParam, GetCampaignsResponse200, GetContactMetadataParam, GetContactResponse200, GetContactsMetadataParam, GetContactsResponse200, GetFundsResponse200, GetMemberMetadataParam, GetMemberResponse200, GetMembersMetadataParam, GetMembersResponse200, GetPayoutMetadataParam, GetPayoutResponse200, GetPlanMetadataParam, GetPlanResponse200, GetTeamMetadataParam, GetTeamResponse200, GetTicketMetadataParam, GetTicketResponse200, GetTransactionMetadataParam, GetTransactionResponse200, RestoreContactMetadataParam, RestoreContactResponse200, UpdateAFundBodyParam, UpdateAFundMetadataParam, UpdateAFundResponse200, UpdateCampaignBodyParam, UpdateCampaignMetadataParam, UpdateCampaignResponse200, UpdateContactBodyParam, UpdateContactMetadataParam, UpdateContactResponse200 } from './types';
