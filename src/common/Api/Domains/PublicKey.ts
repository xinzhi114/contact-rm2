/**
 * public key
 */
export interface PublicKey {
  appKey: {
    appId: string;
    guid: string;
    validFrom: string;
    validTo: string;
  };
  publicKey: string;
}
