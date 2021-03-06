import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from 'react-bootstrap'
import { downloadAsDropdownOptions } from '../../../config'
import { FlexDialog } from '../../../components/FlexLayoutComponents/FlexDialog'
import { BaseTextInput } from '../../../components/BaseForm/BaseFormFields/BaseTextInput'
import { BaseDropdown } from '../../../components/BaseForm/BaseFormFields/BaseDropdown'
import GeneralTable from '../../../components/MovePaymentComponents/GeneralTable'
import formValidationSvc from '../../../services/formValidationSvc'
import './styles.scss'

interface ITransactionHistoryRightProps {
  creditTurnover: number
  debitTurnover: number
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
  onApply?: () => void
}

const TransactionHistoryRight: React.FunctionComponent<ITransactionHistoryRightProps> = (props) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`accountsDashboard.transactionHistoryRight.${key}`)

  // const [fileDownloadRef, setFileDownloadRef] = useState(useRef<HTMLAnchorElement>(null))

  const [dataList, setDataList] = useState(props.dataList)
  const [dataListShown, setDataListShown] = useState(props.dataList)

  useEffect(() => {
    setDataList(props.dataList)
    setDataListShown(props.dataList)
  }, [props.dataList])

  const [downloadAs] = useState('Download as')
  const [searchText, setSearchText] = useState('')

  const [tableChanged, setTableChanged] = useState(false)

  const { creditTurnover, debitTurnover } = { ...props }

  // change Search Text
  const changeSearchText = (value: string) => {
    setSearchText(value)

    const newDataListShown: any[] = []
    dataList.forEach((item) => {
      if (item.fieldList[1].fieldValue.toLowerCase().indexOf(value.toLowerCase()) > -1) {
        newDataListShown.push(item)
      }
    })

    setDataListShown(newDataListShown)
    setTableChanged(!tableChanged)
  }

  return (
    <FlexDialog fullHeight={true} className="transaction-history-right">
      <Modal.Header>
        <div className="top-table-bar flex-grid">
          <div className="lefts flex">
            <div className="left-img">
              <img src="../assets/online-blue.svg" alt="svg" />
            </div>
            <div className="blue-txt">{t('transaction_history')}</div>
          </div>
          <div className="rights">
            <a
              href="data:application/xml;charset=utf-8,your code here"
              download="filename.html"
              // ref={input => setFileDownloadRef(input as HTMLAnchorElement)}
              className="hide"
            >
              Save
            </a>

            <BaseDropdown
              id="dropdown-basic-download-as"
              classNameContainer={`${dataList.length === 0 ? 'disabled' : ''}`}
              disableTranslation={true}
              hideBorder={true}
              value={downloadAs}
              options={downloadAsDropdownOptions}
              onChange={() => {
                // fileDownloadRef.click();
              }}
            />

            <BaseTextInput
              id="searchTransaction"
              classNameContainer={`${dataList.length === 0 ? 'disabled' : ''}`}
              placeholder={t('search_transaction')}
              pattern="[\s\S]{0,50}"
              value={searchText}
              onChange={(event) => {
                changeSearchText(formValidationSvc.validateInputEnteringPattern(event, searchText))
              }}
            >
              <span className="icons icon-search" />
            </BaseTextInput>
          </div>
        </div>
      </Modal.Header>

      <Modal.Body>
        {dataList.length > 0 && (
          <React.Fragment>
            <div className="balance-area">
              <div className="item flex-20">
                <span className="field-name">{t('high_balance')}</span>

                <span className="field-value">£120,500.00</span>
              </div>
              <div className="item flex-20">
                <span className="field-name">{t('low_balance')}</span>

                <span className="field-value">£150.00</span>
              </div>
              <div className="item flex-30">
                <span className="field-name">{t('credit_turnover')}</span>
                <div className="percentage-bar">
                  <div
                    className="color-bar"
                    style={{
                      minWidth: `${creditTurnover}%`,
                    }}
                  />
                </div>
                <span className="percentage-value">{creditTurnover}%</span>
              </div>
              <div className="item flex-30">
                <span className="field-name">{t('debit_turnover')}</span>
                <div className="percentage-bar">
                  <div
                    className="color-bar"
                    style={{
                      minWidth: `${debitTurnover}%`,
                    }}
                  />
                </div>
                <span className="percentage-value">{debitTurnover}%</span>
              </div>
            </div>

            <GeneralTable tableChanged={tableChanged} dataList={dataListShown || []} />
          </React.Fragment>
        )}

        {dataList.length === 0 && (
          <div className="blank-area">
            <i className="icons icon-no-result" />
            <span className="txt">No results found. Please refine your search</span>
          </div>
        )}
      </Modal.Body>
    </FlexDialog>
  )
}

export default TransactionHistoryRight
