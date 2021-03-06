import React, { Suspense } from 'react'
import { shallow } from 'enzyme'
import { BrowserRouter } from 'react-router-dom'
import RelationshipManager from '..'

describe('RelationshipManager component testing', () => {
  it('Should renders without crashing', () => {
    const props = {
      data: {
        photoUrl: '/assets/photo-home.jpg',
        stars: 4,
        name: 'Mark Thompson',
        role: 'Relationship Manager',
        state: 'active',
        email: 'support@odyssey.com',
        phoneNumber: '+22 (0) 20 3375 6422',
      },
    }
    const wrapper = shallow(
      <Suspense fallback={<></>}>
        <BrowserRouter>
          <RelationshipManager {...props} />
        </BrowserRouter>
      </Suspense>,
      { suspenseFallback: false }
    )
    expect(wrapper).not.toEqual(undefined)
  })
})
