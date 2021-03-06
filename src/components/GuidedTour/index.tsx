import React from 'react'
import Joyride, { StoreHelpers } from 'react-joyride'
import { CustomGuidedTourTooltip } from './CustomGuidedTourTooltip'
import './styles.scss'

export interface IGuidedTourProps {
  stepSelectors: string[]
  translationKey: string
  helpersRef: React.MutableRefObject<StoreHelpers | null>
  stepIndex: number
  onNextClick: () => void
  onReset: () => void
}

export const GuidedTour: React.FunctionComponent<IGuidedTourProps> = (props) => {
  const { stepSelectors, translationKey, stepIndex, onNextClick, onReset, helpersRef } = props

  return (
    <Joyride
      steps={stepSelectors.map((selector) => ({ target: selector, content: '' }))}
      beaconComponent={React.forwardRef(() => (
        <></>
      ))}
      getHelpers={(helpers) => {
        if (helpersRef) {
          helpersRef.current = helpers
        }
      }}
      callback={(data) => {
        if (data.action === 'close') {
          onReset()
        }
      }}
      stepIndex={stepIndex}
      disableScrolling
      floaterProps={{
        disableFlip: true,
        placement: 'bottom-end',
      }}
      continuous
      tooltipComponent={(tooltipProps) => (
        <CustomGuidedTourTooltip
          onNextClick={(done) => {
            if (done) {
              onReset()
            } else {
              onNextClick()
            }
          }}
          onCloseClick={() => {
            onReset()
          }}
          {...tooltipProps}
          translationKey={translationKey}
        />
      )}
    />
  )
}
