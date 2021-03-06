import React, { useState } from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import dataAction from '../../store/actions/dataAction'
import DashboardLeftSidebar from '../../components/DashboardLeftSidebar'
import ActivityDetection from '../../components/ActivityDetection'
import './styles.scss'
import HomeMainBanner from '../../components/DocumentRepositoryComponents/HomeMainBanner'
import SuccessModal from '../../components/Modals/SuccessModal'
import { useTranslation } from 'react-i18next'

const DocumentRepository = () => {
  const { t } = useTranslation()

  const [showDownloadSuccessModalWindow, setShowDownloadSuccessModalWindow] = useState<boolean>(
    false
  )

  const documents = [
    'bank_account_verification',
    'bank_account_closure',
    'signature_verification',
    'changing_bank_deposit_account',
    'new_bank_account',
    'bank_account_transfer',
    'bank_account_reactivation',
    'change_of_address',
  ].map((doc, i) => ({
    name: doc,
    date: `${i + 3} Dec 2020`,
    id: i,
  }))

  return (
    <React.Fragment>
      <DashboardLeftSidebar
        title="Document Repository"
        desktopShownIcon="Alerts"
        mobileShownIcon="Menu"
        showDemoLink={true}
      />

      <div className="content document-repository-content">
        <div className="mains">
          <ActivityDetection />

          <div className="three-row">
            <div className="two-row">
              <HomeMainBanner
                documents={documents}
                onDownload={() => {
                  // setSelectedDoc(id)
                  setShowDownloadSuccessModalWindow(true)
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {showDownloadSuccessModalWindow && (
        <SuccessModal
          title={t('documentRepository.downloadSuccessModalWindow.document_downloaded')}
          successText={t(
            'documentRepository.downloadSuccessModalWindow.document_downloaded_message'
          )}
          onClose={() => {
            setShowDownloadSuccessModalWindow(false)
            // setSelectedDoc(-1)
          }}
        />
      )}
    </React.Fragment>
  )
}

const mapStateToProps = (state: any) => ({ ...state.dataReducer })

const matchDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({}, dispatch),
  dataAction: bindActionCreators({ ...dataAction }, dispatch),
})

export default connect(mapStateToProps, matchDispatchToProps)(DocumentRepository)
