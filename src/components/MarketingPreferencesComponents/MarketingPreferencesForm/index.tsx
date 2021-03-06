import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../BaseForm/BaseFormFields/BaseTextLinkButton'
import IconSetting from '../../AccountLoanComponents/IconSetting'
import LoadingSpinner from '../../LoadingSpinner'
import './styles.scss'
import { MarketingPref } from '../../../domain/MarketingPref'
import _ from 'lodash'
import { ASF } from '../../../common/Api/Services/ApiServiceFactory'
import { MarketPrefService } from '../../../common/Api/Services/MarketPrefService'

const PREF_KEYS: string[] = ['personalizedAds', 'nonPersonalizedAds', 'otherOffers']
const CHANNELS = ['EMAIL', 'POST', 'TELEPHONE']

interface IMarketingPreferencesFormProps {
  t: any
  formType: 'page' | 'modal'
  lastUpdated: string
}

interface IMarketingPreferencesFormState {
  dataList?: MarketingPref[]
  openedPref?: MarketingPref
  error?: string
  loading?: boolean
}

export class MarketingPreferencesForm extends Component<
  IMarketingPreferencesFormProps,
  IMarketingPreferencesFormState
> {
  constructor(props: any) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.fetchPref()
  }
  componentWillUnmount() {
    this.setState = () => null
  }

  /**
   * fill channels
   * @param rspBody the response body
   * @param key the key
   */
  fillChannels = (rspBody: any, key: string) => {
    const channels = rspBody[key].preferredChannels || []
    CHANNELS.forEach((cName) => {
      if (!channels.some((c: any) => c.channel === cName)) {
        channels.push({ channel: cName, selected: false })
      }
    })
    rspBody[key].preferredChannels = channels
  }

  /**
   * fetch pref
   */
  fetchPref = () => {
    this.setState({ error: undefined })
    ASF.getService(MarketPrefService)
      .getPreferences()
      .then((rsp: any) => {
        const rspPref = rsp.body
        this.fillChannels(rspPref, PREF_KEYS[2])
        const pref: MarketingPref[] = PREF_KEYS.map((key) => ({
          tip: `${key}_tip`,
          title: key,
          key,
          ...rsp.body[key],
        }))
        this.setState({ dataList: pref })
      })
      .catch((e) => this.setState({ error: e }))
  }

  /**
   * save pref
   * @param pref the pref array
   * @param cb the callback
   */
  savePref = (pref?: MarketingPref[], cb?: (ret: boolean) => void) => {
    if (!this.state.dataList) {
      return
    }
    pref = pref || this.state.dataList
    const body: any = {}
    pref.forEach((p) => {
      body[p.key] = {
        grant: p.grant,
        preferredChannels: p.preferredChannels,
      }
    })
    this.setState({ error: undefined, loading: true })
    ASF.getService(MarketPrefService)
      .updatePreferences(body)
      .then(() => {
        if (cb) cb(true)
        this.setState({ dataList: pref })
      })
      .catch((e) => {
        if (cb) cb(false)
        this.setState({ error: e })
      })
      .finally(() => this.setState({ loading: false }))
  }
  isOpened = (key: string) => {
    return this.state.openedPref && this.state.openedPref.key === key
  }

  isAutoSave = () => {
    return this.props.formType === 'page'
  }

  // handle Check Change
  handleCheckChange(index: number, event: any) {
    if (!this.state.dataList) {
      return
    }
    const pref = _.cloneDeep(this.state.dataList)
    pref[index].grant = event.target.checked
    if (this.isAutoSave()) {
      this.savePref(pref)
    } else {
      this.setState({ dataList: pref })
    }
  }

  // handle Popup Check Change
  handlePopupCheckChange(rowIndex: number, popupCheckboxIndex: number, event: any) {
    if (!this.state.openedPref) {
      return
    }
    const openedPref = _.clone(this.state.openedPref)
    // options
    if (popupCheckboxIndex > -1) {
      openedPref.preferredChannels[popupCheckboxIndex].selected = event.target.checked
    } else {
      // all
      openedPref.preferredChannels.forEach((item) => {
        item.selected = event.target.checked
      })
    }
    openedPref.grant = _.some(openedPref.preferredChannels, (c) => c.selected)
    this.setState({ openedPref }, () => {
      if (!this.isAutoSave()) {
        this.savePopup(rowIndex)
      }
    })
  }

  // open Popup
  openPopup(pref: MarketingPref) {
    this.setState({ openedPref: _.cloneDeep(pref) })
  }

  // save Popup
  savePopup(rowIndex: number) {
    if (!this.state.dataList || !this.state.openedPref) {
      return
    }
    const dataList = _.cloneDeep(this.state.dataList)
    dataList[rowIndex] = this.state.openedPref
    if (this.isAutoSave()) {
      this.savePref(dataList, () => this.setState({ openedPref: undefined }))
    } else {
      this.setState({ dataList })
    }
  }

  // close Popup
  closePopup() {
    this.setState({ openedPref: undefined })
  }

  // other Marketing Choices Green Text
  getChoicesGreenText(rowIndex: number) {
    const { dataList } = this.state
    let text = ''
    if (dataList) {
      dataList[rowIndex].preferredChannels.forEach((item) => {
        if (item.selected) {
          text += text === '' ? item.channel : `, ${item.channel}`
        }
      })
    }

    return text
  }

  /**
   * check all option are selected for a row ?
   */
  allOptionsChecked = (row: MarketingPref) => {
    return !row.preferredChannels.some((item) => !item.selected)
  }

  render() {
    const { t, formType, lastUpdated } = this.props
    const { dataList, error, openedPref } = this.state

    return (
      <div className="marketing-preferences-form">
        {!dataList && !error && <LoadingSpinner />}

        {error && <div className="loading-spinner">{error}</div>}
        {dataList && (
          <div className="debit-card-list">
            {dataList.map((item, index) => (
              <div key={index}>
                <div
                  className={`row-line flex-grid ${
                    formType === 'modal' &&
                    this.isOpened(item.key) &&
                    item.preferredChannels.length > 0
                      ? 'open-expend'
                      : ''
                  }`}
                >
                  <div className="lefts">
                    <div className="right-txt">
                      <div className="blue-txt">
                        {t('marketingPreferences.marketingPreferencesForm.' + item.title)}
                        <div className="question-wrap ">
                          <a
                            href="#javascript"
                            className="icons icon-question label-transparent"
                            onClick={(event) => event.preventDefault()}
                          >
                            {t('common.btns.question')}
                          </a>
                          <div className="open-panel">
                            <div className="title">
                              {t('marketingPreferences.marketingPreferencesForm.' + item.title)}
                            </div>
                            <div className="txt">
                              {t('marketingPreferences.marketingPreferencesForm.' + item.tip)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="green-txt">{this.getChoicesGreenText(index)}</div>
                    </div>
                  </div>
                  <div className="rights">
                    {lastUpdated && (
                      <div className="check-link">
                        {item.grant && (
                          <a
                            href="#javascript"
                            className="on"
                            onClick={(event) => event.preventDefault()}
                          >
                            {t('marketingPreferences.marketingPreferencesForm.on')}
                          </a>
                        )}
                        {!item.grant && (
                          <a
                            href="#javascript"
                            className="off"
                            onClick={(event) => event.preventDefault()}
                          >
                            {t('marketingPreferences.marketingPreferencesForm.off')}
                          </a>
                        )}
                      </div>
                    )}

                    {!lastUpdated && (
                      <div
                        className={`setting-wrap other-marketing-setting-wrap ${
                          this.isOpened(item.key) && formType === 'page' ? 'open' : ''
                        }`}
                      >
                        {item.preferredChannels.length > 0 && (
                          <IconSetting isActive={item.grant} onClick={() => this.openPopup(item)} />
                        )}
                        <div className="check-round-wrap">
                          {item.preferredChannels.length > 0 && (
                            <input
                              type="checkbox"
                              id={`check-preferences-${index}`}
                              checked={item.grant}
                              onChange={() => null}
                              onClick={(event) => {
                                this.openPopup(item)
                                event.preventDefault()
                              }}
                            />
                          )}
                          {item.preferredChannels.length === 0 && (
                            <input
                              type="checkbox"
                              id={`check-preferences-${index}`}
                              checked={item.grant}
                              onChange={(event) => {
                                this.handleCheckChange(index, event)
                              }}
                            />
                          )}
                          <label htmlFor={`check-preferences-${index}`} />
                        </div>
                        {openedPref && (
                          <div className="tip-panel ">
                            <div className="top-area">
                              <div className="black-title">
                                {t('marketingPreferences.marketingPreferencesForm.get_offers_by')}
                              </div>
                              <div className="list">
                                <ul>
                                  <li>
                                    <div className="checkbox-wrap">
                                      <input
                                        type="checkbox"
                                        className="text-message"
                                        id={`check-all-${index}`}
                                        checked={this.allOptionsChecked(openedPref)}
                                        onChange={(event) =>
                                          this.handlePopupCheckChange(index, -1, event)
                                        }
                                      />
                                      <label htmlFor={`check-all-${index}`}>
                                        {t('marketingPreferences.marketingPreferencesForm.all')}
                                      </label>
                                    </div>
                                  </li>
                                  {openedPref.preferredChannels &&
                                    openedPref.preferredChannels.map(
                                      (popupCheckboxItem, popupCheckboxIndex) => (
                                        <li key={popupCheckboxIndex}>
                                          <div className="checkbox-wrap">
                                            <input
                                              type="checkbox"
                                              className="text-message"
                                              id={`check-popup-${index}-${popupCheckboxIndex}`}
                                              checked={popupCheckboxItem.selected}
                                              onChange={(event) =>
                                                this.handlePopupCheckChange(
                                                  index,
                                                  popupCheckboxIndex,
                                                  event
                                                )
                                              }
                                            />
                                            <label
                                              htmlFor={`check-popup-${index}-${popupCheckboxIndex}`}
                                            >
                                              {popupCheckboxItem.channel}
                                            </label>
                                          </div>
                                        </li>
                                      )
                                    )}
                                </ul>
                              </div>
                            </div>
                            <div className="bottom-btns flex-grid">
                              <BaseTextLinkButton
                                label={t('common.btns.save')}
                                href={'#javascript'}
                                isButton
                                loading={this.state.loading}
                                onClick={() => {
                                  this.savePopup(index)
                                }}
                              />

                              <BaseTextLinkButton
                                label={t('common.btns.cancel')}
                                href={'#javascript'}
                                onClick={() => {
                                  this.closePopup()
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {openedPref && this.isOpened(item.key) && formType === 'modal' && (
                    <div className="tip-panel bottom-check">
                      <div className="top-area">
                        <div className="black-title">
                          {t('marketingPreferences.marketingPreferencesForm.get_offers_by')}
                        </div>
                        <div className="list">
                          <ul>
                            <li>
                              <div className="checkbox-wrap">
                                <input
                                  type="checkbox"
                                  className="text-message"
                                  id={`check-all-${index}`}
                                  checked={this.allOptionsChecked(openedPref)}
                                  onChange={(event) =>
                                    this.handlePopupCheckChange(index, -1, event)
                                  }
                                />
                                <label htmlFor={`check-all-${index}`}>
                                  {t('marketingPreferences.marketingPreferencesForm.all')}
                                </label>
                              </div>
                            </li>
                            {openedPref.preferredChannels &&
                              openedPref.preferredChannels.map(
                                (popupCheckboxItem, popupCheckboxIndex) => (
                                  <li key={popupCheckboxIndex}>
                                    <div className="checkbox-wrap">
                                      <input
                                        type="checkbox"
                                        className="text-message"
                                        id={`check-popup-${popupCheckboxIndex}`}
                                        checked={popupCheckboxItem.selected}
                                        onChange={(event) =>
                                          this.handlePopupCheckChange(
                                            index,
                                            popupCheckboxIndex,
                                            event
                                          )
                                        }
                                      />
                                      <label htmlFor={`check-popup-${popupCheckboxIndex}`}>
                                        {popupCheckboxItem.channel}
                                      </label>
                                    </div>
                                  </li>
                                )
                              )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
}

// @ts-ignore
export default withTranslation(null, { withRef: true })(MarketingPreferencesForm)
