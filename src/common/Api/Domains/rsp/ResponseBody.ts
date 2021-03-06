/**
 * response body
 */
export interface ResponseBody<T> {
  body: T;
  status: ResponseStatus;
}

export interface ResponseStatus {
  code: string;
  errorCode?: string;
  message?: string;
}
