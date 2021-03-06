import {BaseApiService} from './BaseApiService';
import {Any} from '../Types';

/**
 * Api service factory
 */
export class ASF {
  static _instances: Any = {};

  static getService<T extends BaseApiService>(type: new () => T): T {
    const newInstance = new type();
    const key = (newInstance as Any).prefix;
    let instance = ASF._instances[key];
    if (!instance) {
      ASF._instances[key] = newInstance;
      instance = newInstance;
    }
    return instance as T;
  }
}
