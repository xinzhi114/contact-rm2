import React from 'react'
import { useTranslation } from 'react-i18next'
import { FlexDialog } from '../../FlexLayoutComponents/FlexDialog'
import './styles.scss'

export interface IProgressStep {
  title: string
  description: string
}

export interface IProgressStepperProps {
  currentIndex: number
  steps: IProgressStep[]
}

export const ProgressStepper: React.FunctionComponent<IProgressStepperProps> = (props) => {
  const { currentIndex, steps } = props

  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`movePayment.progressStepper.${key}`)

  return (
    <FlexDialog>
      <div className="white-panel progress-stepper">
        <div className="inner-gray">
          <div className="black-title">{t('complete_all_steps')}</div>
          <div className="expend-group">
            <div className="left-bar">
              <div
                className="color-bar"
                style={{
                  minHeight: `${((currentIndex + 1) / (steps || []).length) * 100}%`,
                }}
              />
            </div>
            {(steps || []).map((item, index) => {
              return (
                <div
                  key={index}
                  className={`group ${
                    index === currentIndex ? (currentIndex === 0 ? 'current first' : 'current') : ''
                  } ${index < currentIndex ? 'completed' : ''}`}
                >
                  <div className="title-bar">{t('' + item.title)}</div>
                  <p className="txt">{t('' + item.description)}.</p>
                  <div className="last-txt current">
                    <span className="gray-line">~</span>
                    <span className="green-link">{t('in_progress')}</span>
                  </div>
                  <div className="last-txt completed">
                    <span className="icons icon-done" />
                    <span className="done-link">{t('done')}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="bottom-blue flex hide">
          <div className="left-img">
            <div className="gray-cover" />
            <img src="/assets/photo-home.jpg" alt="img" />
          </div>
          <div className="right-txt flex">
            <span className="point-green" /> {t('i_am_available')}
          </div>
        </div>
      </div>
    </FlexDialog>
  )
}
