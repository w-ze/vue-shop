import config from "../../../assets/js/conf/config"
import { request } from '../../../assets/js/libs/request';


export function getAttrData(gid) {
    // console.log(config.baseApi + "/home/goods/info?gid=" + gid + "&type=details&token=" + config.token)
    return request(config.baseApi + "/home/goods/info?gid=" + gid + "&type=spec&token=" + config.token)
}