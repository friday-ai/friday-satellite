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

export const TopicHeaderSub = 'friday/master/';
export const TopicHeaderPub = 'friday/satellite/';

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

export const searchMaster = ':8081/api/v1/master/info';
