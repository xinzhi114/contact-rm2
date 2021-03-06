import React from 'react'
import { mount } from 'enzyme'
import PortfolioOverview, {
  IPortfolioOverviewProps,
  PortfolioOverview as PortfolioOverviewComponent,
} from '../index'
import {
  AppContainer,
  nextScreen,
  beforeEachHelper,
  WrapperType,
  onClick,
  getMouseEventDefault,
} from '../../../../test/helper'

const mockPortfolioOverviewDatalist: IPortfolioOverviewProps = {
  dataList: {
    carousel: [
      {
        companyName: 'string',
        price: 'string',
        changeType: 'string',
        changeFromLastMonth: 'string',
        productList: [
          {
            iconUrl: 'string',
            price: '13',
            title: 'string',
          },
        ],
      },
    ],
  },
  t: (param: string) => {
    return param
  },
  individualBusiness: 'individual',
}

const mockProps = {
  mockPortfolioOverviewDatalist,
}

describe('PortfolioOverview component testing', () => {
  let wrapper: WrapperType
  let component: PortfolioOverviewComponent
  let props: IPortfolioOverviewProps

  beforeEach(async () => {
    beforeEachHelper()
    props = {
      dataList: { ...mockProps.mockPortfolioOverviewDatalist.dataList },
      individualBusiness: 'individual',
      t: (param: string) => {
        return param
      },
    }
    wrapper = mount(
      <AppContainer>
        <PortfolioOverview {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper.find(PortfolioOverviewComponent).instance() as PortfolioOverviewComponent
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })

  it('Should set current index when click to carousel item', async () => {
    onClick(wrapper.find('.points').at(0))
    await nextScreen(wrapper)
    expect(component.state.currentIndex).toEqual(0)
  })

  it('Should prevent default when click on first info icon', () => {
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.btn-info-icon').first(), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
  })

  it('Should prevent default when click on last info icon', async () => {
    component.setState({ isOpend: false })
    await nextScreen(wrapper)
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.btn-info-icon').last(), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
  })
})
