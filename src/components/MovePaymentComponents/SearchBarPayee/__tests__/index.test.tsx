import React from 'react'
import { mount } from 'enzyme'
import { BrowserRouter } from 'react-router-dom'
import { SearchBarPayee } from '..'
import { BaseTextInput } from '../../../BaseForm/BaseFormFields/BaseTextInput'

describe('RequestClosureBusinessModalWindow component testing', () => {
  it('Should render without crashing', () => {
    const props = {
      value: 'string',
      expanded: true,
      onChange: jest.fn(),
      onToggle: jest.fn(),
    }
    const wrapper = mount(
      <BrowserRouter>
        <SearchBarPayee {...props} />
      </BrowserRouter>
    )
    expect(wrapper).not.toEqual(undefined)
  })

  it('Should render without crashing when not expanded', () => {
    const props = {
      value: 'string',
      expanded: false,
      onChange: jest.fn(),
      onToggle: jest.fn(),
    }
    const wrapper = mount(
      <BrowserRouter>
        <SearchBarPayee {...props} />
      </BrowserRouter>
    )
    expect(wrapper).not.toEqual(undefined)
  })

  it('Should call `onToggle` when image click', () => {
    const props = {
      value: 'string',
      expanded: false,
      onChange: jest.fn(),
      onToggle: jest.fn(),
    }
    const wrapper = mount(
      <BrowserRouter>
        <SearchBarPayee {...props} />
      </BrowserRouter>
    )
    // @ts-ignore
    wrapper.find('.desktop-hide.mobile-show').props().onClick()
    expect(props.onToggle).toHaveBeenCalled()
  })

  it('Should call `onChange` when image click', () => {
    const props = {
      value: 'string',
      expanded: false,
      onChange: jest.fn(),
      onToggle: jest.fn(),
    }
    const wrapper = mount(
      <BrowserRouter>
        <SearchBarPayee {...props} />
      </BrowserRouter>
    )
    // @ts-ignore
    wrapper
      .find(BaseTextInput)
      .props()
      // @ts-ignore
      .onChange({ target: { validity: { valid: true }, value: 'Test' } })
    expect(props.onChange).toHaveBeenCalledWith('Test')
  })
})
