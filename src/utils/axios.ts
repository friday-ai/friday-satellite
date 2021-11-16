import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

const config = {
    timeout: 2000
}

export default class Axios {

    private static axiosInstance: AxiosInstance = axios.create(config);

    static async get(params: { url: string, config?: AxiosRequestConfig, token?: string }) {
        let config = params.config ?? {};
        config = Axios.getAuthorisationHeader(config, params.token)
        return await Axios.axiosInstance.get(params.url, config);
    }

    static async post(params: { url: string, data?: any, config?: AxiosRequestConfig, token?: string }) {
        const data = params.data ?? {};
        let config = params.config ?? {};
        config = Axios.getAuthorisationHeader(config, params.token)
        return await Axios.axiosInstance.post(params.url, data, config);
    }

    private static getAuthorisationHeader(config: AxiosRequestConfig, token?: string) {
        if(token) {
            config.headers = {...config.headers, ...{ Authorization: `Bearer ${token}` }};
        }

        return config;
    }
}
