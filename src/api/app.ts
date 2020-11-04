import MqttServer from './mqtt';
import Friday from '../core/friday';
import find from 'local-devices';
import ping from 'pingman';

export default class Server {
    public mqttServer!: MqttServer;
    public port: number;
    readonly friday: any;

    constructor(port: number, friday: Friday) {
        this.port = port;
        this.friday = friday;
    }

    async start() {
        // check connection to master
        await this.searchMaster();

        // get mqtt options
        const mqttOptions = {port: 1883};

        // send satellite discoverme

        // initialize and start the Mqtt server instance
        this.mqttServer = new MqttServer(this.friday, mqttOptions);
        await this.mqttServer.start();
        return this;
    }

    private async searchMaster() {
        const devices = await find("192.168.1.0/24");
        devices.forEach((device) =>  {
            let url = device.ip + ":8081/api/v1/master/info";
            console.log(ping(url));
        })
    }

}
