import {
  BaseCheckbox,
  IBaseCheckboxOption,
  IBaseCheckboxType,
} from '../components/BaseForm/BaseFormFields/BaseCheckbox'
import {
  BaseDropdown,
  IBaseDropdownOption,
} from '../components/BaseForm/BaseFormFields/BaseDropdown'
import {
  BaseFileInput,
  IBaseFileInputValue,
} from '../components/BaseForm/BaseFormFields/BaseFileInput'
import {
  BaseTextInput,
  IBaseTextInputFormatAs,
  IBaseTextInputType,
} from '../components/BaseForm/BaseFormFields/BaseTextInput'
import { BaseTextarea } from '../components/BaseForm/BaseFormFields/BaseTextarea'
import { StringifyOptions } from 'querystring'
import { BaseDateInput } from '../components/BaseForm/BaseFormFields/BaseDateInput'
import {
  BaseCategorySelect,
  IBaseCategoryOption,
} from '../components/BaseForm/BaseFormFields/BaseCategorySelect'
import { BaseDateOfBirthInput } from '../components/BaseForm/BaseFormFields/BaseDateOfBirthInput'

export const BaseFormFieldTypeArray = [
  'dropdown',
  'text',
  'checkbox',
  'file',
  'textarea',
  'date',
  'date-of-birth',
  'category',
] as const

export type IBaseFormFieldType = typeof BaseFormFieldTypeArray[number]

export const BaseFormFieldTypeToComponentMap: Record<
  IBaseFormFieldType,
  React.FunctionComponent<any>
> = {
  dropdown: BaseDropdown,
  text: BaseTextInput,
  checkbox: BaseCheckbox,
  file: BaseFileInput,
  textarea: BaseTextarea,
  date: BaseDateInput,
  'date-of-birth': BaseDateOfBirthInput,
  category: BaseCategorySelect,
}

export type IBaseFormFieldValue =
  | string
  | string[]
  | boolean
  | boolean[]
  | IBaseFileInputValue[]
  | Date
  | null
  | undefined

export type IBaseFormOnChangeNewValue =
  | IBaseFormFieldValue
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>

export interface IBaseFormField {
  type: IBaseFormFieldType
  value: IBaseFormFieldValue
  placeholder?: string
  label?: string
  id?: string
  inputType?: IBaseTextInputType
  formatAs?: IBaseTextInputFormatAs
  className?: string
  accept?: string
  rowClassName?: string
  wrapperClassName?: string
  disableTranslation?: boolean
  flexGrow?: boolean
  pattern?: StringifyOptions | string
  options?: (IBaseDropdownOption | IBaseCategoryOption | IBaseCheckboxOption)[]
  checkboxType?: IBaseCheckboxType
  onChange?: (newValue: IBaseFormOnChangeNewValue) => void
  showHelp?: boolean
  disabled?: boolean
  showCurrency?: boolean | string
  helpTooltipText?: string
  rightText?: string | JSX.Element
  onClickRightText?: () => void
  maxDate?: Date
  minDate?: Date
  appendChildren?: JSX.Element
}

export interface IBaseFormFieldProps {
  id?: string
  classNameContainer?: string
  className?: string
  placeholder?: string
  disableTranslation?: boolean
  disabled?: boolean
}

export interface IBaseFormFields {
  [field: string]: IBaseFormField
}

export interface IBaseFormProps {
  fields: IBaseFormFields
  disableTranslation?: boolean
  isShowHelp?: boolean
}
