import React, { useState, useEffect } from 'react'
import { Dropdown } from 'react-bootstrap'
interface FormAccount {
  label: string
  number: string
  value: string
  isActive?: string
}
const SelectComponent = (props: any) => {
  const { t, data, callBack, label, defaultValue, id } = props
  const [selected, setSelected] = useState(defaultValue)

  useEffect(() => {
    setSelected(props.defaultValue)
  }, [props.defaultValue])

  return (
    <Dropdown
      bsPrefix="drop-module global-select"
      onSelect={(event) => {
        setSelected(event || '')
        callBack({ label, value: event })
      }}
    >
      <Dropdown.Toggle variant="success" id={id}>
        {selected || t('common.dynamicLabels.Select')}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {(data || []).map((item: FormAccount, index: number) => {
          return (
            <Dropdown.Item eventKey={item.value} key={index}>
              <div className="item-left">
                <div>{item.label}</div>
                <div className="phoneNumber">{item.number}</div>
              </div>
              {!!item.isActive && item.isActive === 'Account is Inactive' && (
                <span className="red-inactive" />
              )}
            </Dropdown.Item>
          )
        })}
      </Dropdown.Menu>
    </Dropdown>
  )
}
// @ts-ignore
export default SelectComponent
