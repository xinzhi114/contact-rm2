import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import * as _ from 'lodash'
import ActivityDetection from '../../../components/ActivityDetection'
import DashboardLeftSidebar from '../../../components/DashboardLeftSidebar'
import { PayeeList } from '../../../components/MovePaymentComponents/PayeeList'
import { SearchBarPayee } from '../../../components/MovePaymentComponents/SearchBarPayee'
import { ViewModeButton } from '../../../components/MovePaymentComponents/ManagePayeeComponents/ViewModeButton'
import './styles.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getMovePaymentManagePayeesData } from '../../../store/actions/dataAction'
import { UpdatePayeeModal } from '../../../components/MovePaymentComponents/ManagePayeeComponents/UpdatePayeeModal'
import { DeletePayeeModal } from '../../../components/MovePaymentComponents/ManagePayeeComponents/DeletePayeeModal'
import { Redirect } from 'react-router-dom'
import { MobileBankingApproveModal } from '../../../components/Modals/MobileBankingApproveModal'
import SuccessModal from '../../../components/Modals/SuccessModal'
import { PayeeDeletedDetails } from '../../../components/MovePaymentComponents/ManagePayeeComponents/PayeeDeletedDetails'
import { dataCanceledTransactions, ITransaction } from '../../../constants/transaction'
import { SelectPayeeTypeButtonGroup } from '../SelectPayeeTypeButtonGroup'

export type Payee = {
  name: string
  userNameColor: string
  userNameLabelColor: string
  accountNumber: string
  sortCode?: string
  reference: string
  iban: string
  bic?: string
}

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
    pageUrl: '#',
  },
]

export const ManagePayees: React.FunctionComponent = () => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`movePaymentManagePayees.${key}`)
  const dispatch = useDispatch()

  const dataList = useSelector<any>((state) =>
    state.dataReducer.movePaymentManagePayees
      ? state.dataReducer.movePaymentManagePayees.dataList
      : null
  ) as {
    ukPayees: Payee[]
    nonUkPayees: Payee[]
  } | null

  const [searchText, setSearchText] = useState<string>('')

  const [ukPayeesOnly, setUkPayeesOnly] = useState(true)
  const [addNewPayee, setAddNewPayee] = useState<boolean>(false)

  const canceledTransactions = useState<ITransaction[]>(dataCanceledTransactions)[0]

  // Modals
  const [showUpdatePayeeModal, setShowUpdatePayeeModal] = useState<Payee | null>(null)
  const [showDeletePayeeModal, setShowDeletePayeeModal] = useState<Payee | null>(null)
  const [showApproveModal, setShowApproveModal] = useState<boolean>(false)
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)

  // Used only on mobile
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  const [searchBarExpanded, setSearchBarExpanded] = useState(false)

  const filteredPayees = dataList
    ? (ukPayeesOnly ? dataList.ukPayees : dataList.nonUkPayees).filter((p) =>
        _.values(p).some((v) => v && v.toLowerCase().includes(searchText.toLowerCase()))
      )
    : []

  useEffect(() => {
    dispatch(getMovePaymentManagePayeesData())
  }, [dispatch])

  if (addNewPayee) {
    return <Redirect to="/movePaymentPages/managePayees/addPayee" />
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
      <div className="content manage-payees-content">
        <div className="mains">
          <ActivityDetection />
          <Modal.Dialog>
            <Modal.Header>
              <img src="/assets/payee-blue.svg" alt="" /> {t('title')}
            </Modal.Header>
            <Modal.Body>
              <div className="action-bar">
                <SelectPayeeTypeButtonGroup
                  ukPayeesOnly={ukPayeesOnly}
                  setUkPayeesOnly={(newValue) => setUkPayeesOnly(newValue)}
                />
                <div className="right-actions">
                  <span className="total-payees">
                    {t((ukPayeesOnly ? '' : 'non_') + 'uk_payees')} ({filteredPayees.length})
                  </span>
                  <div className="buttons">
                    <SearchBarPayee
                      value={searchText}
                      onChange={(newValue) => setSearchText(newValue)}
                      onToggle={() => setSearchBarExpanded(!searchBarExpanded)}
                      expanded={searchBarExpanded}
                    />
                    <ViewModeButton value={viewMode} onChange={(newMode) => setViewMode(newMode)} />
                    <Button variant="primary" onClick={() => setAddNewPayee(true)}>
                      <span className="desktop-show mobile-hide">{t('add_new_payees')}</span>
                      <img src="/assets/plus.svg" alt="add" className="desktop-hide mobile-show" />
                    </Button>
                  </div>
                </div>
              </div>
              <PayeeList
                payees={filteredPayees}
                viewMode={viewMode}
                onUpdate={(payee) => setShowUpdatePayeeModal(payee)}
                onDelete={(payee) => setShowDeletePayeeModal(payee)}
              />
            </Modal.Body>
            <Modal.Footer>
              <span className="load-more hide">{t('load_more')}</span>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
        {showApproveModal ? (
          <MobileBankingApproveModal
            onApproved={() => {
              setShowApproveModal(false)
              setShowSuccessModal(true)
            }}
          />
        ) : (
          <>
            {showSuccessModal ? (
              <SuccessModal
                title={t(`${showUpdatePayeeModal ? 'updatePayeeModal' : 'deletePayeeModal'}.title`)}
                successText={
                  <>
                    {t('successModal.your_payee')}{' '}
                    {showUpdatePayeeModal ? (
                      <>
                        <span className="bold">'{showUpdatePayeeModal.name}'</span>{' '}
                        {t('successModal.has_been_updated_successfully')}
                      </>
                    ) : showDeletePayeeModal ? (
                      <>
                        <span className="bold">'{showDeletePayeeModal.name}'</span>{' '}
                        {t('successModal.has_been_deleted_successfully')}
                      </>
                    ) : (
                      ''
                    )}
                  </>
                }
                onClose={() => {
                  setShowSuccessModal(false)
                  if (showUpdatePayeeModal) {
                    setShowUpdatePayeeModal(null)
                  } else {
                    setShowDeletePayeeModal(null)
                  }
                }}
                mobileFullScreen={!!showDeletePayeeModal}
              >
                {showDeletePayeeModal && (
                  <PayeeDeletedDetails
                    payee={showDeletePayeeModal}
                    canceledTransactions={dataCanceledTransactions}
                    dark
                  />
                )}
              </SuccessModal>
            ) : (
              <>
                {showUpdatePayeeModal && (
                  <UpdatePayeeModal
                    isUkPayee={ukPayeesOnly}
                    payee={showUpdatePayeeModal}
                    onUpdate={() => setShowApproveModal(true)}
                    onClose={() => setShowUpdatePayeeModal(null)}
                  />
                )}
                {showDeletePayeeModal && (
                  <DeletePayeeModal
                    canceledTransactions={canceledTransactions}
                    onDelete={() => setShowApproveModal(true)}
                    onClose={() => setShowDeletePayeeModal(null)}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </React.Fragment>
  )
}
