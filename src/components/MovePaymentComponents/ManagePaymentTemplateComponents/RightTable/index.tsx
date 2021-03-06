import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BaseTextInput } from '../../../../components/BaseForm/BaseFormFields/BaseTextInput'
import { BaseTextLinkButton } from '../../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import GeneralGrayConfirmModalWindow from '../../../../components/GeneralGrayConfirmModalWindow'
import GeneralConfirmModalWindow from '../../../../components/GeneralConfirmModalWindow'
import GeneralTable from '../../../../components/MovePaymentComponents/GeneralTable'
import UpdateTemplateModalWindow from '../../../../components/MovePaymentComponents/ManagePaymentTemplateComponents/UpdateTemplateModalWindow'
import formValidationSvc from '../../../../services/formValidationSvc'
import './styles.scss'

interface IRightTableProps {
  fromAccountList: {
    label: string
    value: string
    number: string
    availableBalance: string
  }[]
  dataList: {
    debitAccountId: string
    debitAccountAvailableBalance: string
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

  const [isShowDeleteModalWindow, setIsShowDeleteModalWindow] = useState(false)
  const [isShowDeletedConfirmModalWindow, setIsShowDeletedConfirmModalWindow] = useState(false)
  const [isShowUpdatedConfirmModalWindow, setIsShowUpdatedConfirmModalWindow] = useState(false)
  const [isShowUpdateTemplateModalWindow, setIsShowUpdateTemplateModalWindow] = useState(false)

  const [templateData, setTemplateData] = useState(null)
  const [rowIndex, setRowIndex] = useState(0)

  const [dataList] = useState(props.dataList)
  const [fromAccountList] = useState(props.fromAccountList)
  const [dataListShown, setDataListShown] = useState(props.dataList)
  const [hideLoadMore, setHideLoadMore] = useState(false)

  const [tableChanged, setTableChanged] = useState(false)

  // click Action
  const clickAction = (actionData: any) => {
    setRowIndex(actionData.index)

    if (actionData.actionName === 'Update') {
      setTemplateData(actionData.actionValue)
      setIsShowUpdateTemplateModalWindow(true)
    }

    if (actionData.actionName === 'Delete') {
      setTemplateData(actionData.actionValue)
      setIsShowDeleteModalWindow(true)
    }
  }

  // confirm Delete
  const confirmDelete = () => {
    dataListShown.splice(rowIndex, 1)

    setDataListShown(dataListShown)

    setIsShowDeleteModalWindow(false)
    setIsShowDeletedConfirmModalWindow(true)
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
    <div className="manage-payment-template-right-table">
      {isShowDeleteModalWindow && (
        <GeneralGrayConfirmModalWindow
          titleText={t('movePaymentManagePaymentTemplate.delete_template')}
          messageText={`${t('movePaymentManagePaymentTemplate.are_you_sure_to_delete')}`}
          confirmBtnText={t('common.btns.delete')}
          onClose={() => {
            setIsShowDeleteModalWindow(false)
          }}
          onConfirm={() => {
            confirmDelete()
          }}
        />
      )}

      {isShowDeletedConfirmModalWindow && (
        <GeneralConfirmModalWindow
          titleText={t('movePaymentManagePaymentTemplate.delete_template')}
          messageText={`${t('movePaymentManagePaymentTemplate.payment_template')} \
                          '<strong>${templateData}</strong>'<br/>${t(
            'movePaymentManagePaymentTemplate.has_been_deleted_successfully'
          )}`}
          confirmBtnText={t('common.btns.confirm')}
          onClose={() => {
            setIsShowDeletedConfirmModalWindow(false)
          }}
        />
      )}

      {!!templateData && isShowUpdateTemplateModalWindow && (
        <UpdateTemplateModalWindow
          fromAccountList={fromAccountList}
          dataList={templateData}
          onClose={() => {
            setIsShowUpdateTemplateModalWindow(false)
          }}
          onUpdate={() => {
            setIsShowUpdateTemplateModalWindow(false)
            setIsShowUpdatedConfirmModalWindow(true)
          }}
        />
      )}

      {isShowUpdatedConfirmModalWindow && (
        <GeneralConfirmModalWindow
          titleText={t('movePaymentManagePaymentTemplate.update_template')}
          messageText={`${t('movePaymentManagePaymentTemplate.payment_template_has_been_updated')}`}
          confirmBtnText={t('common.btns.confirm')}
          onClose={() => {
            setIsShowUpdatedConfirmModalWindow(false)
          }}
        />
      )}

      {!!dataList && (
        <React.Fragment>
          <div className="top-table-bar flex-grid">
            <div className="lefts flex">
              <div className="left-img">
                <img src="../assets/payment-alert.svg" alt="svg" />
              </div>
              <div className="blue-txt">
                {t('movePaymentManagePaymentTemplate.manage_payment_template')}
              </div>
            </div>
            <div className="rights">
              <BaseTextInput
                id="searchText"
                placeholder={t('movePaymentManagePaymentTemplate.search_payment_template')}
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
