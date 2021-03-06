import React from 'react'
import { mount } from 'enzyme'
import { AppContainer, nextScreen, beforeEachHelper, WrapperType } from '../../../test/helper'
import TopBreadcrumb, { ITopBreadcrumbProps, TopBreadcrumb as TopBreadcrumbComponent } from '..'

describe('TopBreadcrumb component testing', () => {
  let wrapper: WrapperType
  let component: TopBreadcrumbComponent
  let props: ITopBreadcrumbProps

  beforeEach(async () => {
    beforeEachHelper()
    props = {
      headerBreadcrumbData: [
        {
          pageName: 'Home',
          pageUrl: '/customerDashboard',
        },
        {
          pageName: 'Payment and transfer',
          pageUrl: '/movePaymentPages',
        },
        {
          pageName: 'Transfer between accounts',
          pageUrl: '#',
        },
      ],
      t: jest.fn(),
    }
    wrapper = mount(
      <AppContainer>
        <TopBreadcrumb {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper.find(TopBreadcrumbComponent).instance() as TopBreadcrumbComponent
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })
})
