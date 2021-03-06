import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BaseTextInput } from '../../../components/BaseForm/BaseFormFields/BaseTextInput'
import formValidationSvc from '../../../services/formValidationSvc'
import './styles.scss'

interface IHomeMainBannerProps {
  documents: { name: string; date: string; id: number }[]
  onDownload: (id: number) => void
}

const HomeMainBanner: React.FunctionComponent<IHomeMainBannerProps> = (props) => {
  const { t } = useTranslation()
  const { documents } = props

  const [searchText, setSearchText] = useState('')

  const getFilteredDocs = () => {
    if (searchText !== '') {
      return documents.filter((doc) =>
        t('documentRepository.docTypes.' + doc.name)
          .toLowerCase()
          .includes(searchText.toLowerCase())
      )
    }
    return documents
  }

  return (
    <div className="document-repository-home-main-banner-boxs">
      <div className="top-bar mobile-hide">
        <div className="black-title">
          {t('documentRepository.homeMainBanner.document_repository')}
        </div>
        <BaseTextInput
          id="searchDocument"
          placeholder={t('documentRepository.homeMainBanner.search_document')}
          pattern="[\s\S]{0,50}"
          value={searchText}
          onChange={(e) =>
            setSearchText(formValidationSvc.validateInputEnteringPattern(e, searchText))
          }
        >
          <img className="tit-right" src="./assets/search.svg" alt="icons" />
        </BaseTextInput>
      </div>
      <div className="title-separator mobile-hide" />
      {getFilteredDocs() && getFilteredDocs().length > 0 ? (
        <div className="account-menu-wrap">
          <div className="row">
            <div className="col col-12">
              <div className="menu-list">
                {getFilteredDocs().map((doc, i) => (
                  <div key={i} className="items">
                    <div className="doc-type mobile-hide">
                      <img src="./assets/document.svg" alt="icons" />
                      <span className="doc-name">
                        {t('documentRepository.docTypes.' + doc.name)}
                      </span>
                    </div>
                    <span className="doc-date mobile-hide">{doc.date}</span>
                    <div className="doc-type desktop-hide">
                      <img src="./assets/document.svg" alt="icons" />
                      <div>
                        <span className="doc-name">
                          {t('documentRepository.docTypes.' + doc.name)}
                        </span>
                        <span className="doc-date">{doc.date}</span>
                      </div>
                    </div>
                    <div className="doc-actions">
                      <span onClick={() => props.onDownload(doc.id)}>
                        <img src="./assets/download.svg" alt="icons" />
                        {t('documentRepository.download')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-document-wrap">
          <img src="./assets/document.svg" alt="icons" />
          {t('documentRepository.no_documents_available')}
        </div>
      )}
    </div>
  )
}

// @ts-ignore
export default HomeMainBanner
