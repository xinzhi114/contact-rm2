import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BaseTextInput } from '../../../../components/BaseForm/BaseFormFields/BaseTextInput'
import { BaseTextLinkButton } from '../../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import GeneralConfirmModalWindow from '../../../../components/GeneralConfirmModalWindow'
import GeneralTable from '../../../../components/MovePaymentComponents/GeneralTable'
import formValidationSvc from '../../../../services/formValidationSvc'
import './styles.scss'

interface IRightTableProps {
  dataList: {
    checked: boolean
    transactionStatus: string
    fieldList: {
      fieldType: string
      fieldName: string
      fieldValue: string
      queryHide: boolean
    }[]
    expandData: {
      areaTitle: string
      fieldList: {
        fieldType: string
        fieldName: string
        fieldValue: string
      }[]
    }
  }[]
}

const RightTable: React.FunctionComponent<IRightTableProps> = (props) => {
  const { t } = useTranslation()

  const [searchText, setSearchText] = useState('')

  const [enableSubmitBtn, setEnableSubmitBtn] = useState(false)
  const [showBoottomBar, setShowBoottomBar] = useState(false)
  const [selectedCount, setSelectedCount] = useState(0)
  const [showTopInfoBar, setShowTopInfoBar] = useState(false)

  const [isShowApproveConfirmModalWindow, setIsShowApproveConfirmModalWindow] = useState(false)

  const [dataList] = useState(props.dataList)
  const [dataListShown, setDataListShown] = useState(props.dataList)
  const [hideLoadMore, setHideLoadMore] = useState(false)

  const [tableChanged, setTableChanged] = useState(false)

  const changeCheckbox = (event: any) => {
    let count = 0
    event.forEach((item: any) => {
      if (item.checked) {
        count++
      }
    })

    setShowBoottomBar(count > 0)
    setSelectedCount(count)
  }

  // click Approve
  const clickApprove = () => {
    dataListShown.forEach((item) => {
      if (item.checked) {
        item.transactionStatus = 'Approve'
      }
    })

    setDataListShown(dataListShown)
    setTableChanged(!tableChanged)
    setShowBoottomBar(false)
    setEnableSubmitBtn(true)
  }

  // click Reject
  const clickReject = () => {
    dataListShown.forEach((item) => {
      if (item.checked) {
        item.transactionStatus = 'Reject'
      }
    })

    setDataListShown(dataListShown)
    setTableChanged(!tableChanged)
    setShowBoottomBar(false)
    setEnableSubmitBtn(true)
  }

  // click Clear
  const clickClear = () => {
    dataListShown.forEach((item) => {
      item.checked = false
      item.transactionStatus = ''
    })

    setDataListShown(dataListShown)
    setTableChanged(!tableChanged)
    setShowBoottomBar(false)
    setEnableSubmitBtn(false)
  }

  // click Confirm
  const clickConfirm = () => {
    dataListShown.forEach((item) => {
      item.checked = false
      if (item.transactionStatus === 'Approve') {
        item.transactionStatus = 'Pending approve'
      }

      if (item.transactionStatus === 'Reject') {
        item.transactionStatus = 'Pending reject'
      }
    })

    setIsShowApproveConfirmModalWindow(false)

    setDataListShown(dataListShown)
    setTableChanged(!tableChanged)
    setShowBoottomBar(false)
    setEnableSubmitBtn(false)
    setShowTopInfoBar(true)
  }

  // change Search Text
  const changeSearchText = (value: string) => {
    setSearchText(value)

    const newDataListShown: any[] = []
    dataList.forEach((item) => {
      if (item.fieldList[0].fieldValue.toLowerCase().indexOf(value.toLowerCase()) > -1) {
        newDataListShown.push(item)
      }
    })

    setDataListShown(newDataListShown)
    setTableChanged(!tableChanged)
  }

  // click Load More
  const clickLoadMore = () => {
    dataList.forEach((item) => {
      dataListShown.push(item)
    })

    if (Math.round(Math.random() * 2) >= 1) {
      setHideLoadMore(true)
    }

    setDataListShown(dataListShown)
    setTableChanged(!tableChanged)
  }

  return (
    <div className="approve-transactions-right-table">
      {isShowApproveConfirmModalWindow && (
        <GeneralConfirmModalWindow
          titleText={t('movePayment.homeMainBanner.approve_transactions')}
          messageText={`<strong>${selectedCount} ${t(
            'movePaymentApproveTransactions.transactions'
          )}</strong>
                        <br/>${t(
                          'movePaymentApproveTransactions.has_been_submitted_successfully'
                        )}`}
          confirmBtnText={t('common.btns.confirm')}
          onClose={() => {
            clickConfirm()
          }}
        />
      )}

      {!!dataList && (
        <React.Fragment>
          <div className="top-table-bar flex-grid">
            <div className="lefts flex">
              <div className="left-img">
                <img src="../assets/approve-blue.svg" alt="svg" />
              </div>
              <div className="blue-txt">
                {t('movePaymentApproveTransactions.approve_transaction')}
              </div>
            </div>
            <div className="rights">
              <BaseTextInput
                id="searchText"
                placeholder={t('movePaymentOnlineTransactionStatus.search_transaction_name')}
                pattern="[\s\S]{0,50}"
                value={searchText}
                onChange={(event) => {
                  changeSearchText(
                    formValidationSvc.validateInputEnteringPattern(event, searchText)
                  )
                }}
              >
                <span className="icons icon-search" />
              </BaseTextInput>

              <BaseTextLinkButton
                label={t('common.btns.clear')}
                onClick={() => {
                  clickClear()
                }}
              />

              <BaseTextLinkButton
                classNameContainer={`${enableSubmitBtn ? '' : 'disabled'}`}
                label={t('common.btns.submit')}
                isButton={true}
                onClick={() => {
                  setIsShowApproveConfirmModalWindow(true)
                }}
              />
            </div>
          </div>

          {showTopInfoBar && (
            <div className="gray-bg-block">
              <a
                href="#javascript"
                className="btn-close label-transparent"
                onClick={(event) => {
                  setShowTopInfoBar(false)
                  event.preventDefault()
                }}
              >
                {t('common.btns.close')}
              </a>
              <div className="bold-title">
                <i className="icons icon-info" />
                {t('movePaymentApproveTransactions.important_information')}
              </div>
              <p className="txt">
                {t('movePaymentApproveTransactions.your_request_has_been_created')}
              </p>
            </div>
          )}

          <GeneralTable
            tableChanged={tableChanged}
            showCheckbox={true}
            dataList={dataListShown}
            changeCheckbox={(event: any) => {
              changeCheckbox(event)
            }}
          >
            {!hideLoadMore && (
              <div className="load-more">
                <BaseTextLinkButton
                  label={t('common.labels.load_more')}
                  href={'#javascript'}
                  onClick={() => {
                    clickLoadMore()
                  }}
                />
              </div>
            )}
          </GeneralTable>

          {showBoottomBar && (
            <div className="table-bottom-approve flex-grid">
              <div className="lefts">
                <div className="minu-border" />
                <span className="txt label-txt">
                  {selectedCount} {t('movePaymentApproveTransactions.transactions_selected')}
                </span>
              </div>
              <div className="rights">
                <BaseTextLinkButton
                  label={t('common.btns.approve')}
                  isButton={true}
                  onClick={() => {
                    clickApprove()
                  }}
                />
                <BaseTextLinkButton
                  classNameContainer={'reject-btn'}
                  label={t('common.btns.reject')}
                  isButton={true}
                  onClick={() => {
                    clickReject()
                  }}
                />
              </div>
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  )
}

export default RightTable
