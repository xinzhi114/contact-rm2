import React from 'react'
import { mount } from 'enzyme'
import CardsCarousel, {
  ICardsCarouselProps,
  CardsCarousel as CardsCarouselComponent,
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
  isEditMode: false,
  dataList: [
    {
      bankName: 'string',
      cardType: 'string',
      cardNumber: 'string',
      expireDate: 'string',
    },
  ],
  t: (param: string) => {
    return param
  },
}

describe('CardsCarousel component testing', () => {
  let wrapper: WrapperType
  let component: CardsCarouselComponent
  let props: ICardsCarouselProps
  const createWrapper = async (extraProps = {}) => {
    props = {
      ..._.cloneDeep(mockProps),
      ...extraProps,
    }
    wrapper = mount(
      <AppContainer>
        <CardsCarousel {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper.find(CardsCarouselComponent).instance() as CardsCarouselComponent
  }

  beforeEach(async () => {
    global.innerWidth = 1000
    global.dispatchEvent(new Event('resize'))
    beforeEachHelper()
    await createWrapper()
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })

  it('Should not auto scroll if is in mobile view', async () => {
    global.innerWidth = 700
    global.dispatchEvent(new Event('resize'))
    await nextScreen(wrapper)
    await createWrapper()
    expect(component.state.cardIndex).toBeFalsy()
  })

  it('Should auto scroll', async () => {
    await createWrapper({
      dataList: [
        _.cloneDeep(mockProps.dataList[0]),
        _.cloneDeep(mockProps.dataList[0]),
        _.cloneDeep(mockProps.dataList[0]),
      ],
    })
    await nextScreen(wrapper, 10000)
    expect(component.state.cardIndex).toBeTruthy()
  })

  it('Should reduce step when click previous arrow', async () => {
    component.setState({
      cardIndex: 1,
    })
    onClick(wrapper.find('.card-arrow.mobile-hide .btn-arrow.prev').at(0))
    await nextScreen(wrapper)
    expect(component.state.prevArrowDisabled).toBeTruthy()

    component.setState({
      cardIndex: 2,
    })
    onClick(wrapper.find('.card-arrow.mobile-hide .btn-arrow.prev').at(0))
    await nextScreen(wrapper)
    expect(component.state.prevArrowDisabled).toBeFalsy()
  })

  it('Should increase step when click next arrow', async () => {
    component.setState({
      cardIndex: 2,
    })
    onClick(wrapper.find('.card-arrow.mobile-hide .btn-arrow.next').at(0))
    await nextScreen(wrapper)
    expect(component.state.nextArrowDisabled).toBeTruthy()

    component.setState({
      cardIndex: -2,
    })
    onClick(wrapper.find('.card-arrow.mobile-hide .btn-arrow.next').at(0))
    await nextScreen(wrapper)
    expect(component.state.nextArrowDisabled).toBeFalsy()
  })

  it('Should not show white panel open if it is not open', async () => {
    onClick(wrapper.find('.rights.desktop-hide.mobile-show .icons.btn-arrow'))
    await nextScreen(wrapper)
    expect(wrapper.find('.white-panel.open').length).toBeFalsy()
  })

  it('Should show icon four arrow in edit mode', async () => {
    await createWrapper({
      isEditMode: true,
    })
    expect(wrapper.find('.icon-four-arrow').length).toBeTruthy()
  })
})
