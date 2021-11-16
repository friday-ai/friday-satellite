import MqttServer from './mqtt';
import Friday from '../core/friday';
import Log from '../utils/log';
import Master from '../core/master';

const logger = new Log();

export default class Server {
    public mqttServer!: MqttServer;
    public port: number;
    readonly friday: any;

    readonly debug: boolean;

    constructor(port: number, friday: Friday, debug: boolean) {
        this.port = port;
        this.friday = friday;
        this.debug = debug;
    }

    async start() {
        logger.info('Server is starting');
        if(this.debug) logger.info('Server enter in debug mode !');

        if (!Master.masterId) {
            await this.waitUntil(await Master.discovery());

            logger.info('Login to master');
            const sessionJWT = await Master.login('tony.stark@friday.fr', 'toto');

            logger.info('Get master information');
            const { mqttInfo, masterId } = await Master.infos(sessionJWT.accessToken);

            Master.masterId = masterId;

            logger.info('Get the mqtt options from master');
            const mqttOptions = mqttInfo;

            // initialize and start the Mqtt server instance
            logger.info('start the Mqtt server');
            this.mqttServer = new MqttServer(this.friday, mqttOptions);
            await this.mqttServer.start();
            logger.info('The Mqtt server has started');
        }

        logger.info('Server has started');
        return this;
    }


    private async waitUntil(condition: boolean) {
        return await new Promise(resolve => {
            const interval = setInterval(() => {
                logger.info(`${condition}`);
                if (condition) {
                    logger.info('Master is ready !');
                    resolve('true');
                    clearInterval(interval);
                }
            }, 3000);
        });
    }


}
