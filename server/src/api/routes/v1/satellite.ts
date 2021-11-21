import { Request, Response } from 'express';
import fs from 'fs-extra';
import {
  FridayRouter, Post,
} from '../../../utils/decorators/route';
import Friday from '../../../core/friday';
import Master from '../../../core/master';
import { decrypt } from '../../../utils/keyring';
import Log from '../../../utils/log';
import { configMasterDir, MqttMessageTypes, TopicsTypes } from '../../../utils/constants';

const logger = new Log();
const file: string = `${configMasterDir}/info.json`;

/**
 * Satellite router
 * @apiDefine SatelliteParam
 * @apiParam {String} name Name of the satellite.
 * @apiParam {UUIDV4} roomId Identifier of the room to which the satellite belongs.
 */
@FridayRouter('/v1/satellite')
export default class SatelliteRouter {
  readonly friday: Friday;

  constructor(friday: Friday) {
    this.friday = friday;
  }

  /**
   * login satellite
   * @apiName login
   * @apiDescription This route allows you to get login for master connection
   * @apiParam {json}
   * {
   *   username: 'tony.stark@friday.fr',
   *   password: 'Pepper4EverEqualILoveU3000',
   * }
   * @api {post} /api/v1/satellite/login
   * @apiGroup Satellite
   * @apiUse SatelliteParam
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   message: 'Server has started',
   * }
   */
  @Post({
    path: '/login', authenticated: false, rateLimit: false, aclMethod: 'login', aclResource: 'satellite',
  })
  login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const sessionJWT = await Master.login(username, password);

    logger.info('Get master information');
    await Master.getMqttConfig(sessionJWT.accessToken);

    logger.info('Get the mqtt options from master');
    const infoMaster = fs.readJsonSync(file);
    this.friday.satelliteId = decrypt(infoMaster.satelliteId, Master.masterId);
    await this.friday.server!.startMqtt(
      JSON.parse(
        decrypt(infoMaster.mqttInfo, this.friday.satelliteId),
      ),
    );
    logger.info('Server has started');
    this.friday.server!.mqttServer.sendMessage({
      topic: TopicsTypes.SATELLITE_HEARTBEAT, message: { message: 'I am alive !', satelliteId: this.friday.satelliteId }, type: MqttMessageTypes.MESSAGE_SEND, sender: `${this.friday.satelliteId}`,
    }, { sendAll: true });
    res.json({ message: 'Server has started' });
  };
}
