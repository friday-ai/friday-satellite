import {MasterHost, masterInfo} from '../../utils/constants';
import {KVArr, MqttOptions} from '../../utils/interfaces';
import Axios from '../../utils/axios';

const appMod = process.env.NODE_ENV!;

const master: KVArr<string> = {
    port: MasterHost[appMod].port,
    host: MasterHost[appMod].host
}

export default async function infos(JWTToken: string): Promise<{ mqttInfo: MqttOptions, masterId: string }> {
    try {
        const url: string = `http://${master.host}:${master.port}${masterInfo}`;

        const axiosResponse = await Axios.get({
            url: url,
            token: JWTToken
        })

        if (axiosResponse.status !== 200) {
            throw new Error(axiosResponse.statusText);
        }

        return {
            mqttInfo: axiosResponse.data.mqttInfo,
            masterId: axiosResponse.data.masterId
        };
    } catch (e) {
        throw new Error(e)
    }
}
