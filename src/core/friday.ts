import Event from '../utils/event';
import Scheduler from '../utils/scheduler';
import jobs from '../config/jobs';
import Log from '../utils/log';

const logger = new Log();

export default class Friday {
  public event = new Event();
  public scheduler = new Scheduler(this.event, jobs);
  public satelliteId: void|string = '';

  private debug: boolean;

  constructor(debug: boolean) {
    this.debug = debug;
  }

  start() {
    logger.info('Friday is starting');
    if (this.debug) {
      logger.info('Friday enter in debug mode !');
    }
    logger.info('Friday has started');
  }
}
