/**
 * alert config channel
 */
export interface AlertChannelRsp {
  channelMapId?: number;
  channel: {
    channelId: number;
    channelValue: boolean;
    channelName: string;
  };
  defaultValue?: boolean;
  active?: boolean;
  createdOn?: string;
}

export interface AccountAlertRsp {
  accountId: string;
  accountType: string;
  customerUniqueId: string;
  events: AlertItemRsp[];
}

/**
 * alert item
 */
export interface AlertItemRsp {
  eventConfId: number;
  channels: AlertChannelRsp[];
  userThresholdValue: {
    thresholdId: number;
    currency: {
      currencyId: number;
      currency: string;
      currencySymbol: string;
      active: true;
    };
    thresholdValue: number;
    lastThresholdValue: number;
    createdOn: string;
  };
  event: {
    event: string;
    eventDescription: string;
    valueEditable: boolean;
    active: boolean;
  };
  updating?: boolean;
  active: boolean;
}

/**
 * alert history item
 */
export interface AlertHistoryRsp {
  historyId: number;
  event: {eventDescription: string; event: string};
  channel: {channelName: string};
  message: string;
  createdOn: string;
}

/**
 * event view response
 */
export interface EventRsp {
  payment_alert_event: AlertItemRsp[];
  current_account_alert_event: AccountAlertRsp[];
}
