/**
 * Marketing Preferences
 */
export interface MarketingPref {
  tip: string
  title: string
  key: string
  grant: boolean
  preferredChannels: {
    channel: string
    selected: boolean
  }[]
}
