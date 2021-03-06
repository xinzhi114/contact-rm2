import React from 'react'
import { mount } from 'enzyme'
import BottomNavSetting from '..'
import { AppContainer, getMouseEventDefault, onClick } from '../../../test/helper'

describe('BottomNavSetting testing', () => {
  it('Should render correctly without crashing', async () => {
    const wrapper = mount(
      <AppContainer>
        <BottomNavSetting />
      </AppContainer>
    )
    expect(wrapper).toBeDefined()

    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.btn-nav-profile'), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
  })
})
