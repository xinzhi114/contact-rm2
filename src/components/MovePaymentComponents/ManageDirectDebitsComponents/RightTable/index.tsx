import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BaseTextInput } from '../../../../components/BaseForm/BaseFormFields/BaseTextInput'
import { BaseTextLinkButton } from '../../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import GeneralGrayConfirmModalWindow from '../../../../components/GeneralGrayConfirmModalWindow'
import GeneralConfirmModalWindow from '../../../../components/GeneralConfirmModalWindow'
import GeneralTable from '../../../../components/MovePaymentComponents/GeneralTable'
import formValidationSvc from '../../../../services/formValidationSvc'
import './styles.scss'

interface IRightTableProps {
  dataList: {
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

  const [isShowCancelModalWindow, setIsShowCancelModalWindow] = useState(false)
  const [isShowCancelledConfirmModalWindow, setIsShowCancelledConfirmModalWindow] = useState(false)
  const [accountNumber, setAccountNumber] = useState('')
  const [cancelIndex, setCancelIndex] = useState(0)

  const [dataList] = useState(props.dataList)
  const [dataListShown, setDataListShown] = useState(props.dataList)
  const [hideLoadMore, setHideLoadMore] = useState(false)

  const [tableChanged, setTableChanged] = useState(false)

  // click Action
  const clickAction = (actionData: any) => {
    setCancelIndex(actionData.index)

    setAccountNumber(actionData.actionValue)
    setIsShowCancelModalWindow(true)
  }

  // confirm Cancel
  const confirmCancel = () => {
    dataListShown[cancelIndex].fieldList[5].fieldValue = ''

    setDataListShown(dataListShown)

    setIsShowCancelModalWindow(false)
    setIsShowCancelledConfirmModalWindow(true)
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
    <div className="manage-direct-debits-right-table">
      {isShowCancelModalWindow && (
        <GeneralGrayConfirmModalWindow
          titleText={t('movePaymentManageDirectDebits.cancel_direct_debit')}
          messageText={`${t('movePaymentManageDirectDebits.want_to_cancel_direct_debit')}`}
          confirmBtnText={t('common.btns.delete')}
          onClose={() => {
            setIsShowCancelModalWindow(false)
          }}
          onConfirm={() => {
            confirmCancel()
          }}
        />
      )}

      {isShowCancelledConfirmModalWindow && (
        <GeneralConfirmModalWindow
          titleText={t('movePaymentManageDirectDebits.cancel_direct_debit')}
          messageText={`${t('movePaymentManageDirectDebits.direct_debit_number')} \
                          #<strong>${accountNumber}</strong>  ${t(
            'movePaymentManageDirectDebits.successfully_canceled'
          )}`}
          confirmBtnText={t('common.btns.confirm')}
          onClose={() => {
            setIsShowCancelledConfirmModalWindow(false)
          }}
        />
      )}

      {!!dataList && (
        <React.Fragment>
          <div className="top-table-bar flex-grid">
            <div className="lefts flex">
              <div className="left-img">
                <img src="../assets/manage-direct-debits-top.svg" alt="svg" />
              </div>
              <div className="blue-txt">
                {t('movePaymentManageDirectDebits.manage_direct_debits')}
              </div>
            </div>
            <div className="rights">
              <BaseTextInput
                id="searchText"
                placeholder={t('movePaymentManageDirectDebits.search_direct_debits')}
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
            </div>
          </div>

          <GeneralTable
            tableChanged={tableChanged}
            dataList={dataListShown}
            clickAction={(actionData: any) => {
              clickAction(actionData)
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
        </React.Fragment>
      )}
    </div>
  )
}

export default RightTable
