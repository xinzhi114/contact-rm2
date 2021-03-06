export type IListItemWithValue = {
  label: string
  value: string | JSX.Element
  bold?: boolean
}

export type IListItemWithSubTitle = {
  label: string
  title: string
  subTitle: string
}

export type IListItemIcon = { icon: string; alt: string; flip?: boolean }

export type IListItem = IListItemWithValue | IListItemWithSubTitle | IListItemIcon

export type AllListItemTypes = IListItemWithValue & IListItemWithSubTitle & IListItemIcon
