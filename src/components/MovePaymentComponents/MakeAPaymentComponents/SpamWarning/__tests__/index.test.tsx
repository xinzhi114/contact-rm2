import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import { SpamWarning } from '..'

describe('SpamWarning completed component testing', () => {
  it('Should render correctly without crashing', async () => {
    await act(async () => {
      const wrapper = mount(
        // @ts-ignore
        <SpamWarning />
      )
      expect(wrapper).not.toEqual(undefined)
    })
  })
})
