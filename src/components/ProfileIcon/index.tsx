import React from 'react'
import './styles.scss'
import { Any } from '../../common/Api/Types'
const DEFAULT_SIZE = 100
const FONT_SIZE = 24
/**
 * props
 */
export interface ProfileIconProps {
  name: string
  size?: number
  fontSize?: number
  bgColor?: Any
  photoUrl?: string
}
/**
 * Profile icon view
 */
export const ProfileIcon = (props: ProfileIconProps) => {
  const getShortName = (name: string) => {
    const parts = (name || '').split(' ')
    if (parts.length > 1) {
      return parts
        .map((p) => p.substr(0, 1))
        .slice(0, 2)
        .join('')
    }
    return name.substr(0, 2)
  }

  const s = props.size || DEFAULT_SIZE
  const ss = props.fontSize || FONT_SIZE
  return (
    <div
      className="profile-icon"
      style={{
        width: s,
        height: s,
        borderRadius: s * 0.5,
      }}
    >
      <span className={'txt'} style={{ fontSize: ss }}>
        {getShortName(props.name)}
      </span>

      {props.photoUrl && <img alt={'user'} src={props.photoUrl} className="user-photo" />}
    </div>
  )
}
