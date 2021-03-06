import React from 'react'
import { mount } from 'enzyme'
import { BrowserRouter } from 'react-router-dom'
import { ImportantInformationNotificationModal } from '..'
import { Button } from 'react-bootstrap'

describe('ImportantInformationNotificationModal component testing', () => {
  it('Should render without crashing when dark', () => {
    const props = {
      onOpen: jest.fn(),
      onClose: jest.fn(),
    }
    const wrapper = mount(
      <BrowserRouter>
        <ImportantInformationNotificationModal {...props} />
      </BrowserRouter>
    )
    expect(wrapper).not.toEqual(undefined)
  })

  it('Should call `onClose` when button close click', () => {
    const props = {
      onOpen: jest.fn(),
      onClose: jest.fn(),
    }
    const wrapper = mount(
      <BrowserRouter>
        <ImportantInformationNotificationModal {...props} />
      </BrowserRouter>
    )
    // @ts-ignore
    wrapper.find('.btn.btn-close').props().onClick()
    expect(props.onClose).toHaveBeenCalled()
  })

  it('Should call `onOpen` when primary click', () => {
    const props = {
      onOpen: jest.fn(),
      onClose: jest.fn(),
    }
    const wrapper = mount(
      <BrowserRouter>
        <ImportantInformationNotificationModal {...props} />
      </BrowserRouter>
    )
    // @ts-ignore
    wrapper.find(Button).last().props().onClick()
    expect(props.onOpen).toHaveBeenCalled()
  })
})
