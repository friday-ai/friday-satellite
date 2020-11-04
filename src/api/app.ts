import MqttServer from './mqtt';
import Friday from '../core/friday';
import find from 'local-devices';
import axios from 'axios';
import {searchMaster} from '../utils/constants';
import Log from '../utils/log';

const logger = new Log();

export default class Server {
    public mqttServer!: MqttServer;
    public port: number;
    readonly friday: any;

    private debug: boolean;

    constructor(port: number, friday: Friday, debug: boolean) {
        this.port = port;
        this.friday = friday;
        this.debug = debug;
    }

    async start() {
        logger.info('Server is starting');
        if(this.debug) logger.info('Server enter in debug mode !');

        logger.info('Check connection to master');
        await this.searchMaster();

        logger.info('Get the mqtt options from master');
        const mqttOptions = {port: 1883};

        // send satellite discoverme
        logger.info('Send discoverme to master');

        // initialize and start the Mqtt server instance
        logger.info('start the Mqtt server');
        this.mqttServer = new MqttServer(this.friday, mqttOptions);
        await this.mqttServer.start();
        logger.info('The Mqtt server has started');
        logger.info('Server has started');
        return this;
    }

    private async searchMaster() {
        const axiosInstance = axios.create({
            timeout: 2000,
        });
        const devices = await find("192.168.1.0/24");
        console.log(await devices.map(async device => {
            try {
                let url: string = 'http://' + device.ip + searchMaster;
                if(this.debug) {
                    logger.info(url)
                }
                return await axiosInstance.get( url );
            } catch (e) {
                return null;
            }
        }));
    }
}
