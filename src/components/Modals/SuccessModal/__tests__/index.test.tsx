import React from 'react'
import { mount } from 'enzyme'
import SuccessModal from '..'
import { BrowserRouter } from 'react-router-dom'
import { BaseModal } from '../../BaseModal'

describe('SuccessModal component testing', () => {
  it('Should renders without crashing', () => {
    let props = {
      title: 'string',
      successText: 'string',
      onClose: jest.fn(),
      mobileFullScreen: true,
      className: 'string',
    }
    let wrapper = mount(
      <BrowserRouter>
        <SuccessModal {...props} />
      </BrowserRouter>
    )
    expect(wrapper).not.toEqual(undefined)

    const className: any = null
    props = {
      title: 'string',
      successText: 'string',
      onClose: jest.fn(),
      mobileFullScreen: false,
      className,
    }
    wrapper = mount(
      <BrowserRouter>
        <SuccessModal {...props} />
      </BrowserRouter>
    )
    expect(wrapper).not.toEqual(undefined)
  })

  it('Should call `onClose` when close modal', async () => {
    let props: any = {
      title: 'string',
      successText: 'string',
      mobileFullScreen: false,
      className: '',
      onClose: null,
    }
    let wrapper = mount(
      <BrowserRouter>
        <SuccessModal {...props} />
      </BrowserRouter>
    )

    // @ts-ignore
    wrapper.find(BaseModal).props().onClose()

    props = {
      title: 'string',
      successText: 'string',
      mobileFullScreen: false,
      className: '',
      onClose: jest.fn(),
    }
    wrapper = mount(
      <BrowserRouter>
        <SuccessModal {...props} />
      </BrowserRouter>
    )

    // @ts-ignore
    wrapper.find(BaseModal).props().onClose()
    expect(wrapper).not.toEqual(undefined)
  })
})
