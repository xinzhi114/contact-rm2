import { IRelationshipManager } from './account'

export interface ILoadAlertsDashboardDataResponse {
  dataList: {
    relationshipManager: IRelationshipManager
  }
}
