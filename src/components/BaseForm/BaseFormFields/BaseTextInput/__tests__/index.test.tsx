import React from 'react'
import { mount } from 'enzyme'
import { IBaseTextInputProps, BaseTextInput } from '..'
import { WrapperType, beforeEachHelper, AppContainer, nextScreen } from '../../../../../test/helper'

describe('BaseTextInput component testing', () => {
  let wrapper: WrapperType
  let props: IBaseTextInputProps

  beforeEach(async () => {
    beforeEachHelper()
    props = {
      value: '',
    }
    wrapper = mount(
      <AppContainer>
        <BaseTextInput {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
  })

  it('Should call on change when change', async () => {
    props = {
      value: 'Test',
    }
    wrapper = mount(
      <AppContainer>
        <BaseTextInput {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    // @ts-ignore
    wrapper.find('input').simulate('change', { target: { value: 'Test' } })

    props = {
      value: 'Test',
      onChange: jest.fn(),
    }
    wrapper = mount(
      <AppContainer>
        <BaseTextInput {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    // @ts-ignore
    wrapper.find('input').simulate('change', { target: { value: 'Test' } })
    expect(props.onChange).toHaveBeenCalled()
  })
})
