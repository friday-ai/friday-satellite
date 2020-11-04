import { QoS } from 'mqtt-packet';
import {EventsType, MqttMessageTypes} from './constants';

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

/**
 * Interface for array with key/value pair
 */
export interface KVArr<T> {
    [Key: string]: T;
}

/**
 * Options for sending mqtt message
 */
export interface MqttSendOptions {
    sendAll?: boolean;
}

/**
 * Interface for mqtt message
 */
export interface MqttMessagePayload {
    type: MqttMessageTypes;
    sender: string;
    topic: string;
    message: string;
    receiver?: string;
}

export interface ErrorType {
    name: string;
    message: string;
    cause?: Error;
    metadata?: Object;
}

/**
 * Interface for jobs scheduler
 */
export interface JobsInterface {
    name: string;
    rule: string;
    event: EventsType;
}
