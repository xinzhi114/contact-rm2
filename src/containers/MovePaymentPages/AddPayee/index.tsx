import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import * as _ from 'lodash'
import ActivityDetection from '../../../components/ActivityDetection'
import DashboardLeftSidebar from '../../../components/DashboardLeftSidebar'
import './styles.scss'
import { PayeeForm } from '../../../components/MovePaymentComponents/ManagePayeeComponents/PayeeForm'
import { BaseCheckbox } from '../../../components/BaseForm/BaseFormFields/BaseCheckbox'
import { Redirect } from 'react-router-dom'
import { MobileBankingApproveModal } from '../../../components/Modals/MobileBankingApproveModal'
import SuccessModal from '../../../components/Modals/SuccessModal'
import { PayeeDetails } from '../../../components/MovePaymentComponents/ManagePayeeComponents/PayeeDetails'
import { Payee } from '../ManagePayees'
import { ImportantInformation } from '../../../components/MovePaymentComponents/ImportantInformation'
import { SelectPayeeTypeButtonGroup } from '../SelectPayeeTypeButtonGroup'
import { ImportantInformationNotificationModal } from '../../../components/Modals/ImportantInformationNotificationModal'

const headerBreadcrumbData = [
  {
    pageName: 'home',
    pageUrl: '/customerDashboard',
  },
  {
    pageName: 'payment_and_transfer',
    pageUrl: '/movePaymentPages',
  },
  {
    pageName: 'manage_payees',
    pageUrl: '/movePaymentPages/managePayees',
  },
  {
    pageName: 'add_payee',
    pageUrl: '#',
  },
]

export const AddPayee: React.FunctionComponent = () => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`movePaymentAddPayee.${key}`)

  const [formValue, setFormValue] = useState<{ [field: string]: string } | null>(null)
  const [ukPayeeTypeRadio, setUkPayeeTypeRadio] = useState([true, false])
  const [newPayee, setNewPayee] = useState<{ [field: string]: string } | null>(null)
  const [saveClicked, setSaveClicked] = useState(false)
  const [redirectBack, setRedirectBack] = useState(false)

  // Modals
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)
  const [showImportantInformationModal, setShowImportantInformationModal] = useState<boolean>(false)
  const [
    showImportantInformationNotificationModal,
    setShowImportantInformationNotificationModal,
  ] = useState<boolean>(true)

  if (redirectBack) {
    return <Redirect to="/movePaymentPages/managePayees" />
  }

  return (
    <React.Fragment>
      <DashboardLeftSidebar
        headerWhiteBg={true}
        title="Payment and Transfer"
        desktopShownIcon=""
        mobileShownIcon="Back"
        showDemoLink={false}
        headerBreadcrumbData={headerBreadcrumbData}
      />
      <div className="content add-payee-content">
        <div className="mains">
          <ActivityDetection />
          <Modal.Dialog>
            <Modal.Header>
              {!saveClicked && (
                <>
                  <img
                    src="/assets/mobile-back.svg"
                    alt="back"
                    onClick={() => setRedirectBack(true)}
                  />{' '}
                </>
              )}
              {t(saveClicked ? 'title_review' : 'title')}
              {!saveClicked && (
                <div
                  className="show-important-information-wrapper"
                  onClick={() => setShowImportantInformationModal(true)}
                >
                  <div className="show-important-information mobile-show desktop-hide">
                    <img src="/assets/question-bold-white.svg" alt="show important information" />
                  </div>
                  <div className="show-important-information tablet-show mobile-hide desktop-hide">
                    <img src="/assets/question-bold.svg" alt="show important information" />
                  </div>
                </div>
              )}
            </Modal.Header>
            <Modal.Body className={saveClicked ? 'save-clicked' : ''}>
              {saveClicked ? (
                <>
                  {newPayee && <PayeeDetails payee={newPayee as Payee} desktopOnly />}
                  <MobileBankingApproveModal
                    onApproved={() => {
                      setSaveClicked(false)
                      setShowSuccessModal(true)
                    }}
                    flat
                  />
                </>
              ) : (
                <>
                  <div className="action-bar">
                    <BaseCheckbox
                      value={ukPayeeTypeRadio}
                      onChange={(newValue) => setUkPayeeTypeRadio(newValue)}
                      checkboxType="radio"
                      options={[t('uk_based_payee'), t('non_uk_based_payee')]}
                      disableTranslation
                      className="desktop-show mobile-hide"
                    />
                    <SelectPayeeTypeButtonGroup
                      ukPayeesOnly={ukPayeeTypeRadio[0]}
                      setUkPayeesOnly={(newValue) => setUkPayeeTypeRadio([newValue, !newValue])}
                      className="desktop-hide mobile-show"
                    />
                  </div>
                  <PayeeForm
                    isUkPayee={ukPayeeTypeRadio[0]}
                    onChange={(newFormValue) => setFormValue(newFormValue)}
                  />
                </>
              )}
            </Modal.Body>
            {!saveClicked && (
              <Modal.Footer>
                <Button
                  variant="primary"
                  onClick={() => {
                    setNewPayee(_.cloneDeep(formValue))
                    setSaveClicked(true)
                  }}
                  disabled={_.values(formValue).some((value) => value === '')}
                >
                  {t('save')}
                </Button>
                <Button variant="link" onClick={() => setRedirectBack(true)}>
                  {t('cancel')}
                </Button>
              </Modal.Footer>
            )}
          </Modal.Dialog>
          {!saveClicked && (
            <ImportantInformation
              showFullModal={showImportantInformationModal}
              onClose={() => setShowImportantInformationModal(false)}
              translationKey="movePaymentManagePayees.importantInformation"
            />
          )}
        </div>
        {showSuccessModal && newPayee && (
          <SuccessModal
            title={t('subTitle')}
            successText={
              newPayee ? (
                <>
                  {t(newPayee.bic ? 'non_uk_based_payee' : 'uk_based_payee')}{' '}
                  <span className="bold">'{newPayee.name}'</span> {t('added_successfully')}
                </>
              ) : (
                <></>
              )
            }
            className="add-new-payee-success-modal"
            onClose={() => {
              setRedirectBack(true)
              setNewPayee(null)
            }}
            mobileFullScreen
          >
            <PayeeDetails payee={newPayee as Payee} tabletOnly roundBorders />
          </SuccessModal>
        )}
        {showImportantInformationNotificationModal && (
          <ImportantInformationNotificationModal
            onOpen={() => {
              setShowImportantInformationModal(true)
              setShowImportantInformationNotificationModal(false)
            }}
            onClose={() => setShowImportantInformationNotificationModal(false)}
          />
        )}
      </div>
    </React.Fragment>
  )
}
