import React, { Component } from 'react'
import MarketingPreferencesForm from '../MarketingPreferencesForm'
import { withTranslation } from 'react-i18next'
import './styles.scss'

interface IMarketingPreferencesDetailsProps {
  t: any
}

export class MarketingPreferencesDetails extends Component<IMarketingPreferencesDetailsProps, {}> {
  render() {
    return (
      <div className="marketing-preferences-details-boxs">
        <MarketingPreferencesForm formType="page" />
      </div>
    )
  }
}

// @ts-ignore
export default withTranslation()(MarketingPreferencesDetails)
