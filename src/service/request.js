import axios from 'axios';
import { notification } from 'antd';
import { push } from 'react-router-redux';
import { store } from '@/store';

const methods = ['get', 'post', 'delete', 'put'];

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

class Request {
  constructor() {
    methods.forEach((method) => {
      this[method] = (url, options = {}) =>
        axios({ method, url, ...options })
          .then(this.checkStatus)
          .then(this.parseResponse)
          .catch(this.dealError);
    });
  }

  checkStatus = (response) => {
    console.log(`checkStatus:${response}`);
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const errorText = codeMessage[response.status] || response.statusText;
    notification.error({
      message: `请求错误 ${response.status}: ${response.url}`,
      description: errorText,
    });
    const error = new Error(errorText);
    error.name = response.status;
    error.response = response;
    throw error;
  }

  parseResponse = (response) => {
    console.log(`parseResponse:${response}`);
    const { data, status } = response;

    if (data.errno * 1 === 0) {
      return { data };
    }
    // 后端接口错误
    const error = new Error(data.msg);
    error.name = status;
    error.response = response;
    throw error;
  }

  dealError = (error) => {
    console.log(`dealError:${error}`);
    const { dispatch } = store;
    const status = error.name;
    if (status === 401) {
      dispatch({
        type: 'login/logout',
      });
    }
    if (status === 403) {
      dispatch(push('/403'));
    }
    if (status <= 504 && status >= 500) {
      dispatch(push('/500'));
    }
    if (status >= 404 && status < 422) {
      dispatch(push('/404'));
    }
    return { error };
  }
}

const instance = new Request();

export default instance;
