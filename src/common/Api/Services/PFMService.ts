import {BaseApiService} from './BaseApiService';
import {getOrRefreshToken} from './TokenHelper';
import {Any} from '../Types';

/**
 * personal finance management service
 */
export class PFMService extends BaseApiService {
  constructor() {
    super('/v2/personalisationservices/personalfinancemanagement');
  }

  /**
   * get PFM financial overview
   */
  async financialOverview() {
    const token = await getOrRefreshToken();
    const body = await this.buildBodyAndHeaders({});
    return this.httpInstance.post('/pfm_financial_overview', body.payload, {
      headers: {
        ...body.headers,
        Authorization: `Bearer ${token.access_token}`,
      },
    });
  }

  /**
   * get PFM aggregated accounts
   */
  async aggregatedAccounts() {
    const token = await getOrRefreshToken();
    const body = await this.buildBodyAndHeaders({});
    return this.httpInstance.post('/pfm_aggregatedaccounts', body.payload, {
      headers: {
        ...body.headers,
        Authorization: `Bearer ${token.access_token}`,
      },
    });
  }

  /**
   * get PFM income outgoing
   * @param filter the filter params
   */
  async incomeAndOutgoing(filter: Any) {
    const token = await getOrRefreshToken();
    const body = await this.buildBodyAndHeaders(filter);
    return this.httpInstance.post('/pfm_income_outgoing', body.payload, {
      headers: {
        ...body.headers,
        Authorization: `Bearer ${token.access_token}`,
      },
    });
  }

  /**
   * get spend categorization
   * @param filter the filter params
   */
  async spendCategorization(filter: Any) {
    const token = await getOrRefreshToken();
    const body = await this.buildBodyAndHeaders(filter);
    return this.httpInstance.post('/pfm_spend_categorization', body.payload, {
      headers: {
        ...body.headers,
        Authorization: `Bearer ${token.access_token}`,
      },
    });
  }

  /**
   * get spend Transactions
   * @param filter the filter params
   */
  async getSpendTransactions(filter: Any) {
    const token = await getOrRefreshToken();
    const body = await this.buildBodyAndHeaders(filter);
    return this.httpInstance.post(
      '/pfm_spend_categorization/individual_txn',
      body.payload,
      {
        headers: {
          ...body.headers,
          Authorization: `Bearer ${token.access_token}`,
        },
      },
    );
  }

  /**
   * move spend Transactions
   * @param data the request data
   */
  async moveTransactions(data: Any) {
    const token = await getOrRefreshToken();
    const body = await this.buildBodyAndHeaders(data);
    return this.httpInstance.put('/pfm_spend_categorization', body.payload, {
      headers: {
        ...body.headers,
        Authorization: `Bearer ${token.access_token}`,
      },
    });
  }

  /**
   * get budgets
   * @param filter the filter params
   */
  async budgets(filter: Any) {
    const token = await getOrRefreshToken();
    const body = await this.buildBodyAndHeaders(filter);
    return this.httpInstance.post('/pfm_budget', body.payload, {
      headers: {
        ...body.headers,
        Authorization: `Bearer ${token.access_token}`,
      },
    });
  }

  /**
   * update budget
   * @param data the request data
   */
  async updateBudget(data: Any) {
    const token = await getOrRefreshToken();
    const body = await this.buildBodyAndHeaders(data);
    return this.httpInstance.put('/pfm_budget', body.payload, {
      headers: {
        ...body.headers,
        Authorization: `Bearer ${token.access_token}`,
      },
    });
  }

  /**
   * remove budget
   * @param data the request data
   */
  async removeBudget(data: Any) {
    const token = await getOrRefreshToken();
    const body = await this.buildBodyAndHeaders(data);
    return this.httpInstance.delete('/pfm_budget', {
      data: body.payload,
      headers: {
        ...body.headers,
        Authorization: `Bearer ${token.access_token}`,
      },
    });
  }
}
