import React from 'react'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { BaseModal } from '../BaseModal'
import './styles.scss'

export interface IDownloadIBMSecurityTrusteerRapportModalProps {
  onClose: () => void
}

export const DownloadIBMSecurityTrusteerRapportModal: React.FunctionComponent<IDownloadIBMSecurityTrusteerRapportModalProps> = (
  props
) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`downloadIBMSecurityTrusteer.${key}`)

  const { onClose } = props

  const listItems: { icon: string; text: string }[] = [
    {
      icon: 'icon-shield',
      text: t('protect_your_personal_info'),
    },
    {
      icon: 'icon-shield-1',
      text: t('works_with_antivirus_solutions'),
    },
    {
      icon: 'icon-shield-2',
      text: t('trusteer_rapport_is_effective'),
    },
  ]

  return (
    <BaseModal
      className="security-trusteer-download-modal"
      title={<>{t('title')}</>}
      customModalFooterContent={
        <>
          {['learn_more', 'view_demo', 'remind_later'].map((text, index) => (
            <span key={index}>{t(text)}</span>
          ))}
          <Button variant="primary" onClick={() => onClose()}>
            {t('download_now')}
          </Button>
        </>
      }
      blackClose
      onClose={() => onClose()}
    >
      <span className="subtitle">{t('subtitle')}</span>
      <div className="paragraphs">
        {listItems.map((item, index) => (
          <div key={index}>
            <img src={`/assets/${item.icon}.svg`} alt={item.icon} />
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </BaseModal>
  )
}
