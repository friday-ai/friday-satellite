import loginMaster from './master.login';
import discovery from './master.discovery';
import infos from './master.infos';

export default class Master {
    static masterId: string;
    static login = loginMaster;
    static discovery = discovery;
    static infos = infos
}
