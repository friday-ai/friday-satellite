import {loginApi, MasterHost} from '../../utils/constants';
import {KVArr} from '../../utils/interfaces';
import Axios from '../../utils/axios';

const appMod = process.env.NODE_ENV!;


const master: KVArr<string> = {
    port: MasterHost[appMod].port,
    host: MasterHost[appMod].host
}

export default async function loginMaster(user: string, pass: string) {
    try {
        const url: string = `http://${master.host}:${master.port}${loginApi}`;

        const axiosResponse = await Axios.post({
            url: url,
            data: {
                email: user,
                password: pass
            }
        })

        if (axiosResponse.status !== 201) {
            throw new Error(axiosResponse.statusText);
        }
        return axiosResponse.data;
    } catch (e) {
        console.error(e)
        return null;
    }
}
