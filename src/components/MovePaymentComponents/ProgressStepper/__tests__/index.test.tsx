import React from 'react'
import { mount } from 'enzyme'
import { IProgressStepperProps, ProgressStepper } from '..'
import { WrapperType, beforeEachHelper, AppContainer, nextScreen } from '../../../../test/helper'

describe('ProgressStepper component testing', () => {
  let wrapper: WrapperType
  let props: IProgressStepperProps

  const value: any = undefined

  beforeEach(async () => {
    beforeEachHelper()
    props = {
      currentIndex: 0,
      steps: value,
    }
    wrapper = mount(
      <AppContainer>
        <ProgressStepper {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
  })

  it('Should renders without crashing for `currentIndex` 1', async () => {
    props = {
      currentIndex: 1,
      steps: [
        {
          title: 'string',
          description: 'string',
        },
        {
          title: 'string1',
          description: 'string1',
        },
      ],
    }
    wrapper = mount(
      <AppContainer>
        <ProgressStepper {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)

    expect(wrapper).not.toEqual(undefined)

    props = {
      currentIndex: 0,
      steps: [
        {
          title: 'string',
          description: 'string',
        },
        {
          title: 'string1',
          description: 'string1',
        },
      ],
    }
    wrapper = mount(
      <AppContainer>
        <ProgressStepper {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)

    expect(wrapper).not.toEqual(undefined)
  })
})
