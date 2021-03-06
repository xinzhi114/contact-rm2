import React from 'react'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { TooltipRenderProps } from 'react-joyride'
import { BaseModal } from '../../Modals/BaseModal'
import './styles.scss'

export type ICustomGuidedTourTooltip = TooltipRenderProps & {
  onNextClick: (done: boolean) => void
  onCloseClick: () => void
  translationKey: string
}

export const CustomGuidedTourTooltip: React.FunctionComponent<ICustomGuidedTourTooltip> = (
  props
) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`${props.translationKey}.${key}`)

  const stepNumber = props.index + 1

  return (
    <BaseModal
      customRef={props.tooltipProps.ref}
      className="custom-guided-tour-tooltip"
      blackClose
      onClose={() => props.onCloseClick()}
      flat
      customModalFooterContent={
        <>
          <span className="progress-text">
            {stepNumber} {t('of')} {props.size}
          </span>
          <Button variant="primary" onClick={() => props.onNextClick(stepNumber === props.size)}>
            {t(stepNumber === props.size ? 'done' : 'next')}
          </Button>
        </>
      }
      title={<>{t(`title_${stepNumber}`)}</>}
    >
      {t(`content_${stepNumber}`)}
    </BaseModal>
  )
}
