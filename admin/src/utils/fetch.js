import { message } from 'antd';
import {
  HTTP_RES_MESSAGES,
  HTTP_CODE,
  TIMEOUT
} from './config';
import axios from 'axios';

const instance = axios.create();

instance.defaults.timeout = TIMEOUT;
/**
 * 这里提供基本的 get 和post 请求 三个方法 基于 Fetch, 默认开启跨域
 *  @param {Function} getJson    get请求
 *  @param {Function} postJson   post请求
 */

const helper = {
  /**
   * @name get 请求
   * @param {String} String 请求地址 支持跨域
   * @param {Object} params 请求参数
   * @return res
   */
  get(url, params) {
    return new Promise(function(resolve, reject) {
        // ... some code
        return axios
        .get(`${url}`, params)
        .then((res) => {
            let data = helper.handleResponse(res);
            resolve(data);
        })
        .catch((error) => {
            let err = helper.handleError(error);
            reject(err);
        });
    });
  },

  /**
   * @name post 请求
   * @param {String} String 请求地址 支持跨域
   * @param {Object} params 请求参数
   * @return res
   */
  post(url, params = {}) {
    return new Promise(function(resolve, reject) {
        // ... some code
        return axios
        .post(`${url}`, params)
        .then((res) => {
            let data = helper.handleResponse(res);
            resolve(data);
        })
        .catch((error) => {
            let err = helper.handleError(error);
            reject(err);
        });
    });
    
  },
  //全局处理错误
  handleError(error) {
    let err = '';
    if (error.response) {
      const {
        status,
        data
      } = error.response;
      switch (status) {
        case HTTP_CODE['ERROR']:
          err = data.message || HTTP_RES_MESSAGES['ERROR'];
          break;
        case HTTP_CODE['TIMEOUT']:
          err = data.message || HTTP_RES_MESSAGES['TIMEOUT'];
          break;
        case HTTP_CODE['404']:
          err = data.message || HTTP_RES_MESSAGES['NOTFOUND'];
          break;
        default:
          err = data.message || HTTP_RES_MESSAGES['ERROR'];
      }
    } else {
      err = error && error.message ? error.message : HTTP_RES_MESSAGES['ERROR']
    }
    message.error(err);
    return err;
  },
  //全局处理错误
  handleResponse({ data, status }) {
    if (status >= HTTP_CODE['SUCCESS'] && status < HTTP_CODE['NOTDONE']) {
      return data;
    } else {
      message.error('服务器出错!');
    }
  }
};
export default helper;
