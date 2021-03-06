import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import { FlexDialog, IFlexDialogProps } from '..'

describe('FlexDialog completed component testing', () => {
  it('Should render correctly without crashing when `fullHeight` `true`', async () => {
    const props: IFlexDialogProps = {
      fullHeight: true,
      className: 'test',
    }
    await act(async () => {
      const wrapper = mount(
        // @ts-ignore
        <FlexDialog {...props} />
      )
      expect(wrapper).not.toEqual(undefined)
    })
  })

  it('Should render correctly without crashing when `fullHeight` `false`', async () => {
    const props: IFlexDialogProps = {
      fullHeight: false,
    }
    await act(async () => {
      const wrapper = mount(
        // @ts-ignore
        <FlexDialog {...props} />
      )
      expect(wrapper).not.toEqual(undefined)
    })
  })
})
