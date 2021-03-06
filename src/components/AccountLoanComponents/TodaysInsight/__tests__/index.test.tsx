import React from 'react'
import { mount } from 'enzyme'
import TodaysInsight, {
  ITodaysInsightProps,
  TodaysInsight as TodaysInsightComponent,
} from '../index'
import {
  AppContainer,
  nextScreen,
  beforeEachHelper,
  WrapperType,
  onClick,
  getMouseEventDefault,
} from '../../../../test/helper'
import _ from 'lodash'

const mockProps = {
  isEditMode: false,
  dataList: [
    {
      fieldName: 'string',
      fieldValue: 'string',
    },
  ],
}

describe('TodaysInsight component testing', () => {
  let wrapper: WrapperType
  let component: TodaysInsightComponent
  let props: ITodaysInsightProps
  const createWrapper = async (extraProps = {}) => {
    props = {
      ..._.cloneDeep(mockProps),
      ...extraProps,
      t: (param: string) => {
        return param
      },
    }
    wrapper = mount(
      <AppContainer>
        <TodaysInsight {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper.find(TodaysInsightComponent).instance() as TodaysInsightComponent
  }

  beforeEach(async () => {
    beforeEachHelper()
    await createWrapper()
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })

  it('Should renders without crashing in edit mode', async () => {
    await createWrapper({
      isEditMode: true,
    })
    expect(wrapper.find('.icons.icon-four-arrow').length).toBeTruthy()
  })

  it('Should toggle isOpend', async () => {
    component.setState({
      isOpend: true,
    })
    await nextScreen(wrapper)
    onClick(wrapper.find('.icons.btn-arrow'))
    await nextScreen(wrapper)
    expect(component.state.isOpend).toBeFalsy()
  })

  it('Should prevent default when clicking btn setting', async () => {
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.icons.btn-setting'), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
    ;(mouseEvent.preventDefault as jest.Mock).mockClear()
  })
})
