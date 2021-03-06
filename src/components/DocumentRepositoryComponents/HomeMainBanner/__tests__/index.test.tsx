import React from 'react'
import { mount } from 'enzyme'
import { AppContainer, nextScreen, beforeEachHelper, WrapperType } from '../../../../test/helper'
import HomeMainBanner from '..'

describe('HomeMainBanner component testing', () => {
  let wrapper: WrapperType
  let props: {
    documents: { name: string; date: string; id: number }[]
    onDownload: (id: number) => void
  }

  beforeEach(async () => {
    beforeEachHelper()
    props = {
      documents: [],
      onDownload: jest.fn(),
    }
    wrapper = mount(
      <AppContainer>
        <HomeMainBanner {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
  })

  it('Should change the state when change search text', async () => {
    props = {
      documents: [
        {
          name: 'Testing',
          date: '2012-12-12',
          id: 13,
        },
        {
          name: 'Random',
          date: '2012-12-12',
          id: 14,
        },
      ],
      onDownload: jest.fn(),
    }
    wrapper = mount(
      <AppContainer>
        <HomeMainBanner {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    wrapper
      .find('input')
      .simulate('change', { target: { validity: { valid: true }, value: 'Test' } })
    await nextScreen(wrapper)
    expect(wrapper).not.toEqual(undefined)
  })

  it('Should call download function on span click', async () => {
    props = {
      documents: [
        {
          name: 'Testing',
          date: '2012-12-12',
          id: 13,
        },
        {
          name: 'Random',
          date: '2012-12-12',
          id: 14,
        },
      ],
      onDownload: jest.fn(),
    }
    wrapper = mount(
      <AppContainer>
        <HomeMainBanner {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    wrapper
      .find('input')
      .simulate('change', { target: { validity: { valid: true }, value: 'Test' } })
    await nextScreen(wrapper)

    wrapper.find('span').last().simulate('click')
    expect(props.onDownload).toHaveBeenCalledWith(13)
  })
})
