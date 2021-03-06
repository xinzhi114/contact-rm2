import React from 'react'
import { useTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import './styles.scss'

const DummyAccountCard: React.FunctionComponent<{}> = () => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`accountsDashboard.dummyAccountCard.${key}`)

  return (
    <div className={`dummy-card-panel`}>
      <div className="top-circle-bg" />
      <div className="bottom-trans" />

      <React.Fragment>
        <span className="description-label">{t('for_any_other_services')}</span>

        <BaseTextLinkButton
          classNameContainer={''}
          label={t('go_to_secure_mailbox')}
          href={'/helpSupport/1'}
          isNavLink={true}
        />
      </React.Fragment>
    </div>
  )
}

export default DummyAccountCard
