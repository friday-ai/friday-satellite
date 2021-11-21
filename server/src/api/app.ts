import fs from 'fs-extra';
import MqttServer from './mqtt';
import Friday from '../core/friday';
import Log from '../utils/log';
import Master from '../core/master';
import { configMasterDir, MqttMessageTypes, TopicsTypes } from '../utils/constants';
import { MqttOptions } from '../utils/interfaces';
import { decrypt } from '../utils/keyring';

const logger = new Log();

export default class Server {
  public mqttServer!: MqttServer;
  public port: number;
  readonly friday: any;

  readonly debug: boolean;
  readonly file: string = `${configMasterDir}/info.json`;

  constructor(port: number, friday: Friday, debug: boolean) {
    this.port = port;
    this.friday = friday;
    this.debug = debug;
  }

  async start() {
    let infoMaster;
    let satelliteId: string = '';
    logger.info('Server is starting');
    if (this.debug) {
      logger.info('Server enter in debug mode !');
    }

    try {
      infoMaster = fs.readJsonSync(this.file);
    } catch (e) {
      logger.info('Satellite has to be configured');
    }

    Master.masterId = await Master.infos();

    if (!infoMaster) {
      this.pingMaster(async () => {
        logger.info('Login to master');
        await Master.askLogin();
      });
    } else {
      satelliteId = decrypt(infoMaster.satelliteId, Master.masterId);
      await this.startMqtt(
        JSON.parse(
          decrypt(infoMaster.mqttInfo, satelliteId),
        ),
      );

      this.mqttServer.sendMessage({
        topic: TopicsTypes.SATELLITE_HEARTBEAT, message: { message: 'I am alive !', satelliteId }, type: MqttMessageTypes.MESSAGE_SEND, sender: `${satelliteId}`,
      }, { sendAll: true });
      logger.info('Server has started');
    }

    this.friday.satelliteId = satelliteId;
    return this;
  }

  async startMqtt(config: MqttOptions) {
    // initialize and start the Mqtt server instance
    logger.info('start the Mqtt server');
    this.mqttServer = new MqttServer(this.friday, config);
    await this.mqttServer.start();
    logger.info('The Mqtt server has started');
  }

  private pingMaster(callback: () => void) {
    const interval = setInterval(async () => {
      logger.info('Ping Master');
      const result = await Master.discovery();
      if (result) {
        logger.info('Master is ready !');
        clearInterval(interval);
        callback();
      }
    }, 3000);
  }
}
