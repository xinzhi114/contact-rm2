import { BaseStorageService } from '../../common/Api/Services/BaseStorageService'
import { Any } from '../../common/Api/Types'

export class StorageService extends BaseStorageService {
  /**
   * store date
   * @param key the key
   * @param obj the json object
   */
  storeData = (key: string, obj: Any) => {
    window.localStorage.setItem(key, JSON.stringify(obj))
    return Promise.resolve()
  }

  /**
   * get data
   * @param key
   */
  getData<T>(key: string): Promise<T | undefined> {
    const jsonStr = window.localStorage.getItem(key)
    if (!jsonStr) {
      return Promise.resolve(undefined)
    }
    try {
      return Promise.resolve(JSON.parse(jsonStr || '{}') as T)
    } catch (e) {
      return Promise.reject(e.message)
    }
  }

  /**
   * remove data
   * @param key
   */
  removeData(key: string) {
    window.localStorage.removeItem(key)
    return Promise.resolve()
  }
}
