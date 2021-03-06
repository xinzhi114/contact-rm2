import React from 'react'
import * as _ from 'lodash'
import { useTranslation } from 'react-i18next'
import { BaseFormFieldTypeToComponentMap, IBaseFormProps } from '../../constants/baseForm'
import './styles.scss'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

const defaultProps: IBaseFormProps = {
  fields: {},
  isShowHelp: true,
}
const BaseForm: React.FunctionComponent<IBaseFormProps> = (props) => {
  const { t } = useTranslation()
  const { fields: fieldsObj, disableTranslation, isShowHelp } = props
  const fields = _.values(fieldsObj)

  return (
    <div className="base-form">
      {fields &&
        fields.map((field, index) => {
          const questionIcon = (
            <a
              href="#javascript"
              className="icons icon-question label-transparent"
              onClick={(event) => event.preventDefault()}
            >
              {t('common.btns.question')}
            </a>
          )
          const titleEl = field.label && (
            <div className="title flex-grid">
              {disableTranslation ? field.label : t(field.label)}
              {(field.showHelp !== undefined ? !!field.showHelp : isShowHelp) &&
                (field.helpTooltipText ? (
                  <OverlayTrigger
                    overlay={
                      <Tooltip id={`${field.id ? field.id : _.keys(fieldsObj)[index]}-${index}`}>
                        {field.helpTooltipText}
                      </Tooltip>
                    }
                  >
                    {questionIcon}
                  </OverlayTrigger>
                ) : (
                  questionIcon
                ))}
              {field.rightText !== undefined && (
                <span
                  className="right-text"
                  onClick={() => field.onClickRightText && field.onClickRightText()}
                >
                  {field.rightText}
                </span>
              )}
            </div>
          )

          const fieldComponent = BaseFormFieldTypeToComponentMap[field.type]
          return (
            <div
              key={index}
              className={`row-line ${field.flexGrow ? 'flex-grow-field' : ''} ${
                field.rowClassName ? field.rowClassName : ''
              } ${index % 2 === 1 ? 'odd' : ''}`}
            >
              <div className={field.wrapperClassName ? field.wrapperClassName : ''}>
                {titleEl}
                {React.createElement(fieldComponent, { disableTranslation, ...field })}
                {field.appendChildren ? field.appendChildren : null}
              </div>
            </div>
          )
        })}
    </div>
  )
}

BaseForm.defaultProps = defaultProps
export default BaseForm
