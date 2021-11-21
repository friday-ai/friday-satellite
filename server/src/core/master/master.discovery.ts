import { MasterHost, satelliteDiscovery } from '../../utils/constants';
import { KVArr } from '../../utils/interfaces';
import Axios from '../../utils/axios';

const appMod = process.env.NODE_ENV!;

const master: KVArr<string> = {
  port: MasterHost[appMod].port,
  host: MasterHost[appMod].host,
};

export default async function discovery(): Promise<boolean> {
  try {
    const url: string = `http://${master.host}:${master.port}${satelliteDiscovery}`;
    const axiosResponse = await Axios.get({
      url,
    });

    return axiosResponse.status === 200;
  } catch (e) {
    return false;
  }
}
