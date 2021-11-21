import {
  MasterHost, masterInfo,
} from '../../utils/constants';
import { KVArr } from '../../utils/interfaces';
import Axios from '../../utils/axios';
import error from '../../utils/errors/coreError';

const appMod = process.env.NODE_ENV!;

const master: KVArr<string> = {
  port: MasterHost[appMod].port,
  host: MasterHost[appMod].host,
};

export default async function infos() {
  try {
    const url: string = `http://${master.host}:${master.port}${masterInfo}`;

    const axiosResponse = await Axios.get({
      url,
    });

    return axiosResponse.data.masterId;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: {},
    });
  }
}
