import { KVArr } from './interfaces';

export const MasterHost: KVArr<KVArr<string>> = {
  development: {
    host: 'localhost',
    port: '3000',
  },
  production: {
    host: 'friday.master.local',
    port: '1443',
  },
};
export enum TopicsTypes {
  DEVICE_DESTROY = 'device/destroy',
  DEVICE_SET = 'device/set',
  PLUGIN_DISCOVERME = 'plugin/discoverme',
  PLUGIN_HEARTBEAT = 'plugin/heartbeat',
  PLUGIN_INIT = 'plugin/init',
  SATELLITE_DISCOVERME = 'satellite/discoverme',
  SATELLITE_HEARTBEAT = 'satellite/heartbeat',
  SATELLITE_INIT = 'satellite/init',
  STATE_SET = 'state/set',
}

export enum EventsType {
  // State events
  STATES_PURGE = 'states.purge',
  STATE_SET = 'state.set',
  // System events
  SYSTEM_STARTED = 'system.started',
  SYSTEM_UPDATED = 'system.updated',
  SYSTEM_SHUTDOWN = 'system.shutdown',
  SYSTEM_CHECK_UPDATE = 'system.check_update',
  SYSTEM_BACKUP = 'system.backup',
  // Websocket events
  WEBSOCKET_SEND = 'websocket.send',
  WEBSOCKET_SEND_ALL = 'websocket.send.all',
  WEBSOCKET_SEND_ADMIN = 'websocket.send.admin',
  // Mqtt events
  MQTT_PUBLISH = 'mqtt.publish',
  MQTT_PUBLISH_ALL = 'mqtt.publish.all',
}

export const TopicHeaderPub = 'friday/master';
export const TopicHeaderSub = 'friday/satellite';

export enum TopicToSubscribe {
  'device/destroy',
  'device/set',
  'plugin/discoverme',
  'plugin/heartbeat',
  'plugin/init',
  'satellite/discoverme',
  'satellite/heartbeat',
  'satellite/init',
  'state/set',
}

export enum MqttMessageTypes {
  // Mqtt
  MQTT_CONNECTED = 'mqtt.connected',
  MQTT_ERROR = 'mqtt.error',
  MESSAGE_SEND = 'message.send',
  MESSAGE_SEND_ALL = 'message.send.all',
}

export const satelliteDiscovery = '/api/v1/satellite/discovery';
export const loginApi = '/api/v1/user/login';
export const loginIhm = '/api/v1/satellite/login';
export const masterInfo = '/api/v1/system/info';
export const mqttConfig = '/api/v1/system/mqtt/config';
export const configMasterDir = './config/fromMaster';

export const SALT_KEY = '5a0240fc-e5a6-4293-b1d0-36f6e0c6c0ae';
