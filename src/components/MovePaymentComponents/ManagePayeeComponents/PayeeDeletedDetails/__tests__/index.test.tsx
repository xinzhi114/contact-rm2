import React from 'react'
import { mount } from 'enzyme'
import { BrowserRouter } from 'react-router-dom'
import { PayeeDeletedDetails } from '..'

describe('PayeeDeletedDetails component testing', () => {
  it('Should render without crashing when dark', () => {
    const props = {
      canceledTransactions: [
        {
          type: 'Shopping',
          reference: 'Bills Allocation (NOV 2020)',
          date: '9 Nov 2020',
          amount: 49,
          recipient: 'XXXXX - 4597',
        },
        {
          type: 'Shopping',
          reference: 'Business Bills (JUN-30)',
          date: '13 Jun 2020',
          amount: 24.89,
          recipient: 'XXXXX - 4597',
        },
      ],
      dark: true,
    }
    const wrapper = mount(
      <BrowserRouter>
        <PayeeDeletedDetails {...props} />
      </BrowserRouter>
    )
    expect(wrapper).not.toEqual(undefined)
  })

  it('Should render without crashing when not dark', () => {
    const props = {
      canceledTransactions: [
        {
          type: 'Shopping',
          reference: 'Bills Allocation (NOV 2020)',
          date: '9 Nov 2020',
          amount: 49,
          recipient: 'XXXXX - 4597',
        },
        {
          type: 'Shopping',
          reference: 'Business Bills (JUN-30)',
          date: '13 Jun 2020',
          amount: 24.89,
          recipient: 'XXXXX - 4597',
        },
      ],
      dark: false,
      payee: {
        name: 'John Smith',
        userNameColor: '#006a8e',
        userNameLabelColor: '#fff',
        accountNumber: '1094 - 4545 - 3121 - 01',
        sortCode: '00-00-00',
        reference: 'Bills allocation (NOV 2020)',
        iban: '8940328493',
      },
    }
    const wrapper = mount(
      <BrowserRouter>
        <PayeeDeletedDetails {...props} />
      </BrowserRouter>
    )
    expect(wrapper).not.toEqual(undefined)
  })
})
