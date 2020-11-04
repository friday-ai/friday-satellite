import Server from './api/app';
import Friday from './core/friday';
import Log from './utils/log';
import {TopicsTypes} from './utils/constants';

const port = parseInt(process.env.SERVER_PORT!, 10) || 3001;
const logger = new Log();

(async () => {
    try {
        // Create Friday object
        const friday = new Friday();

        // Start Friday core
        await friday.start();

        // Create Friday Server
        const server = await new Server(port, friday);

        // Start Friday server
        await server.start();

        // interval 30 Min heartbeat
        setInterval(() => {
            // heartbeat to master
            server.mqttServer.sendMessage({topic: TopicsTypes.SATELLITE_HEARTBEAT, message: 'I am alive !'});
        }, 30 * 60000);

    } catch (e) {
        logger.error(e);
    }
})();
