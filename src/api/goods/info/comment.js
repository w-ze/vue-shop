import config from "../../../assets/js/conf/config"
import { request } from '../../../assets/js/libs/request';


export function getCommentData(gid, curPage) {
    console.log(config.baseApi + "home/reviews/index?gid=" + gid + "&type=details&token=" + config.token + "&page=" + curPage)
    return request(config.baseApi + "home/reviews/index?gid=" + gid + "&type=details&token=" + config.token + "&page=" + curPage)
}