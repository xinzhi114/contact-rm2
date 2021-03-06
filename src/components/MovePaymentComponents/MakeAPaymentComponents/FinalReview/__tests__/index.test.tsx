import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import { FinalReview } from '..'

describe('FinalReview completed component testing', () => {
  it('Should render correctly without crashing', async () => {
    await act(async () => {
      const wrapper = mount(
        // @ts-ignore
        <FinalReview />
      )
      expect(wrapper).not.toEqual(undefined)
    })
  })
})
