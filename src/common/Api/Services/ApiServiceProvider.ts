import {Any} from '../Types';
import {GLOBAL_CONFIG} from '../config';
import {BaseStorageService} from './BaseStorageService';

/**
 * service provider for mobile and web
 */
export class ApiServiceProvider {
  static _config: Any = {};
  static _storageService: BaseStorageService;
  static _i18n: Any = {};
  static navigate: (...args: Any) => void;

  /**
   * set config
   * @param config the external config
   */
  static setConfig = (config: Any) => {
    ApiServiceProvider._config = config;
  };

  /**
   * get config
   */
  static getConfig() {
    return {...GLOBAL_CONFIG, ...ApiServiceProvider._config};
  }

  /**
   * set storage service
   * @param bs the instance
   */
  static setStorageService(bs: BaseStorageService) {
    ApiServiceProvider._storageService = bs;
  }

  /**
   * get storage service
   */
  static getStorageService() {
    return ApiServiceProvider._storageService;
  }

  /**
   * set i18n
   * @param i18n
   */
  static setI18n(i18n: Any) {
    ApiServiceProvider._i18n = i18n;
  }

  /**
   * get i18n
   */
  static getI18n() {
    return ApiServiceProvider._i18n;
  }
}
