import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import { BaseCheckbox } from '../../BaseForm/BaseFormFields/BaseCheckbox'
import './styles.scss'
import { TableLinkButton } from './TableLinkButton'

interface IGeneralTableProps {
  tableChanged: boolean
  hideColumnNames?: boolean
  showCheckbox?: boolean
  dataList: {
    expanded?: boolean
    checked?: boolean
    transactionStatus?: string
    userNameColor?: string
    userNameLabelColor?: string
    userNameShortLabel?: string
    orderDetails?: {
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
      isHide?: boolean
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
  changeCheckbox?: any
  clickAction?: any
}

const GeneralTable: React.FunctionComponent<IGeneralTableProps> = (props) => {
  const { t } = useTranslation()
  const [, updateState] = React.useState({})
  const forceUpdate = React.useCallback(() => updateState({}), [])
  const [showCheckbox] = useState(props.showCheckbox)
  const [dataList, setDataList] = useState(props.dataList)

  const { hideColumnNames, children } = props

  const expandRow = (index: number) => {
    dataList[index].expanded = !dataList[index].expanded
    setDataList(dataList)
    forceUpdate()
  }

  useEffect(() => {
    setDataList(props.dataList)
  }, [props.tableChanged, props.dataList])

  // handle Check Change
  const handleCheckChange = (index: number, checked: boolean) => {
    dataList[index].checked = checked

    setDataList(dataList)
    props.changeCheckbox(dataList)
  }

  return (
    <div className="table-data">
      {dataList.length > 0 && (
        <div className="tables">
          {!hideColumnNames && (
            <div className="row-th">
              {showCheckbox && (
                <div className={`col-th`}>
                  <div className="spacing" />
                </div>
              )}
              {dataList[0].fieldList &&
                dataList[0].fieldList.map((item: any, index: number) => (
                  <div className={`col-th ${item.queryHide ? 'query-hide' : ''}`} key={index}>
                    <div className="spacing">{t('tablesColumns.' + item.fieldName)}</div>
                  </div>
                ))}
            </div>
          )}
          <div className="table-body">
            <div className="list-wrap">
              {dataList.map((item: any, index: number) => (
                <div key={index} className={`expend-wrap ${item.expanded ? 'open' : ''}`}>
                  <div className={`row-td ${item.checked || false ? 'active' : ''}`}>
                    {showCheckbox && (
                      <div className={`col-td`}>
                        <div className="spacing">
                          <BaseCheckbox
                            classNameContainer="interest"
                            value={[!!item.checked]}
                            id={`row-check-${index}`}
                            options={['']}
                            preventDefault={true}
                            onChange={(value) => handleCheckChange(index, value[0])}
                          />
                        </div>
                      </div>
                    )}
                    {item.fieldList &&
                      item.fieldList.map((fieldItem: any, fieldIndex: number) => (
                        <div
                          className={`col-td ${fieldItem.isHide ? 'hide' : ''} ${
                            fieldItem.queryHide ? 'query-hide' : ''
                          }`}
                          key={fieldIndex}
                        >
                          {(() => {
                            const getUpdateButton = (fullWidth?: boolean, smaller?: boolean) => (
                              <TableLinkButton
                                tooltip={{
                                  id: `update-${index}-${fieldIndex}`,
                                  text: t('common.btns.update'),
                                }}
                                className={`icons icon-edit${
                                  !smaller ? '-bigger' : ''
                                } label-transparent`}
                                onClick={() => {
                                  props.clickAction({
                                    index,
                                    actionName: 'Update',
                                    actionValue: item,
                                  })
                                }}
                                fullWidth={fullWidth}
                              />
                            )
                            switch (fieldItem.fieldType) {
                              case 'expand':
                                return (
                                  <div className="spacing">
                                    <TableLinkButton
                                      onClick={() => {
                                        expandRow(index)
                                      }}
                                      open={item.expanded || false}
                                    >
                                      {fieldItem.fieldValue}
                                      <i className="icons icon-drop" />
                                    </TableLinkButton>
                                  </div>
                                )
                              case 'status':
                                return (
                                  <div className="spacing">
                                    <span
                                      className={`${
                                        fieldItem.fieldValue === 'Accepted'
                                          ? 'green-link'
                                          : fieldItem.fieldValue === 'Cancelled'
                                          ? 'red-link'
                                          : ''
                                      }`}
                                    >
                                      {t('tableRows.' + fieldItem.fieldValue)}
                                    </span>
                                  </div>
                                )
                              case 'clearance-status-label':
                                return (
                                  <div className="spacing">
                                    <TableLinkButton
                                      tooltip={{
                                        id: `tooltip-${index}-${fieldIndex}`,
                                        text: t('tableRows.' + fieldItem.fieldValue),
                                      }}
                                      className={`icons icon-clearance-status label-transparent
                                      ${
                                        fieldItem.fieldValue === 'Uncleared transaction'
                                          ? 'uncleared'
                                          : ''
                                      }`}
                                    />
                                  </div>
                                )
                              case 'strongLabel-amount':
                                return (
                                  <div className="spacing">
                                    <span
                                      className={`strong ${
                                        fieldItem.fieldValue.startsWith('-')
                                          ? 'red-link'
                                          : 'green-link'
                                      }`}
                                    >
                                      {fieldItem.fieldValue}
                                    </span>
                                  </div>
                                )
                              case 'furtureData':
                                return (
                                  <div className="spacing">
                                    <div className="txt font-size-12">
                                      {t('tablesColumns.future_date')}
                                    </div>
                                    <div className="txt font-size-12">{fieldItem.fieldValue}</div>
                                  </div>
                                )
                              case 'currency':
                                return (
                                  <div className="spacing">
                                    <span className="price">{fieldItem.fieldValue}</span>
                                  </div>
                                )
                              case 'action-edit':
                              case 'action-edit-approve':
                                return (
                                  <div className="spacing">
                                    {fieldItem.fieldValue === '' &&
                                      getUpdateButton(
                                        fieldItem.fieldType === 'action-edit-approve'
                                      )}

                                    {fieldItem.fieldType === 'action-edit-approve' &&
                                      fieldItem.fieldValue === 'approve' && (
                                        <BaseTextLinkButton
                                          classNameContainer={'approve-btn'}
                                          label={t('common.btns.approve')}
                                          href={'#javascript'}
                                          isButton={true}
                                          onClick={() => {
                                            props.clickAction({
                                              index,
                                              actionName: 'Approve',
                                              actionValue: item,
                                            })
                                          }}
                                        />
                                      )}
                                  </div>
                                )
                              case 'action-single-label':
                                return (
                                  <div className="spacing">
                                    <TableLinkButton
                                      className={`action-txt red-link ${
                                        fieldItem.fieldValue !== '' ? '' : 'label-transparent'
                                      }`}
                                      onClick={() => {
                                        props.clickAction({
                                          index,
                                          actionName: fieldItem.fieldValue,
                                          actionValue: item.id,
                                        })
                                      }}
                                    >
                                      {t(
                                        'tableRows.' +
                                          (fieldItem.fieldValue !== ''
                                            ? fieldItem.fieldValue
                                            : 'Placeholder')
                                      )}
                                    </TableLinkButton>
                                  </div>
                                )
                              case 'action-edit-delete':
                                return (
                                  <div className="spacing d-flex">
                                    {getUpdateButton(false, true)}

                                    <TableLinkButton
                                      className="icons icon-del label-transparent"
                                      tooltip={{
                                        id: `delete-${index}-${fieldIndex}`,
                                        text: t('common.btns.delete'),
                                      }}
                                      onClick={() => {
                                        props.clickAction({
                                          index,
                                          actionName: 'Delete',
                                          actionValue: item.fieldList[1].fieldValue,
                                        })
                                      }}
                                    />
                                  </div>
                                )
                              case 'action-edit-cancel':
                                return (
                                  <div className="spacing d-flex justify-content-around">
                                    {getUpdateButton()}

                                    <TableLinkButton
                                      className="action-txt red-link"
                                      onClick={() => {
                                        props.clickAction({
                                          index,
                                          actionName: 'Cancel',
                                          actionValue: item,
                                        })
                                      }}
                                    >
                                      {t('common.btns.cancel')}
                                    </TableLinkButton>
                                  </div>
                                )
                              case 'userNameShortLabel':
                                return (
                                  <NavLink
                                    to={`/manageAccess/userLists/0`}
                                    className="spacing user-name"
                                  >
                                    <div
                                      className="avatar"
                                      style={{
                                        backgroundColor: `${item.userNameColor}`,
                                        color: `${item.userNameLabelColor}`,
                                      }}
                                    >
                                      {item.userNameShortLabel}
                                    </div>
                                    <span className="txt">
                                      <strong className="weight-700">{fieldItem.fieldValue}</strong>
                                    </span>
                                  </NavLink>
                                )
                              case 'strongLabel':
                                return (
                                  <div className="spacing">
                                    <span className="txt">
                                      <strong>{fieldItem.fieldValue}</strong>
                                    </span>
                                  </div>
                                )
                              case 'request_pending_label':
                                return (
                                  <div className="spacing">
                                    <span className="txt gray-txt">
                                      {fieldItem.fieldValue ? fieldItem.fieldValue : ' '}
                                    </span>
                                  </div>
                                )
                              case 'strongLabel-currency':
                                return (
                                  <div className="spacing">
                                    <span className="txt">
                                      <strong className="weight-700">
                                        £ {fieldItem.fieldValue}
                                      </strong>
                                    </span>
                                  </div>
                                )
                              case 'label-status':
                                return (
                                  <div className="spacing">
                                    <div className="txt">{fieldItem.fieldValue}</div>
                                    <div
                                      className={`txt ${
                                        item.transactionStatus === 'Approve' ? 'green-txt' : ''
                                      }
                                                      ${
                                                        item.transactionStatus === 'Reject'
                                                          ? 'red-txt'
                                                          : ''
                                                      }
                                                      ${
                                                        item.transactionStatus === 'Pending approve'
                                                          ? 'red-txt'
                                                          : ''
                                                      }
                                                      ${
                                                        item.transactionStatus === 'Pending reject'
                                                          ? 'red-txt'
                                                          : ''
                                                      }`}
                                    >
                                      {item.transactionStatus}
                                    </div>
                                  </div>
                                )
                              case 'label-frequency':
                                return (
                                  <div className="spacing">
                                    <span
                                      className={`txt ${
                                        fieldItem.fieldValue === 'Monthly' ? 'font-size-12' : ''
                                      }`}
                                      dangerouslySetInnerHTML={{ __html: fieldItem.fieldValue }}
                                    />
                                    {fieldItem.fieldValue === 'Monthly' && (
                                      <span className="txt font-size-12">
                                        <br />
                                        further notice
                                      </span>
                                    )}
                                  </div>
                                )
                              case 'card_linked_number_label':
                                return (
                                  <div className="spacing">
                                    <div className="br-uppercase">
                                      {t('tablesColumns.debit_card')}
                                    </div>
                                    <strong className="br-strong">
                                      {fieldItem.fieldValue} {t('tablesColumns.cards_linked')}
                                    </strong>
                                  </div>
                                )
                              case 'access_level_label':
                                return (
                                  <div className="spacing">
                                    <div className="br-uppercase">
                                      {t('tablesColumns.access_level')}
                                    </div>
                                    <strong className="br-strong">{fieldItem.fieldValue}</strong>
                                  </div>
                                )
                              case 'label-size-12':
                                return (
                                  <div className="spacing">
                                    <span
                                      className="txt font-size-12"
                                      dangerouslySetInnerHTML={{ __html: fieldItem.fieldValue }}
                                    />
                                  </div>
                                )
                              case 'label':
                              default:
                                return (
                                  <div className="spacing">
                                    <span
                                      className="txt"
                                      dangerouslySetInnerHTML={{ __html: fieldItem.fieldValue }}
                                    />
                                  </div>
                                )
                            }
                          }).call(fieldItem)}
                        </div>
                      ))}
                  </div>
                  {item.expandData && (
                    <div className="expend-panel">
                      <div className="bold-title">
                        {t('tableRows.' + item.expandData.areaTitle)}
                      </div>
                      <div className="data-detail">
                        {item.expandData.fieldList &&
                          item.expandData.fieldList.map((fieldItem: any, fieldIndex: number) => (
                            <div className="group" key={fieldIndex}>
                              <div className="label-txt">
                                {t('tablesColumns.' + fieldItem.fieldName)}
                              </div>
                              {(() => {
                                switch (fieldItem.fieldType) {
                                  case 'status':
                                    return (
                                      <div className="values green">
                                        {t('tableRows.' + fieldItem.fieldValue)}
                                      </div>
                                    )
                                  case 'label':
                                  default:
                                    return <div className="values">{fieldItem.fieldValue}</div>
                                }
                              }).call(fieldItem)}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {children}
        </div>
      )}
    </div>
  )
}

export default GeneralTable
