/**
 * get or refresh token
 */
export async function getOrRefreshToken() {
  const {ASF} = require('./ApiServiceFactory');
  const {AuthenticationService} = require('./AuthenticationService');
  return ASF.getService(AuthenticationService).getToken();
}
