import React from 'react'
import { mount } from 'enzyme'
import IconStar from '..'
import { getMouseEventDefault, onClick } from '../../../../test/helper'

describe('IconStar component', () => {
  it('Should render without crashing', async () => {
    const wrapper = mount(<IconStar />)
    expect(wrapper.length).toBe(1)
    expect(wrapper).toBeDefined()
  })

  it('Should prevent default when clicking icon', async () => {
    const wrapper = mount(<IconStar />)
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.icons.icon-star'), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
  })
})
