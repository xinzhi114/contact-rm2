import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import './styles.scss'

interface ITransactionHistoryDownloadModalWindowProps {
  t: any
  onApply?: any
  onClose?: any
}

interface ITransactionHistoryDownloadModalWindowState {
  selectedFiltType: string
}

export class TransactionHistoryDownloadModalWindow extends Component<
  ITransactionHistoryDownloadModalWindowProps,
  ITransactionHistoryDownloadModalWindowState
> {
  constructor(props: any) {
    super(props)

    this.state = {
      selectedFiltType: '',
    }
  }

  // select File Type
  selectFileType(fileType: string) {
    this.setState({
      selectedFiltType: fileType,
    })
  }

  render() {
    const { t } = this.props
    const { selectedFiltType } = { ...this.state }

    return (
      <div className="modal-default download-modal ">
        <div className="modal-mains">
          <a
            href="#javascript"
            className="btn-close label-transparent"
            onClick={(event) => {
              this.props.onClose()
              event.preventDefault()
            }}
          >
            {t('common.btns.close')}
          </a>
          <div className="title-area">
            <div className="blue-title">
              {t('accountsDashboard.transactionHistoryDownloadModalWindow.download_transaction')}
            </div>
          </div>

          <div className="modal-info">
            <div className="row-line">
              <p className="txt">
                {t('accountsDashboard.transactionHistoryDownloadModalWindow.select_type_file')}
              </p>
            </div>
            <div className="row-line">
              <div className="four-boxs">
                <a
                  href="#javascript"
                  className={`items ${selectedFiltType === 'PDF' ? 'active' : ''}`}
                  onClick={(event) => {
                    this.selectFileType('PDF')
                    event.preventDefault()
                  }}
                >
                  <i className="icons icon-pdf" />
                  <div className="txt">PDF</div>
                </a>
                <a
                  href="#javascript"
                  className={`items ${selectedFiltType === 'CSV' ? 'active' : ''}`}
                  onClick={(event) => {
                    this.selectFileType('CSV')
                    event.preventDefault()
                  }}
                >
                  <i className="icons icon-pdf" />
                  <div className="txt">CSV</div>
                </a>
                <a
                  href="#javascript"
                  className={`items ${selectedFiltType === 'QuickBook' ? 'active' : ''}`}
                  onClick={(event) => {
                    this.selectFileType('QuickBook')
                    event.preventDefault()
                  }}
                >
                  <i className="icons icon-pdf" />
                  <div className="txt">QuickBook</div>
                </a>
                <a
                  href="#javascript"
                  className={`items ${selectedFiltType === 'Xero' ? 'active' : ''}`}
                  onClick={(event) => {
                    this.selectFileType('Xero')
                    event.preventDefault()
                  }}
                >
                  <i className="icons icon-pdf" />
                  <div className="txt">Xero</div>
                </a>
                <a
                  href="#javascript"
                  className={`items ${selectedFiltType === 'Intuit' ? 'active' : ''}`}
                  onClick={(event) => {
                    this.selectFileType('Intuit')
                    event.preventDefault()
                  }}
                >
                  <i className="icons icon-pdf" />
                  <div className="txt">Intuit</div>
                </a>
              </div>
            </div>
          </div>

          <div className="bottom-btns">
            <BaseTextLinkButton
              classNameContainer={selectedFiltType === '' ? 'disabled' : ''}
              label={t('accountsDashboard.transactionHistoryDownloadModalWindow.download_file')}
              href={'#javascript'}
              isButton
              onClick={() => {
                this.props.onApply()
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}

// @ts-ignore
export default withTranslation()(TransactionHistoryDownloadModalWindow)
