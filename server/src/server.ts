import Server from './api/app';
import Friday from './core/friday';
import Log from './utils/log';
import { MqttMessageTypes, TopicsTypes } from './utils/constants';

const port = parseInt(process.env.SERVER_PORT!, 10) || 3001;
const debug = (process.env.DEBUG_MODE! === 'true') || true;
const logger = new Log();

(async () => {
  try {
    // Create Friday object
    const friday = new Friday(debug);

    // Start Friday core
    await friday.start();

    // Create Friday Server
    const server = await new Server(port, friday, debug);

    // Start Friday server
    friday.server = await server.start();

    // interval 30 Min heartbeat
    setInterval(() => {
      // heartbeat to master
      server.mqttServer.sendMessage({
        topic: TopicsTypes.SATELLITE_HEARTBEAT, message: { message: 'I am alive !', satelliteId: friday.satelliteId }, type: MqttMessageTypes.MESSAGE_SEND, sender: `${friday.satelliteId}`,
      }, { sendAll: true });
    }, 30 * 60000);
  } catch (e) {
    logger.error(e);
  }
})();
