import React from 'react'
import { mount } from 'enzyme'
import NormalTab, { INormalTabProps } from '../index'
import {
  AppContainer,
  nextScreen,
  beforeEachHelper,
  WrapperType,
  onClick,
} from '../../../test/helper'
import _ from 'lodash'

const mockProps = {
  currentTab: 'string',
  tabArray: ['string', 'string2'],
}

describe('NormalTab component testing', () => {
  let wrapper: WrapperType
  let props: INormalTabProps

  beforeEach(async () => {
    beforeEachHelper()
    props = {
      ..._.cloneDeep(mockProps),
      clickTab: jest.fn(),
    }
    wrapper = mount(
      <AppContainer>
        <NormalTab {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
  })

  it('Should renders without crashing', () => {
    expect(wrapper.isEmptyRender()).toBeFalsy()
  })

  it('Should click tab', () => {
    onClick(wrapper.find('.tab-link').at(0))
    expect(props.clickTab).toHaveBeenCalled()
  })
})
