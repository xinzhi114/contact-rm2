import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { FlexList } from '../../../FlexLayoutComponents/FlexList'
import { DownloadIBMSecurityTrusteerRapportModal } from '../../../Modals/DownloadIBMSecurityTrusteerRapportModal'
import './styles.scss'

export type IFooterSection = {
  title: string
  paragraphs: (string | JSX.Element)[]
}

export const LoginFooter: React.FunctionComponent = () => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`login.footer.${key}`)

  // Modals
  const [showDownloadTrusteerRapportModal, setShowDownloadTrusteerRapportModal] = useState<boolean>(
    false
  )

  const importantInfoSections: IFooterSection[] = [
    {
      title: t('gettingInContact.title'),
      paragraphs: [
        t('gettingInContact.paragraph_1'),
        <>
          {t('gettingInContact.paragraph_2_start')}{' '}
          <span className="link">{t('gettingInContact.contact_us_form')}</span>{' '}
          {t('gettingInContact.paragraph_2_end')}
        </>,
      ],
    },
    {
      title: t('scheduledMaintenance.title'),
      paragraphs: [t('scheduledMaintenance.paragraph_1')],
    },
  ]

  return (
    <div className="login-footer tablet-hide desktop-show">
      <Row className="top-section">
        <Col className="important-information" xs={8}>
          <div className="col-title">
            <img src="/assets/icon-nav-insights.svg" alt="insights" />
            {t('important_information')}
          </div>
          <div>
            {importantInfoSections.map((section, index) => (
              <div className="section" key={index}>
                <span className="section-title">{section.title}</span>
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <div className="section-paragraph" key={paragraphIndex}>
                    {paragraph}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Col>
        <Col xs={1} />
        <Col className="stay-safe-online" xs={3}>
          <div className="col-title">
            <img src="/assets/icon-shield.svg" alt="shield" />
            {t('stay_safe_online')}
          </div>
          <div>
            <div className="section">
              <span className="section-paragraph">
                <span className="link" onClick={() => setShowDownloadTrusteerRapportModal(true)}>
                  {t('download')}
                </span>{' '}
                {t('trusteer_rapport')}
              </span>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="bottom-section">
        <Col className="left-col" xs={3}>
          <img src="/assets/logo-dummy-white.svg" alt="logo" />
          <div className="text-wrapper">
            <span>{t('copyright')}</span>
            <span className="odyssey-bank-limited">{t('odyssey_bank_limited')}</span>
            <FlexList
              wrap
              items={[
                { label: t('registered_in_england_and_whales'), value: '04728421' },
                {
                  label: t('registration_office'),
                  value: (
                    <>
                      {t('address_1')}
                      <br />
                      {t('address_2')}
                    </>
                  ),
                },
                {
                  label: t('correspondence_address'),
                  value: (
                    <>
                      {t('correspondence_address_1')}
                      <br />
                      {t('correspondence_address_2')}
                    </>
                  ),
                },
              ]}
            />
            {['free_and_impartial_advice', 'ways_to_get_in_contact'].map((textKey, index) => (
              <span key={index} className="helper-link">
                <span className="link">{t('click_here')}</span> {t(textKey)}
              </span>
            ))}
          </div>
        </Col>
        <Col className="right-col" xs={8}>
          <div className="badges">
            <div>
              <img src="/assets/footer-badges-1.svg" alt="badges" />
            </div>
            <img src="/assets/footer-badges-2.svg" alt="badges" />
          </div>
          <div className="text-wrapper">
            <span>{t('rightCol.paragraph_1')}</span>
            <span>
              {t('rightCol.paragraph_2')}{' '}
              <span className="link">{t('rightCol.available_here')}</span> {t('rightCol.or_visit')}{' '}
              <a
                className="link"
                href="https://www.fscs.org.uk/"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.fscs.org.uk
              </a>
            </span>
            <span>
              {t('rightCol.paragraph_3')}{' '}
              <span className="link">{t('rightCol.available_here')}</span>
            </span>
          </div>
          <div className="toolbar">
            {['faqs', 'contact_us', 'privacy_policy', 'security', 'accessibility'].map(
              (text, index) => (
                <span className="link" key={index}>
                  {t(`toolbar.${text}`)}
                </span>
              )
            )}
          </div>
        </Col>
      </Row>
      {showDownloadTrusteerRapportModal && (
        <DownloadIBMSecurityTrusteerRapportModal
          onClose={() => setShowDownloadTrusteerRapportModal(false)}
        />
      )}
    </div>
  )
}
