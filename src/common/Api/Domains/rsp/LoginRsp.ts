/**
 * login response
 */
export interface LoginRsp {
  access_token: string;
  refresh_token: string;
  scope: string;
  id_token: string;
  token_type: string;
  access_token_expires_in: number;
  refresh_token_expires_in: number;
  access_token_expired_at: string;
  refresh_token_expired_at: string;
}
