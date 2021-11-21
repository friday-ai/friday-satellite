import fs from 'fs-extra';
import { configMasterDir, MasterHost, mqttConfig } from '../../utils/constants';
import { KVArr } from '../../utils/interfaces';
import Axios from '../../utils/axios';
import error from '../../utils/errors/coreError';

const appMod = process.env.NODE_ENV!;

const master: KVArr<string> = {
  port: MasterHost[appMod].port,
  host: MasterHost[appMod].host,
};

export default async function getMqttConfig(JWTToken: string) {
  try {
    const url: string = `http://${master.host}:${master.port}${mqttConfig}`;

    const axiosResponse = await Axios.get({
      url,
      token: JWTToken,
    });

    if (axiosResponse.status !== 200) {
      throw new Error(axiosResponse.statusText);
    }

    await fs.ensureDir(configMasterDir);

    await fs.writeJson(`${configMasterDir}/info.json`, axiosResponse.data);
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: JWTToken,
    });
  }
}
