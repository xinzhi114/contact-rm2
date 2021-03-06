import React from 'react'
import { mount } from 'enzyme'
import { BrowserRouter } from 'react-router-dom'
import { MoreActionsModal } from '..'
import { BaseModal } from '../../../../Modals/BaseModal'

describe('MoreActionsModal component testing', () => {
  it('Should render without crashing', () => {
    const props = {
      onUpdate: jest.fn(),
      onDelete: jest.fn(),
      onClose: jest.fn(),
    }
    const wrapper = mount(
      <BrowserRouter>
        <MoreActionsModal {...props} />
      </BrowserRouter>
    )
    expect(wrapper).not.toEqual(undefined)
  })

  it('Should call `onClose` when BaseModal close', () => {
    const props = {
      onUpdate: jest.fn(),
      onDelete: jest.fn(),
      onClose: jest.fn(),
    }
    const wrapper = mount(
      <BrowserRouter>
        <MoreActionsModal {...props} />
      </BrowserRouter>
    )
    // @ts-ignore
    wrapper.find(BaseModal).props().onClose()
    expect(props.onClose).toHaveBeenCalled()
  })

  it('Should call `onUpdate` when click update', () => {
    const props = {
      onUpdate: jest.fn(),
      onDelete: jest.fn(),
      onClose: jest.fn(),
    }
    const wrapper = mount(
      <BrowserRouter>
        <MoreActionsModal {...props} />
      </BrowserRouter>
    )
    // @ts-ignore
    wrapper.find('ul li').first().props().onClick()
    expect(props.onUpdate).toHaveBeenCalled()
  })

  it('Should call `onDelete` when click delete', () => {
    const props = {
      onUpdate: jest.fn(),
      onDelete: jest.fn(),
      onClose: jest.fn(),
    }
    const wrapper = mount(
      <BrowserRouter>
        <MoreActionsModal {...props} />
      </BrowserRouter>
    )
    // @ts-ignore
    wrapper.find('ul li').last().props().onClick()
    expect(props.onDelete).toHaveBeenCalled()
  })
})
