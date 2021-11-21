import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import error from './errors/coreError';

export default class Axios {
  private static config = {
    timeout: 2000,
  };

  private static axiosInstance: AxiosInstance = axios.create(Axios.config);

  static async get(params: { url: string, config?: AxiosRequestConfig, token?: string }) {
    try {
      const config = params.config ?? {};
      const getConfig = Axios.getAuthorisationHeader(config, params.token);
      return await Axios.axiosInstance.get(params.url, getConfig);
    } catch (e) {
      throw error({
        name: e.name, message: e.message, cause: e, metadata: params,
      });
    }
  }

  static async post(params: { url: string, data?: any, config?: AxiosRequestConfig, token?: string }) {
    try {
      const data = params.data ?? {};
      const config = params.config ?? {};
      const postConfig = Axios.getAuthorisationHeader(config, params.token);
      return await Axios.axiosInstance.post(params.url, data, postConfig);
    } catch (e) {
      throw error({
        name: e.name, message: e.message, cause: e, metadata: params,
      });
    }
  }

  private static getAuthorisationHeader(config: AxiosRequestConfig, token?: string) {
    if (token) {
      config.headers = { ...config.headers, ...{ Authorization: `Bearer ${token}` } };
    }

    return config;
  }
}
