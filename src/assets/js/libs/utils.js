import echo from "./echo.js"
import config from "../conf/config"
//会员安全认证
function safeUser(pThis) {
    pThis.$request(config.baseApi + "/home/user/safe?token=" + config.token, "post", { uid: pThis.$store.state.user.uid, auth_token: pThis.$store.state.user.authToken }).then(res => {
        if (res.code !== 200) {
            pThis.$store.commit("user/outLogin");
            pThis.$router.replace("/login");
        }
    });
}
function lazyImg() {
    echo.init({
        offset: 100, //可是区域多少像素可以被加载
        throttle: 0 //设置图片延迟加载的时间
    });
}

export {
    safeUser,
    lazyImg
}
