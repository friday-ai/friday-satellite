import { QoS } from 'mqtt-packet';

export interface MqttOptions {
    port: number;
    host?: string;
    hostname?: string
    path?: string
    protocol?: 'wss' | 'ws' | 'mqtt' | 'mqtts' | 'tcp' | 'ssl' | 'wx' | 'wxs';
    keepalive?: number;
    username?: string;
    password?: string;
    qos?: QoS;
}
