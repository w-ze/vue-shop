<template>
    <div class="app">
        <header>
            <div class="back-wrap" @click="$router.go(-1)">
                <img src="../../../assets/images/home/goods/back.png" alt="" />
            </div>
            <div class="title">注册</div>
        </header>
        <main>
            <div class="user-wrap">
                <div class="user">
                    <input type="tel" placeholder="验证码" v-model="vcode" />
                </div>
                <div class="msg-wrap">
                    <div class="msg" @click="changeMsg($event)">
                        <img
                            :src="
                                $config.baseApi +
                                    '/vcode/chkcode?token=' +
                                    $config.token
                            "
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <div class="user-wrap">
                <div class="user">
                    <input
                        type="tel"
                        placeholder="请输入手机号"
                        v-model="user"
                    />
                </div>
                <div
                    :class="{ getCode: true, active: isActive }"
                    @click="getCode()"
                >
                    {{ msgText }}
                </div>
            </div>
            <div class="pass">
                <input
                    type="tel"
                    placeholder="请输入短信验证码"
                    v-model="msg"
                />
            </div>
            <div class="pass">
                <input
                    :type="isOpenPwd ? 'text' : 'password'"
                    name=""
                    id=""
                    placeholder="密码"
                    v-model="pass"
                />
                <mt-switch v-model="isOpenPwd"></mt-switch>
            </div>
            <button @click="submitData()">注册</button>
        </main>
    </div>
</template>

<script>
import { Switch } from 'mint-ui';
import { Toast } from 'mint-ui';
let oToast = Toast;
import Vue from "vue"
Vue.component("mt-switch", Switch);
export default {
    components: {},
    props: {},
    data() {
        return {
            isOpenPwd: false,
            user: "",
            pass: "",
            msg: "",
            msgText: "获取验证码",
            isActive: false,
            flag: true,
            isSumbit: true,
            vcode: ""
        }
    },
    watch: {},
    computed: {},
    methods: {
        //注册提交数据
        async submitData() {
            if (this.vcode.match(/^\s*$/)) {
                oToast("请输入图文验证码")
                return;
            }
            let checkVcodeData = await this.checkedVcode()
            if (checkVcodeData.code === 201) {
                oToast(checkVcodeData.data)
                return;
            }

            if (this.user.match(/^\s*$/)) {
                oToast("请输入手机号")
                return;
            }
            let checkUserData = await this.checkUserReg()
            // console.log(checkUserData)
            if (checkUserData.isreg === '1') {
                oToast("此手机号已注册，请登录或更换手机号")
                return;
            }
            if (this.pass.match(/^\s*$/)) {
                oToast("请输入验证码")
                return;
            }
            if (this.msg.match(/^\s*$/)) {
                oToast("请输入密码")
                return;
            }
            if (this.isSumbit) {
                this.isSumbit = false;
                this.$request(this.$config.baseApi + "/home/user/reg?token=" + this.$config.token, "post",
                    { vcode: this.msg, cellphone: this.user, password: this.pass }).then(res => {
                        console.log(res)
                        if (res.code === 200) {
                            this.$router.replace("/login?pageFrom=reg");
                        } else {
                            oToast(res.data);
                            this.isSumbit = true;
                        }
                    })
            }
        },
        //获取短信验证码
        async getCode() {
            if (this.flag) {
                if (this.vcode.match(/^\s*$/)) {
                    oToast("请输入图文验证码")
                    return;
                }
                let checkVcodeData = await this.checkedVcode()
                if (checkVcodeData.code === 201) {
                    oToast(checkVcodeData.data)
                    return;
                }
                if (this.user.match(/^\s*$/)) {
                    oToast("请输入手机号")
                    return;
                }
                let checkUserData = await this.checkUserReg()
                console.log(checkUserData)
                if (checkUserData.isreg === '1') {
                    oToast("此手机号已注册，请登录或更换手机号")
                    return;
                }
                console.log(123123)
                let time = 10;
                this.msgText = `重新发送(${time}s)`;
                this.isActive = true;
                this.timer = setInterval(() => {
                    if (time > 0) {
                        time--;
                        this.msgText = `重新发送(${time}s)`
                    } else {
                        this.msgText = `获取验证码`
                        this.isActive = false;
                        clearInterval(this.timer)
                        this.flag = true;
                    }
                }, 1000)
            }
        },
        // 检测是否注册
        checkUserReg(callback) {
            return this.$request(this.$config.baseApi + "home/user/isreg?token=" + this.$config.token, "post", { username: this.user }).then((res) => {
                if (res.code === 200) {
                    return res.data;
                }
            })
        },
        // 点击刷新验证码
        changeMsg(e) {
            e.target.src = e.target.src + "&randnum=" + new Date().getTime;
            console.log(e.target.src)
        },
        // 检测图文验证码是否正确
        checkedVcode() {
            return this.$request(this.$config.baseApi + "/home/user/checkvcode?token=" + this.$config.token, "post", { vcode: this.vcode }).then(res => {
                return res;
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
main .user {
    width: 65%;
    height: 0.8rem;
    border: #efefef solid 1px;
    border-radius: 2px;
    background: #ffffff;
    line-height: 0.8rem;
    font-size: 0.7rem;
    margin-bottom: 0.2rem;
    position: relative;
    padding-left: 0.5rem;
    box-sizing: border-box;
}
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
    box-sizing: border-box;
    display: flex;
}
.code {
    display: flex;
    width: 90%;
    height: 0.8rem;
    border: #efefef solid 1px;
    border-radius: 2px;
    background: #ffffff;
    margin: 0 auto;
    line-height: 0.8rem;
    font-size: 0.7rem;
    margin-bottom: 0.2rem;
    position: relative;
    padding-left: 0.5rem;
    box-sizing: border-box;
}
.code-wrap {
    width: 20%;
}
.code-wrap img {
    width: 100%;
    height: 100%;
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
.user-wrap {
    display: flex;
    width: 90vw;
    margin: 0 auto;
}
.getCode {
    width: 35%;
    height: 0.8rem;
    color: #fff;
    background: #cc0004;
    border-radius: 3px;
    line-height: 0.8rem;
    font-size: 0.32rem;
    text-align: center;
}
.active {
    background: #eaeaea;
    color: #717376;
}
.msg-wrap {
    width: 35%;
    height: 0.8rem;
    border: #efefef solid 1px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
}
.msg {
    width: 80%;
    height: 80%;
    margin: auto;
    border: #efefef solid 1px;
}
.msg img {
    width: 100%;
    height: 100%;
}
</style>
<style>
.mint-switch-input:checked + .mint-switch-core {
    border-color: #cc0004;
    background-color: #cc0004;
}
</style>
