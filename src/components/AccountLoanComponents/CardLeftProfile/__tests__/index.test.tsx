import React from 'react'
import { mount } from 'enzyme'
import CardLeftProfile, {
  ICardLeftProfileProps,
  CardLeftProfile as CardLeftProfileComponent,
} from '../index'
import {
  AppContainer,
  nextScreen,
  beforeEachHelper,
  WrapperType,
  onClick,
} from '../../../../test/helper'
import _ from 'lodash'

const mockProps = {
  dataList: [
    {
      bankName: 'string',
      cardType: 'string',
      cardNumber: 'string',
      expireDate: 'string',
      cardCategoryType: 'string',
      status: 'string',
      accountLinked: 'string',
      fieldList: [
        {
          label: 'card_number',
          value: 'XXXX - XXXX - XXXX - 3362',
        },
        {
          label: 'card_type',
          value: 'Master',
        },
        {
          label: 'expiry',
          value: 'DEC 2018',
        },
        {
          label: 'status',
          value: 'active',
        },
        {
          label: 'account_linked',
          value: '4094 4545 3121 01',
        },
      ],
    },
  ],
  currentIndex: 0,
  t: (param: string) => {
    return param
  },
}

describe('CardLeftProfile component testing', () => {
  let wrapper: WrapperType
  let component: CardLeftProfileComponent
  let props: ICardLeftProfileProps
  const createWrapper = async (extraProps = {}) => {
    props = {
      ..._.cloneDeep(mockProps),
      onClickPrevArrow: jest.fn(),
      onClickNextArrow: jest.fn(),
      ...extraProps,
    }
    wrapper = mount(
      <AppContainer>
        <CardLeftProfile {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper.find(CardLeftProfileComponent).instance() as CardLeftProfileComponent
  }

  beforeEach(async () => {
    beforeEachHelper()
    await createWrapper()
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })

  it('Should call props event when click prev arrow', async () => {
    onClick(wrapper.find('.card-scroll .icons.btn-left'))
    await nextScreen(wrapper)
    expect(props.onClickPrevArrow).toHaveBeenCalled()
    ;(props.onClickPrevArrow as jest.Mock).mockClear()

    await createWrapper({
      currentIndex: 3,
      dataList: [
        _.cloneDeep(mockProps.dataList[0]),
        _.cloneDeep(mockProps.dataList[0]),
        _.cloneDeep(mockProps.dataList[0]),
        _.cloneDeep(mockProps.dataList[0]),
      ],
    })
    onClick(wrapper.find('.card-scroll .icons.btn-left'))
    await nextScreen(wrapper)
    expect(props.onClickPrevArrow).toHaveBeenCalled()
    ;(props.onClickPrevArrow as jest.Mock).mockClear()
  })

  it('Should call props event when click next arrow', async () => {
    onClick(wrapper.find('.card-scroll .icons.btn-right'))
    await nextScreen(wrapper)
    expect(props.onClickNextArrow).toHaveBeenCalled()
    ;(props.onClickNextArrow as jest.Mock).mockClear()

    await createWrapper({
      currentIndex: 1,
      dataList: [
        _.cloneDeep(mockProps.dataList[0]),
        _.cloneDeep(mockProps.dataList[0]),
        _.cloneDeep(mockProps.dataList[0]),
        _.cloneDeep(mockProps.dataList[0]),
        _.cloneDeep(mockProps.dataList[0]),
        _.cloneDeep(mockProps.dataList[0]),
      ],
    })
    onClick(wrapper.find('.card-scroll .icons.btn-right'))
    await nextScreen(wrapper)
    expect(props.onClickNextArrow).toHaveBeenCalled()
    ;(props.onClickNextArrow as jest.Mock).mockClear()
  })
})
