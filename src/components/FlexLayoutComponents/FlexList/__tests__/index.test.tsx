import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import { FlexList, IFlexListProps } from '..'

describe('FlexList completed component testing', () => {
  it('Should render correctly without crashing', async () => {
    const props: IFlexListProps = {
      items: [
        {
          label: 'string',
          value: 'string',
          bold: true,
        },
        {
          label: 'string',
          value: 'string',
          bold: false,
        },
      ],
    }
    await act(async () => {
      const wrapper = mount(
        // @ts-ignore
        <FlexList {...props} />
      )
      expect(wrapper).not.toEqual(undefined)
    })
  })
})
