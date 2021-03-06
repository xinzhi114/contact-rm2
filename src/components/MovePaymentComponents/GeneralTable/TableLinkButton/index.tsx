import React from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import './styles.scss'

export interface ITableLinkButtonProps {
  tooltip?: {
    id: string
    text: string
  }
  className?: string
  open?: boolean
  onClick?: () => void
  fullWidth?: boolean
}

export const TableLinkButton: React.FunctionComponent<ITableLinkButtonProps> = (props) => {
  const { children, tooltip, className, open, fullWidth, onClick } = props

  const content = (
    <Button
      variant="link"
      aria-label="button"
      onClick={() => onClick && onClick()}
      className={`table-link-button ${open ? 'open' : ''} ${fullWidth ? 'full-width' : ''} ${
        className || ''
      }`}
    >
      {children}
    </Button>
  )

  if (tooltip !== undefined) {
    return (
      <OverlayTrigger overlay={<Tooltip id={tooltip.id}>{tooltip.text}</Tooltip>}>
        {content}
      </OverlayTrigger>
    )
  }

  return content
}
