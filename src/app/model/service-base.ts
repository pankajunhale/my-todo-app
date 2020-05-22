import {apiConstant} from './api-constant';
import {environment} from '../../environments/environment';

export abstract class ServiceBase {
    protected SERVER_URL = environment.serverUrl;
    protected BASE_API = apiConstant.apiPrefix;
    protected BASE_API_PATH_TODO = `${this.SERVER_URL}${this.BASE_API}/${apiConstant.todoApi}`;
    constructor() {}
}
