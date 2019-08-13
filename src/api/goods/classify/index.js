import config from "../../../assets/js/conf/config"
import { request } from '../../../assets/js/libs/request';

export function getClassifyData() {
    console.log(config.baseApi + "/home/category/menu?token=" + config.token)
    return request(config.baseApi + "/home/category/menu?token=" + config.token);
}
