import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import './styles.scss'

export interface ITopBreadcrumbProps {
  t: any
  headerBreadcrumbData: {
    pageName: string
    pageUrl: string
  }[]
}

export class TopBreadcrumb extends Component<ITopBreadcrumbProps> {
  render() {
    const { t } = this.props
    const { headerBreadcrumbData } = { ...this.props }

    return (
      <div className="nav-top-breadcrumb">
        <ul className="mobile-hide">
          {headerBreadcrumbData &&
            headerBreadcrumbData.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.pageUrl}
                  className={`tab-link ${
                    index === headerBreadcrumbData.length - 1 ? 'current' : ''
                  }`}
                >
                  {t('common.dashboardHeader.topBreadcrumb.' + item.pageName)}
                </NavLink>
                {index !== headerBreadcrumbData.length - 1 && <span className="line" />}
              </li>
            ))}
        </ul>
      </div>
    )
  }
}

// @ts-ignore
export default withTranslation()(TopBreadcrumb)
