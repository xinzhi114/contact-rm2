import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BaseTextInput } from '../../../../components/BaseForm/BaseFormFields/BaseTextInput'
import { BaseTextLinkButton } from '../../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import GeneralConfirmModalWindow from '../../../../components/GeneralConfirmModalWindow'
import UpdateStandingOrderModalWindow from '../../../../components/MovePaymentComponents/ManageStandingOrdersComponents/UpdateStandingOrderModalWindow'
import CancelStandingOrderModalWindow from '../../../../components/MovePaymentComponents/ManageStandingOrdersComponents/CancelStandingOrderModalWindow'
import GeneralTable from '../../../../components/MovePaymentComponents/GeneralTable'
import formValidationSvc from '../../../../services/formValidationSvc'
import './styles.scss'

interface IRightTableProps {
  individualBusiness: string
  dataList: {
    checked?: boolean
    orderDetails: {
      fromAccount: string
      regularAmount: string
      finalAmount: string
      sortCode: string
      accountNumber: string
    }
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
    } | null
  }[]
  clickCreate?: any
}

const RightTable: React.FunctionComponent<IRightTableProps> = (props) => {
  const { t } = useTranslation()

  const [searchText, setSearchText] = useState('')

  const [isShowUpdateModalWindow, setIsShowUpdateModalWindow] = useState(false)
  const [isShowUpdatedConfirmModalWindow, setIsShowUpdatedConfirmModalWindow] = useState(false)
  const [isShowCancelModalWindow, setIsShowCancelModalWindow] = useState(false)
  const [isShowCancelledConfirmModalWindow, setIsShowCancelledConfirmModalWindow] = useState(false)
  const [standingOrdersData, setStandingOrdersData] = useState(props.dataList[0])
  const [rowIndex, setRowIndex] = useState(0)

  const [dataList] = useState(props.dataList)
  const { individualBusiness } = { ...props }
  const [dataListShown, setDataListShown] = useState(props.dataList)
  const [hideLoadMore, setHideLoadMore] = useState(false)

  const [tableChanged, setTableChanged] = useState(false)

  // click Action
  const clickAction = (actionData: any) => {
    setStandingOrdersData(actionData.actionValue)
    setRowIndex(actionData.index)

    if (actionData.actionName === 'Update') {
      setIsShowUpdateModalWindow(true)
    }

    if (actionData.actionName === 'Cancel') {
      setIsShowCancelModalWindow(true)
    }
  }

  // confirm Update
  const confirmUpdate = () => {
    setIsShowUpdateModalWindow(false)
    setIsShowUpdatedConfirmModalWindow(true)
  }

  // confirm Delete
  const confirmDelete = () => {
    dataListShown.splice(rowIndex, 1)

    setDataListShown(dataListShown)

    setIsShowCancelledConfirmModalWindow(false)
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
    <div className="manage-standing-orders-right-table">
      {isShowUpdateModalWindow && (
        <UpdateStandingOrderModalWindow
          individualBusiness={individualBusiness}
          dataList={standingOrdersData}
          onClose={() => {
            setIsShowUpdateModalWindow(false)
          }}
          onUpdate={() => confirmUpdate()}
        />
      )}

      {isShowUpdatedConfirmModalWindow && (
        <GeneralConfirmModalWindow
          titleText={t('movePaymentManageStandingOrders.update_standing_order')}
          messageText={`${t(
            'movePaymentManageStandingOrders.update_standing_order_been_submitted'
          )}`}
          confirmBtnText={t('common.btns.confirm')}
          onClose={() => {
            setIsShowUpdatedConfirmModalWindow(false)
          }}
        />
      )}

      {!!standingOrdersData && isShowCancelModalWindow && (
        <CancelStandingOrderModalWindow
          individualBusiness={individualBusiness}
          dataList={standingOrdersData}
          onClose={() => {
            setIsShowCancelModalWindow(false)
          }}
          onSubmit={() => {
            setIsShowCancelModalWindow(false)
            setIsShowCancelledConfirmModalWindow(true)
          }}
        />
      )}

      {!!standingOrdersData && isShowCancelledConfirmModalWindow && (
        <GeneralConfirmModalWindow
          titleText={t('movePaymentManageStandingOrders.cancel_standing_order')}
          messageText={`${t('movePaymentManageStandingOrders.standing_order')} #<strong>${
            (standingOrdersData as any)?.id
          }</strong> ${t('movePaymentManageStandingOrders.successfully_canceled')}`}
          confirmBtnText={t('common.btns.confirm')}
          onClose={() => {
            setIsShowCancelledConfirmModalWindow(false)
            confirmDelete()
          }}
        />
      )}

      {!!dataList && (
        <React.Fragment>
          <div className="top-table-bar flex-grid">
            <div className="lefts flex">
              <div className="left-img">
                <img src="../assets/manage-standing-order@2x.png" alt="svg" />
              </div>
              <div className="blue-txt">
                {t('movePaymentManageStandingOrders.manage_standing_order')}
              </div>
            </div>
            <div className="rights">
              <BaseTextInput
                id="searchStandingOrder"
                placeholder={t('movePaymentManageStandingOrders.search_standing_order')}
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
                label={t('movePaymentManageStandingOrders.create_standing_order')}
                isButton
                onClick={() => {
                  props.clickCreate()
                }}
              />
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
