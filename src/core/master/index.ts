import loginMaster from './master.login';
import discovery from './master.discovery';
import infos from './master.infos';
import { MqttOptions } from '../../utils/interfaces';
import askLogin from './master.askLogin';
import getMqttConfig from './master.mqttConfig';

export default class Master {
  static masterId: string;
  static mqttConfig: MqttOptions;
  static getMqttConfig = getMqttConfig;
  static askLogin = askLogin;
  static login = loginMaster;
  static discovery = discovery;
  static infos = infos;
}
