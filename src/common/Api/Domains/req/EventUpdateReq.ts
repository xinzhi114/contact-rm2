export interface EventUpdateReq {
  eventConfId: number;
  thresholdValue?: number;
  channelConfig?: {channelId: number; channelValue?: boolean}[];
  active: boolean;
}
