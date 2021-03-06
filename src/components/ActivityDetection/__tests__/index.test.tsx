import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import IdleTimer from 'react-idle-timer'
import { act } from 'react-dom/test-utils'
import ActivityDetection, { ActivityDetection as ActivityDetectionComponent } from '../index'

describe('Activity Detection testing', () => {
  it('Should render correctly without crashing', async () => {
    const props = {
      t: (param: string) => {
        return param
      },
    }
    await act(async () => {
      const wrapper = mount(<ActivityDetection {...props} />)
      expect(wrapper).not.toEqual(undefined)
    })
  })

  it('Should simulate idle timeout correctly', async () => {
    const props = {
      t: (param: string) => {
        return param
      },
    }
    await act(async () => {
      const wrapper = mount(
        <MemoryRouter>
          <ActivityDetection {...props} />
        </MemoryRouter>
      )
      expect(wrapper.find(IdleTimer).length).toEqual(1)
      // @ts-ignore
      wrapper.find(IdleTimer).prop('onIdle')()
      jest.useFakeTimers()
      // @ts-ignore
      wrapper.find(IdleTimer).prop('onIdle')()
      jest.runAllTimers()
    })
  })

  it('Should render warning & error correctly', async () => {
    const props = {
      t: (param: string) => {
        return param
      },
    }

    // @ts-ignore
    jest.useFakeTimers()
    let wrapper = mount(
      <MemoryRouter>
        <ActivityDetection {...props} />
      </MemoryRouter>
    )

    const mockEvent = {}
    // @ts-ignore
    wrapper.find(IdleTimer).prop('onIdle')(mockEvent)
    jest.useFakeTimers()

    wrapper.setState({
      showType: 'Warning',
    })
    expect(wrapper.find('.txt').at(0).text()).toContain(
      'common.activityDetection.we_detected common.activityDetection.two_minutes'
    )

    // Close the indicator
    wrapper.find('.rights a').at(0).simulate('click')

    wrapper.update()

    wrapper = mount(
      <MemoryRouter>
        <ActivityDetection {...props} />
      </MemoryRouter>
    )
    wrapper.find(ActivityDetectionComponent).instance().setState({
      showType: 'Error',
    })
    wrapper.update()
    expect(wrapper.find(ActivityDetection).children().find('.txt').text()).toEqual(
      'common.activityDetection.session_expired'
    )
    jest.runAllTimers()
  })
})
