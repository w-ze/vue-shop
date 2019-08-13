let modules = {
    namespaced: true,
    state: {
        uid: localStorage['uid'] ? localStorage['uid'] : "",
        nickname: localStorage['nickname'] ? localStorage['nickname'] : "",
        isLogin: localStorage['isLogin'] ? Boolean(localStorage['isLogin']) : false,
        authToken: localStorage['authToken'] ? localStorage['authToken'] : ""
    },
    mutations: {
        login(state, payload) {
            state.uid = payload.uid;
            state.nickname = payload.nickname;
            state.isLogin = payload.isLogin;
            state.authToken = payload.authToken;
            localStorage['uid'] = payload.uid;
            localStorage['nickname'] = payload.nickname;
            localStorage['isLogin'] = payload.isLogin;
            localStorage['authToken'] = payload.authToken;
        },
        outLogin(state) {
            state.uid = "";
            state.nickname = "";
            state.isLogin = false;
            state.authToken = "";
            localStorage.removeItem("uid");
            localStorage.removeItem("nickname");
            localStorage.removeItem("isLogin");
            localStorage.removeItem("authToken")
        }
    }
}
export default modules;
