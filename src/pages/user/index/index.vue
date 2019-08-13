<template>
    <div>
        <header>
            <div class="back-wrap" @click="$router.go(-1)">
                <img src="../../../assets/images/home/goods/back.png" alt="" />
            </div>
            <div class="title">会员中心</div>
        </header>
        <main>
            <div class="myHeader">
                <div class="head-wrap">
                    <img
                        :src="
                            userData.head
                                ? userData.head
                                : require('../../../assets/images/user/my/default-head.png')
                        "
                        alt=""
                    />
                </div>
                <div class="nickname">
                    {{ this.isLogin ? userData.nickname : "昵称" }}
                </div>
                <div class="vip">我的积分：0</div>
            </div>
            <div class="all-order">
                <div class="left">全部订单</div>
                <div class="right">查看全部订单</div>
            </div>
            <div class="order-item">
                <ul>
                    <li class="icon">
                        <img
                            src="../../../assets/images/user/my/pay.png"
                            alt=""
                        />
                    </li>
                    <li>待支付</li>
                </ul>
                <ul>
                    <li class="icon">
                        <img
                            src="../../../assets/images/user/my/shouhuo.png"
                            alt=""
                        />
                    </li>
                    <li>待收货</li>
                </ul>
                <ul>
                    <li class="icon">
                        <img
                            src="../../../assets/images/user/my/comment.png"
                            alt=""
                        />
                    </li>
                    <li>待评价</li>
                </ul>
            </div>
            <div class="mylist">
                <ul @click="$router.push('/profile')">
                    <li>个人资料</li>
                    <li class="li-right"></li>
                </ul>
                <ul @click="$router.push('/address')">
                    <li>地址管理</li>
                    <li class="li-right"></li>
                </ul>
                <ul>
                    <li>绑定手机</li>
                    <li class="li-right"></li>
                </ul>
                <ul>
                    <li>修改密码</li>
                    <li class="li-right"></li>
                </ul>
                <ul>
                    <li>我的收藏</li>
                    <li class="li-right"></li>
                </ul>
            </div>
            <div
                class="btn"
                @click="
                    $store.state.user.isLogin
                        ? outLogin()
                        : $router.push('/login')
                "
            >
                {{ this.isLogin ? "安全退出" : "登录/注册" }}
            </div>
        </main>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { MessageBox, Toast } from 'mint-ui';

let oToast = Toast;
export default {
    data() {
        return {
            userData: []
        }
    },
    computed: {
        ...mapState({
            "uid": (state) => state.user.uid,
            "nickname": (state) => state.user.nickname,
            "isLogin": (state) => state.user.isLogin,
            "authToken": (state) => state.user.authToken
        })
    },
    methods: {

        // 安全退出
        outLogin() {
            MessageBox.confirm('确定要退出吗?').then(action => {
                if (action === 'confirm') {
                    this.$request(this.$config.baseApi + "/home/user/safeout?token=" + this.$config.token, "post", { uid: this.uid }).then(res => {
                        console.log(res)
                        if (res.code === 200) {
                            this.$store.commit("user/outLogin")
                            this.$router.push("/login");
                        } else {
                            oToast(res.data)
                        }
                    })
                }
            });
        },
        getUserInfo() {
            this.$request(this.$config.baseApi + "/user/myinfo/userinfo/uid/" + this.$store.state.user.uid + "?token=" + this.$config
                .token).then(res => {
                    console.log(res);
                    if (res.code === 200) {
                        this.userData = res.data;
                    }
                });
        }

    },
    created() {
        this.getUserInfo()
    },
    mounted() {
        document.title = this.$route.meta.title
    }
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
main .myHeader {
    margin-top: 1rem;
    height: 2.8rem;
    background: url("../../../assets/images/user/my/mybg.png") no-repeat;
    position: relative;
}
main .head-wrap {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    left: 5%;
    top: 45%;
}
main .head-wrap img {
    width: 100%;
    height: 100%;
}
main .nickname {
    color: #fff;
    font-size: 0.24rem;
    position: absolute;
    top: 55%;
    left: 25%;
}
main .vip {
    color: #fff;
    font-size: 0.24rem;
    position: absolute;
    top: 70%;
    left: 25%;
}
main .all-order {
    height: 0.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 3%;
    padding-right: 3%;
    font-size: 0.28rem;
    color: #323232;
    background: #fff;
    border-bottom: #efefef 1px solid;
}
main .all-order .right {
    font-size: 0.24rem;
}
main .order-item {
    height: 1.4rem;
    background: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
main .icon {
    width: 0.72rem;
    height: 0.6rem;
    text-align: center;
}
main .icon img {
    height: 100%;
}
main .order-item li {
    font-size: 0.24rem;
    color: #323232;
}
main .mylist {
    margin-top: 0.3rem;
    background: #fff;
}
main .mylist ul {
    height: 0.8rem;
    border-bottom: 1px solid #efefef;
    display: flex;
    padding-left: 10%;
    font-size: 0.32rem;
    align-items: center;
    justify-content: space-between;
}
main .mylist ul .li-right {
    width: 0.4rem;
    height: 0.4rem;
    margin-right: 3%;
    background: url("../../../assets/images/common/right_arrow.png") no-repeat;
    background-size: 0.4rem;
}
main .btn {
    width: 70%;
    height: 0.8rem;
    margin: 0 auto;
    background-color: #e51b19;
    border-radius: 3px;
    line-height: 0.8rem;
    text-align: center;
    font-size: 0.32rem;
    color: #ffffff;
    margin-top: 0.2rem;
}
</style>
