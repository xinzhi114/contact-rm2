import React from 'react'
import { mount } from 'enzyme'
import { FaqSelectCategory, IFaqSelectCategoryProps } from '../index'
import {
  AppContainer,
  nextScreen,
  beforeEachHelper,
  WrapperType,
  onClick,
} from '../../../../test/helper'
import _ from 'lodash'

const mockProps = {
  t: (param: string) => {
    return param
  },
  currentIndex: 0,
  dataList: [
    {
      name: 'string',
      iconUrl: 'string',
      categoryLabel: 'string',
      faqList: [
        {
          title: 'string',
          description: 'string',
        },
      ],
    },
  ],
}

describe('FaqSelectCategory component testing', () => {
  let wrapper: WrapperType
  let props: IFaqSelectCategoryProps

  beforeEach(async () => {
    beforeEachHelper()
    props = {
      ..._.cloneDeep(mockProps),
      dataList: [
        _.cloneDeep(mockProps.dataList[0]),
        _.cloneDeep(mockProps.dataList[0]),
        _.cloneDeep(mockProps.dataList[0]),
      ],
      selectCategory: jest.fn(),
    }
    wrapper = mount(
      <AppContainer>
        <FaqSelectCategory {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
  })

  it('Should select category', () => {
    onClick(wrapper.find('.tab-bar').at(0))
    expect(props.selectCategory).toHaveBeenCalled()
  })
})
