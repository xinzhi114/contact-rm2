import React from 'react'
import { mount } from 'enzyme'
import { BrowserRouter } from 'react-router-dom'
import { ViewModeButton } from '..'

describe('ViewModeButton component testing', () => {
  it('Should render without crashing', () => {
    const value: any = 'grid'
    const props = {
      value,
      onChange: jest.fn(),
    }
    const wrapper = mount(
      <BrowserRouter>
        <ViewModeButton {...props} />
      </BrowserRouter>
    )
    expect(wrapper).not.toEqual(undefined)
  })

  it('Should call `onChange` when div click with value `grid`', () => {
    const value: any = 'grid'
    const props = {
      value,
      onChange: jest.fn(),
    }
    const wrapper = mount(
      <BrowserRouter>
        <ViewModeButton {...props} />
      </BrowserRouter>
    )
    // @ts-ignore
    wrapper.find('.view-mode-button').props().onClick()
    expect(props.onChange).toHaveBeenCalledWith('list')
  })

  it('Should call `onChange` when div click with value `list`', () => {
    const value: any = 'list'
    const props = {
      value,
      onChange: jest.fn(),
    }
    const wrapper = mount(
      <BrowserRouter>
        <ViewModeButton {...props} />
      </BrowserRouter>
    )
    // @ts-ignore
    wrapper.find('.view-mode-button').props().onClick()
    expect(props.onChange).toHaveBeenCalledWith('grid')
  })
})
