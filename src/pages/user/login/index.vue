<template>
    <div class="app">
        <header>
            <div class="back-wrap" @click="$router.go(-1)">
                <img src="../../../assets/images/home/goods/back.png" alt="" />
            </div>
            <div class="title">登录</div>
        </header>
        <main>
            <div class="user">
                <input
                    type="tel"
                    name=""
                    id=""
                    placeholder="手机号"
                    v-model="user"
                />
            </div>
            <div class="pass">
                <input
                    type="password"
                    name=""
                    id=""
                    placeholder="密码"
                    v-model="pass"
                />
            </div>
            <button @click="login()">登录</button>
            <div class="find">
                <div class="forget">
                    <div class="img-wrap">
                        <img
                            src="../../../assets/images/home/index/forget.png"
                            alt=""
                        />
                    </div>
                    <div class="word">忘记密码</div>
                </div>
                <div class="register" @click="$router.push('/register')">
                    <div class="img-wrap">
                        <img
                            src="../../../assets/images/home/index/reg.png"
                            alt=""
                        />
                    </div>
                    <div class="word">快速注册</div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import { Toast } from "mint-ui";

let oToast = Toast;
export default {
    components: {},
    props: {},
    data() {
        return {
            user: "",
            pass: "",
            pageFrom: this.$route.query.pageFrom
        }
    },
    watch: {},
    computed: {},
    methods: {
        goPage(url) {
            this.$router.replace(url)
        },
        login() {
            if (this.user.match(/^\s*$/)) {
                oToast("请输入您的手机号");
                return;
            }
            if (this.pass.match(/^\s*$/)) {
                oToast("请输入密码");
                return;
            }
            this.$request(this.$config.baseApi + "/home/user/pwdlogin?token=" + this.$config.token, "post",
                { cellphone: this.user, password: this.pass }).then(res => {
                    console.log(res)
                    if (res.code === 200) {
                        this.$store.commit("user/login",
                            {
                                uid: res.data.uid,
                                nickname: res.data.nickname,
                                isLogin: true,
                                authToken: res.data.auth_token
                            })
                        if (this.pageFrom === "reg") {
                            this.$router.go(-2);
                        } else {
                            this.$router.go(-1)
                        }
                    } else {
                        oToast(res.data);
                    }
                })
        }
    },
    created() { },
    mounted() { }
}
</script>
<style scoped>
header {
    height: 1rem;
    border-bottom: 1px solid #ccc;
    font-style: 0.32rem;
    color: #323232;
    display: flex;
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100vw;
}
header .back-wrap {
    width: 0.8rem;
    height: 0.8rem;
    margin-top: 0.1rem;
}
header .back-wrap img {
    width: 100%;
}
header .title {
    flex: 1;
    padding-right: 0.8rem;
    text-align: center;
    line-height: 1rem;
}
main {
    padding-top: 1.5rem;
}
main button {
    width: 90%;
    height: 0.8rem;
    background: #eb1625;
    line-height: 0.8rem;
    text-align: center;
    color: #ffffff;
    margin: 0 auto;
    display: block;
    border-radius: 3px;
    font-size: 0.32rem;
}
main .user,
.pass {
    width: 90%;
    height: 0.8rem;
    border: #efefef solid 1px;
    border-radius: 2px;
    background: #ffffff;
    margin: 0 auto;
    line-height: 0.8rem;
    padding-left: 0.5rem;
    font-size: 0.7rem;
    margin-bottom: 0.2rem;
    position: relative;
}
main input {
    width: 80%;
    height: 96%;
    display: block;
}
.app {
    background: #fff;
    height: 100vh;
}
main .find {
    display: flex;
    justify-content: space-between;
    padding: 0 5%;
    margin-top: 0.2rem;
}
main .register,
.forget {
    display: flex;
}
main .img-wrap {
    width: 0.32rem;
    height: 0.32rem;
}
main .img-wrap img {
    width: 100%;
    height: 100%;
}
main .word {
    font-size: 0.24rem;
}
</style>