import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import './styles.scss'
import { useDispatch, useSelector } from 'react-redux'
import { IAppState } from '../../store/constants'
import { RMState } from '../../store/reducers/rm'
import { loadRM } from '../../store/actions/rm'
import { ProfileIcon } from '../ProfileIcon'

interface IDashboardRelationshipManagerProps {
  data: {
    photoUrl: string
    stars: number
    name: string
    role: string
    state: string
    email: string
    phoneNumber: string
    yourNextAppointment: {
      timeFull: string
      timeRange: string
      subject: string
      iconUrl: string
      topLabel: string
      bottomLabel: string
    }
  }
  hideAppointment?: boolean
}

/**
 * use RM component
 */
export const useRM = () => {
  const { rm } = useSelector<IAppState, RMState>((state) => state.rm)
  const dispatch = useDispatch()

  const loadUserRM = () => {
    if (!rm) {
      dispatch(loadRM())
    }
  }
  useEffect(loadUserRM, [])
  return rm
}

const DashboardRelationshipManager: React.FunctionComponent<IDashboardRelationshipManagerProps> = (
  props
) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`dashboardRelationshipManager.${key}`)
  const { data } = props
  const rm = useRM()

  if (!rm) {
    return (
      <div className="mobile-contact home-contact">
        <div>{_t('common.loading')}</div>
      </div>
    )
  }
  return (
    <div className="mobile-contact home-contact">
      {!!data && (
        <React.Fragment>
          <div className="user-module">
            <div className="left-img">
              <ProfileIcon name={rm.name} photoUrl={rm.photoURL} />
              {data.state === 'Available' && <span className="state-point green" />}
              {data.state === 'Busy' && <span className="state-point red" />}
              {data.state === 'Offline' && <span className="state-point gray" />}
            </div>
            <div className="rights">
              <div className="names">{rm.name}</div>
              <div className="role-txt">{rm.role}</div>
              <div className="state-txt">{t(data.state)}</div>
              <div className="start-list">
                <ul>
                  {new Array(data.stars).fill('').map((item, index) => (
                    <li key={index}>
                      <i className="icon-star-green" />
                    </li>
                  ))}
                  {new Array(5 - data.stars).fill('').map((item, index) => (
                    <li key={index}>
                      <i className="icon-star-gray" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="four-icons">
            <div className="items">
              <a
                href="#javascript"
                className="icons icon-voice"
                onClick={(event) => event.preventDefault()}
              >
                {rm.phoneNumber}
              </a>
            </div>
            <div className="items">
              <a href={'mailto:' + data.email} className="icons icon-email">
                {rm.teamEmail}
              </a>
            </div>
          </div>

          <BaseTextLinkButton
            classNameContainer={`btn-contact-rm ${
              !data.yourNextAppointment ? 'margin-bottom-20' : ''
            }`}
            label={_t('common.btns.contact_rm')}
            href={'/contactRM'}
            isNavLink
            isButton
            onClick={() => null}
          />

          {!!data.yourNextAppointment && !props.hideAppointment && (
            <div className="next-appointment-box">
              <div className="top-title">{t('your_next_appointment')}</div>
              <div className="gray-block">
                <div className="title-date">{data.yourNextAppointment.timeFull}</div>
                <div className="two-items flex">
                  <div className="items">
                    <div className="label-txt">{t('time')}</div>
                    <div className="values">{data.yourNextAppointment.timeRange}</div>
                  </div>
                  <div className="items">
                    <div className="label-txt">{t('subject')}</div>
                    <div className="values">{data.yourNextAppointment.subject}</div>
                  </div>
                </div>
                <div className="bottom-area flex">
                  <img
                    src={data.yourNextAppointment.iconUrl}
                    className="icons icon-location"
                    alt="img"
                  />
                  <div className="right-txt">
                    {data.yourNextAppointment.topLabel !== '' && (
                      <div className="label-txt">{data.yourNextAppointment.topLabel}</div>
                    )}
                    <div
                      className="value-txt"
                      dangerouslySetInnerHTML={{ __html: data.yourNextAppointment.bottomLabel }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  )
}

export default DashboardRelationshipManager
