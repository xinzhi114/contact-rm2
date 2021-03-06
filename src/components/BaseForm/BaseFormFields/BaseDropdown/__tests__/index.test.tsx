import React from 'react'
import { mount } from 'enzyme'
import { IBaseDropdownProps, BaseDropdown } from '..'
import { WrapperType, beforeEachHelper, AppContainer, nextScreen } from '../../../../../test/helper'
import { Dropdown } from 'react-bootstrap'

describe('BaseDropdown component testing', () => {
  let wrapper: WrapperType
  let props: IBaseDropdownProps

  beforeEach(async () => {
    beforeEachHelper()
    props = {
      value: '',
      options: [],
    }
    wrapper = mount(
      <AppContainer>
        <BaseDropdown {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
  })

  it('Should call on change when select', async () => {
    props = {
      value: 'Test',
      options: ['Test', 'Random'],
      onChange: jest.fn(),
    }
    wrapper = mount(
      <AppContainer>
        <BaseDropdown {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    // @ts-ignore
    wrapper.find(Dropdown).props().onSelect('Random')
    expect(props.onChange).toHaveBeenCalledWith('Random')
  })
})
