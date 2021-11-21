import { networkInterfaces } from 'os';
import { KVArr } from '../../utils/interfaces';
import { loginIhm, MasterHost } from '../../utils/constants';
import Axios from '../../utils/axios';

function getMyIp() {
  const nets = networkInterfaces();
  const results = Object.create(null);

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]!) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      if (net.family === 'IPv4' && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }
  return results.en0[0];
}

const appMod = process.env.NODE_ENV!;

const master: KVArr<string> = {
  port: MasterHost[appMod].port,
  host: MasterHost[appMod].host,
};

export default async function askLogin() {
  try {
    const url: string = `http://${master.host}:${master.port}${loginIhm}`;

    const axiosResponse = await Axios.post({
      url,
      data: {
        ip: getMyIp(),
      },
    });

    if (axiosResponse.status !== 200) {
      throw new Error(axiosResponse.statusText);
    }
    return axiosResponse.data;
  } catch (e) {
    return null;
  }
}
