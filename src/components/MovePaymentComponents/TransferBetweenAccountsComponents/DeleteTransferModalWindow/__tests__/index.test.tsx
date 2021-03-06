import React from 'react'
import { mount } from 'enzyme'
import {
  DeleteTransferModalWindow,
  DeleteTransferModalWindow as DeleteTransferModalWindowComponent,
} from '../index'
import {
  WrapperType,
  beforeEachHelper,
  AppContainer,
  nextScreen,
  getMouseEventDefault,
  onClick,
} from '../../../../../test/helper'
import { BaseTextLinkButton } from '../../../../BaseForm/BaseFormFields/BaseTextLinkButton'

describe('DeleteTransferModalWindow component testing', () => {
  let wrapper: WrapperType
  let component: DeleteTransferModalWindowComponent
  const props: any = {
    data: {
      fromAccount: 'Current account',
      toAccount: 'France expansion',
      switchActive: true,
      transferDate: new Date(),
      endDate: new Date(),
      transferAmount: '13',
      frequency: 'Weekly',
      fromAccountReference: '1234',
    },
    onApply: jest.fn(),
    onClose: jest.fn(),
    t: (param: string) => {
      return param
    },
  }

  beforeEach(async () => {
    beforeEachHelper()
    wrapper = mount(
      <AppContainer>
        <DeleteTransferModalWindow {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper
      .find(DeleteTransferModalWindowComponent)
      .instance() as DeleteTransferModalWindowComponent
  })

  it('Should render without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })

  it('Should call close function when clicking delete button', async () => {
    props.data.switchActive = false
    props.data.transferDate = null
    props.data.endDate = null
    props.individualBusiness = 'individual'
    wrapper = mount(
      <AppContainer>
        <DeleteTransferModalWindow {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)

    // @ts-ignore
    wrapper.find(BaseTextLinkButton).first().props().onClick()
    expect(props.onClose).toHaveBeenCalled()
  })

  it('Should call close function when clicking btn close', async () => {
    props.data.switchActive = true
    props.data.transferDate = null
    props.data.endDate = null
    wrapper = mount(
      <AppContainer>
        <DeleteTransferModalWindow {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)

    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.btn-close').last(), mouseEvent)
    expect(props.onClose).toHaveBeenCalled()
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
  })
})
