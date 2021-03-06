import React from 'react'
import { mount } from 'enzyme'
import IconSetting from '..'
import { getMouseEventDefault, onClick } from '../../../../test/helper'

describe('IconSetting component', () => {
  it('Should render without crashing', async () => {
    const props = {
      isActive: true,
      onClick: jest.fn(),
    }
    const wrapper = mount(<IconSetting {...props} />)
    expect(wrapper.length).toBe(1)
    expect(wrapper).toBeDefined()
  })

  it('Should prevent default when clicking icon', async () => {
    const props = {
      isActive: false,
      onClick: jest.fn(),
    }
    const wrapper = mount(<IconSetting {...props} />)
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.icons.icon-line-setting'), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
    expect(props.onClick).toHaveBeenCalled()
  })
})
