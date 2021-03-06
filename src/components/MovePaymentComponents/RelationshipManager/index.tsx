import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IRelationshipManager } from '../../../constants/account'
import './styles.scss'
import { useRM } from '../../DashboardRelationshipManager'
import { ProfileIcon } from '../../ProfileIcon'

interface IRelationshipManagerProps {
  data: IRelationshipManager
}

export const RelationshipManager: React.FunctionComponent<IRelationshipManagerProps> = (props) => {
  const { t } = useTranslation()
  const [data] = useState(props.data)

  const rm = useRM()

  return (
    <div className="mobile-contact payment-home-contact">
      {!!rm && !!data && (
        <React.Fragment>
          <div className="top-bar flex-grid">
            <div className="left-title">&nbsp;</div>
            <div className="user-module">
              <div className="left-area flex">
                <div className="left-img">
                  <ProfileIcon name={rm.name} photoUrl={rm.photoURL} fontSize={16} size={55} />
                  {data.state === 'active' && <span className="green-point" />}
                </div>
                <a href="#javascript" className="btn btn-more label-transparent">
                  {t('common.btns.more')}
                </a>
              </div>

              <div className="rights">
                <div className="names">{rm.role}</div>
                <div className="txt">{rm.name}</div>
                <div className="start-list">
                  <ul>
                    {new Array(data.stars).fill('').map((item, index) => (
                      <li key={index}>
                        <i className="icon-star-green" />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  )
}

export default RelationshipManager
