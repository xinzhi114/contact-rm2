import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import { AccountInfo, IAccountInfoProps } from '..'

describe('AccountInfo completed component testing', () => {
  it('Should render correctly without crashing', async () => {
    const props: IAccountInfoProps = {
      account: {
        name: 'string',
        accountNumber: 'string',
        sortCode: 'string',
        balance: 13,
        interestRate: 13,
      },
      balance: '12',
    }
    await act(async () => {
      const wrapper = mount(
        // @ts-ignore
        <AccountInfo {...props} />
      )
      expect(wrapper).not.toEqual(undefined)
    })
  })
})
