import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BaseTextInput } from '../../../components/BaseForm/BaseFormFields/BaseTextInput'
import ChangeAccessLevelModalWindow from '../../../components/ManageAccessComponents/ChangeAccessLevelModalWindow'
import AccessLevelChangedModalWindow from '../../../components/ManageAccessComponents/AccessLevelChangedModalWindow'
import AddNewUserModalWindow from '../../../components/ManageAccessComponents/AddNewUserModalWindow'
import { ComposeEmailModal } from '../../../components/HelpSupportComponents/ComposeEmailModal'
import AddNewUserSuccessModalWindow from '../../../components/ManageAccessComponents/AddNewUserSuccessModalWindow'
import ApproveCardAccessModalWindow from '../../../components/ManageAccessComponents/ApproveCardAccessModalWindow'
import GeneralTable from '../../../components/MovePaymentComponents/GeneralTable'
import { BaseTextLinkButton } from '../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import GeneralConfirmModalWindow from '../../../components/GeneralConfirmModalWindow'
import TabBordered from '../../../components/TabBordered'
import formValidationSvc from '../../../services/formValidationSvc'
import './styles.scss'

interface IUserListTableProps {
  customerId: string
  accountNumber: string
  dataList: {
    userListAccessLevel: {
      id: string
      userNameColor: string
      userNameLabelColor: string
      userNameShortLabel: string
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
      }
    }[]
    userListCardAccess: {
      id: string
      userNameColor: string
      userNameLabelColor: string
      userNameShortLabel: string
      cardNumber: string
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
      }
    }[]
  }
}

const tabArrayTransactionHistory = [
  {
    label: 'Access level',
    showControl: '',
  },
  {
    label: 'Card access',
    showControl: '',
  },
]
const UserListTable: React.FunctionComponent<IUserListTableProps> = (props) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`manageAccess.${key}`)

  const [currentTab, setCurrentTab] = useState('Access level')
  const [searchText, setSearchText] = useState('')

  const [isShowChangeAccessLevelModalWindow, setIsShowChangeAccessLevelModalWindow] = useState(
    false
  )
  const [isShowAccessLevelChangedModalWindow, setIsShowAccessLevelChangedModalWindow] = useState(
    false
  )
  const [isShowApproveCardAccessModalWindow, setIsShowApproveCardAccessModalWindow] = useState(
    false
  )
  const [isShowApprovedCardAccessModalWindow, setIsShowApprovedCardAccessModalWindow] = useState(
    false
  )
  const [isShowRejectedCardAccessModalWindow, setIsShowRejectedCardAccessModalWindow] = useState(
    false
  )

  const [isShowAddNewUserModalWindow, setIsShowAddNewUserModalWindow] = useState(false)
  const [isShowComposeNewEmailModalWindow, setIsShowComposeNewEmailModalWindow] = useState(false)
  const [isShowAddNewUserSuccessModalWindow, setIsShowAddNewUserSuccessModalWindow] = useState(
    false
  )

  const [newUserData, setNewUserData] = useState({
    composeType: 'add new user',
    customerId: props.customerId,
    accountNumber: props.accountNumber,
    firstName: '',
    lastName: '',
    primaryContactNumber: '',
    secondaryContactNumber: '',
    companyRole: '',
    emailId: '',
    address: '',
  })

  const [templateData, setTemplateData] = useState(null)
  const [cardNumber, setCardNumber] = useState('')
  const [username, setUsername] = useState('')

  const [dataList] = useState(props.dataList)
  const [userListAccessLevelShown, setUserListAccessLevelShown] = useState([] as any[])
  const [userListCardAccessShown, setUserListCardAccessShown] = useState([] as any[])

  const [newAccessLevel, setNewAccessLevel] = useState('')

  const [tableChanged, setTableChanged] = useState(false)

  useEffect(() => {
    if (props.dataList) {
      setUserListAccessLevelShown(props.dataList.userListAccessLevel)
      setUserListCardAccessShown(props.dataList.userListCardAccess)
    }
  }, [props.dataList])

  // click Action
  const clickAction = (actionData: any) => {
    if (actionData.actionName === 'Update') {
      setTemplateData(actionData.actionValue)

      setIsShowChangeAccessLevelModalWindow(true)
    }

    if (actionData.actionName === 'Approve') {
      setTemplateData(actionData.actionValue)
      setCardNumber(actionData.actionValue.cardNumber)
      setUsername(actionData.actionValue.fieldList[0].fieldValue)

      setIsShowApproveCardAccessModalWindow(true)
    }
  }

  // click Add New User
  const clickAddNewUser = () => {
    setNewUserData({
      composeType: 'add new user',
      customerId: props.customerId,
      accountNumber: props.accountNumber,
      firstName: '',
      lastName: '',
      primaryContactNumber: '',
      secondaryContactNumber: '',
      companyRole: '',
      emailId: '',
      address: '',
    })
  }

  // change Search Text
  const changeSearchText = (value: string) => {
    setSearchText(value)

    const newUserListAccessLevelShown: any[] = []
    dataList.userListAccessLevel.forEach((item) => {
      if (item.fieldList[0].fieldValue.toLowerCase().indexOf(value.toLowerCase()) > -1) {
        newUserListAccessLevelShown.push(item)
      }
    })

    setUserListAccessLevelShown(newUserListAccessLevelShown)

    const newUserListCardAccessShown: any[] = []
    dataList.userListCardAccess.forEach((item) => {
      if (item.fieldList[0].fieldValue.toLowerCase().indexOf(value.toLowerCase()) > -1) {
        newUserListCardAccessShown.push(item)
      }
    })

    setUserListCardAccessShown(newUserListCardAccessShown)
    setTableChanged(!tableChanged)
  }

  return (
    <div className="user-list-table">
      {isShowAccessLevelChangedModalWindow && (
        <AccessLevelChangedModalWindow
          data={templateData}
          newAccessLevel={newAccessLevel}
          onClose={() => setIsShowAccessLevelChangedModalWindow(false)}
          onConfirm={() => {
            setIsShowAccessLevelChangedModalWindow(false)
          }}
        />
      )}

      {isShowChangeAccessLevelModalWindow && (
        <ChangeAccessLevelModalWindow
          data={templateData}
          onClose={() => setIsShowChangeAccessLevelModalWindow(false)}
          onConfirm={(event: string) => {
            if (event !== '') {
              setNewAccessLevel(event)
            }
            setIsShowChangeAccessLevelModalWindow(false)
            setIsShowAccessLevelChangedModalWindow(true)
          }}
        />
      )}

      {isShowAddNewUserModalWindow && (
        <AddNewUserModalWindow
          data={newUserData}
          onClose={() => setIsShowAddNewUserModalWindow(false)}
          onSubmit={(event: any) => {
            setNewUserData(event)
            setIsShowAddNewUserModalWindow(false)
            setIsShowComposeNewEmailModalWindow(true)
          }}
        />
      )}

      {isShowComposeNewEmailModalWindow && (
        <ComposeEmailModal
          dataAdditional={newUserData}
          onClose={(event: boolean) => {
            if (event) {
              setIsShowComposeNewEmailModalWindow(false)
              setIsShowAddNewUserSuccessModalWindow(true)
            } else {
              setIsShowComposeNewEmailModalWindow(false)
            }
          }}
        />
      )}

      {isShowAddNewUserSuccessModalWindow && (
        <AddNewUserSuccessModalWindow
          data={newUserData}
          onClose={() => setIsShowAddNewUserSuccessModalWindow(false)}
          onConfirm={() => {
            setIsShowAddNewUserSuccessModalWindow(false)
          }}
        />
      )}

      {isShowApproveCardAccessModalWindow && templateData !== null && (
        <ApproveCardAccessModalWindow
          data={templateData}
          onClose={() => setIsShowApproveCardAccessModalWindow(false)}
          onApprove={() => {
            setIsShowApproveCardAccessModalWindow(false)
            setIsShowApprovedCardAccessModalWindow(true)
          }}
          onReject={() => {
            setIsShowApproveCardAccessModalWindow(false)
            setIsShowRejectedCardAccessModalWindow(true)
          }}
        />
      )}

      {isShowApprovedCardAccessModalWindow && (
        <GeneralConfirmModalWindow
          titleText={t('cardRightBox.approved_card_access_successfully')}
          messageText={`${t(
            'cardRightBox.you_have_successfully_approved'
          )} <strong>${cardNumber}</strong> ${t('cardRightBox.for')} <strong>${username}</strong>`}
          confirmBtnText={_t('common.btns.confirm')}
          onClose={() => {
            setIsShowApprovedCardAccessModalWindow(false)
          }}
        />
      )}

      {isShowRejectedCardAccessModalWindow && (
        <GeneralConfirmModalWindow
          titleText={t('cardRightBox.rejected_card_access_successfully')}
          messageText={`${t(
            'cardRightBox.you_have_successfully_rejected'
          )} <strong>${cardNumber}</strong> ${t('cardRightBox.for')} <strong>${username}</strong>`}
          confirmBtnText={_t('common.btns.confirm')}
          onClose={() => {
            setIsShowRejectedCardAccessModalWindow(false)
          }}
        />
      )}

      {!!dataList && (
        <React.Fragment>
          <div className="top-table-bar flex-grid">
            <div className="lefts flex">
              <TabBordered
                individualBusiness={''}
                tabArray={tabArrayTransactionHistory}
                currentTab={currentTab}
                clickTab={(tabName: string) => setCurrentTab(tabName)}
              />
            </div>
            <div className="rights">
              <BaseTextLinkButton
                classNameContainer="btn-white"
                label={_t('common.btns.add_new_user')}
                href={'#javascript'}
                isButton={true}
                onClick={() => {
                  clickAddNewUser()
                  setIsShowAddNewUserModalWindow(true)
                }}
              />

              <BaseTextInput
                placeholder={t('search_user')}
                value={searchText}
                pattern="[\s\S]{0,50}"
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

          {userListAccessLevelShown && userListCardAccessShown && (
            <React.Fragment>
              {currentTab === 'Access level' && (
                <GeneralTable
                  tableChanged={tableChanged}
                  hideColumnNames={true}
                  dataList={userListAccessLevelShown}
                  clickAction={(actionData: any) => {
                    clickAction(actionData)
                  }}
                />
              )}

              {currentTab === 'Card access' && (
                <GeneralTable
                  tableChanged={tableChanged}
                  hideColumnNames={true}
                  dataList={userListCardAccessShown}
                  clickAction={(actionData: any) => {
                    clickAction(actionData)
                  }}
                />
              )}
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </div>
  )
}

export default UserListTable
