import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import { FlexContainer, IFlexContainerProps } from '..'

describe('FlexDialog completed component testing', () => {
  it('Should render correctly without crashing when `flexDirection` `row`', async () => {
    const props: IFlexContainerProps = {
      flexDirection: 'row',
    }
    await act(async () => {
      const wrapper = mount(
        // @ts-ignore
        <FlexContainer {...props} />
      )
      expect(wrapper).not.toEqual(undefined)
    })
  })

  it('Should render correctly without crashing when `flexDirection` `column`', async () => {
    const props: IFlexContainerProps = {
      flexDirection: 'column',
    }
    await act(async () => {
      const wrapper = mount(
        // @ts-ignore
        <FlexContainer {...props} />
      )
      expect(wrapper).not.toEqual(undefined)
    })
  })
})
