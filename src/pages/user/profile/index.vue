<template>
    <div class="page">
        <HeaderComponent
            title="个人资料"
            right-text="保存"
            @right-click="save()"
        ></HeaderComponent>
        <div class="main">
            <ul class="head">
                <li>头像</li>
                <li>
                    <img
                        :src="
                            showHead
                                ? showHead
                                : require('../../../assets/images/user/my/default-head.png')
                        "
                        alt=""
                    /><input
                        ref="headfile"
                        type="file"
                        @change="uploadHead()"
                    />
                </li>
            </ul>
            <ul class="list">
                <li>昵称</li>
                <li>
                    <input
                        type="text"
                        placeholder="请设置昵称"
                        v-model="nickname"
                    />
                </li>
                <li class="arrow"></li>
            </ul>
            <ul class="list">
                <li>性别</li>
                <li>
                    <input
                        type="text"
                        placeholder="请选择性别"
                        :value="gender == 1 ? '男' : gender == 2 ? '女' : ''"
                        readonly
                        @click="isGender = !isGender"
                    />
                    <mt-actionsheet
                        :actions="genders"
                        v-model="isGender"
                    ></mt-actionsheet>
                </li>
                <li class="arrow"></li>
            </ul>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import {
    Actionsheet,
    Toast
} from 'mint-ui';
import HeaderComponent from '../../../components/header';
import {
    safeUser
} from '../../../assets/js/libs/utils';
Vue.component("mt-actionsheet", Actionsheet)
let oToast = Toast;
export default {
    data() {
        return {
            showHead: "",
            isGender: false,
            genders: [{
                name: "男",
                method: this.selectGender
            },
            {
                name: "女",
                method: this.selectGender
            }
            ],
            gender: 0,
            nickname: "",
            head: ""
        }
    },
    components: {
        HeaderComponent
    },
    methods: {
        getUserInfo() {
            this.$request(this.$config.baseApi + "/user/myinfo/userinfo/uid/" + this.$store.state.user.uid + "?token=" + this.$config
                .token).then(res => {
                    console.log(res);
                    if (res.code === 200) {
                        this.gender = parseInt(res.data.gender);
                        this.nickname = res.data.nickname;
                        this.showHead = res.data.head;
                    }
                });
        },
        save() {
            if (this.nickname.match(/^\s*$/)) {
                oToast("请输入昵称");
                return;
            }
            if (this.gender === 0) {
                oToast("请选择性别");
                return;
            }
            this.$request(this.$config.baseApi + "/user/myinfo/updateuser?token=" + this.$config.token, "post", {
                uid: this.$store.state.user.uid,
                nickname: this.nickname,
                gender: this.gender,
                head: this.head
            }).then(res => {
                if (res.code === 200) {
                    setTimeout(() => {
                        this.$router.go(-1)
                    }, 3000)
                }
                oToast(res.data);
            });
        },
        //上传头像
        uploadHead() {
            let headfile = this.$refs['headfile'].files[0]
            this.$request(this.$config.baseApi + "/user/myinfo/formdatahead?token=" + this.$config.token, "file", {
                headfile: headfile
            }).then((res) => {
                if (res.code === 200) {
                    this.showHead = "http://vueshop.glbuys.com/userfiles/head/" + res.data.msbox
                    this.head = res.data.msbox
                }
            })
        },
        //选择性别
        selectGender(data) {
            if (data.name === '男') {
                this.gender = 1;
            } else if (data.name === '女') {
                this.gender = 2;
            }
        },
        //获取会员信息

    },
    created() {
        safeUser(this);
        this.getUserInfo();
    },
    mounted() {
        document.title = this.$route.meta.title
    }
}
</script>

<style scoped>
.sub-header {
    width: 100%;
    height: 1rem;
    background-color: #ffffff;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    border-bottom: 1px solid #efefef;
    position: fixed;
    z-index: 10;
    left: 0;
    top: 0;
}

.sub-header .back {
    width: 0.8rem;
    height: 0.8rem;
    background-image: url("../../../assets/images/home/goods/back.png");
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
}

.sub-header .title {
    width: 79%;
    height: auto;
    font-size: 0.32rem;
    text-align: center;
}

.sub-header .right-btn {
    width: auto;
    height: auto;
    font-size: 0.32rem;
}

.page {
    width: 100%;
    height: 100vh;
    background-color: #ffffff;
    overflow: hidden;
}

.main {
    width: 100%;
    margin-top: 1.02rem;
}

.main ul.head {
    width: 100%;
    height: 1.2rem;
    border-bottom: 1px solid #efefef;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    justify-content: space-between;
    -webkit-justify-content: space-between;
}

.main ul.head li:nth-child(1) {
    font-size: 0.28rem;
    margin-left: 5%;
}

.main ul.head li:nth-child(2) {
    width: 1rem;
    height: 1rem;
    margin-right: 10%;
    position: relative;
    z-index: 1;
}

.main ul.head li:nth-child(2) img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
}

.main ul.head li:nth-child(2) input {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    opacity: 0;
}

.main ul.list {
    width: 100%;
    height: 0.8rem;
    border-bottom: 1px solid #efefef;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    justify-content: space-between;
    -webkit-justify-content: space-between;
    font-size: 0.28rem;
}

.main ul.list li:nth-child(1) {
    margin-left: 5%;
}

.main ul.list li:nth-child(2) {
    width: 50%;
    height: 100%;
    margin-left: 20%;
}

.main ul.list li:nth-child(2) input {
    width: 100%;
    height: 100%;
    text-align: right;
    font-size: 0.28rem;
}

.main ul.list li.arrow {
    width: 0.4rem;
    height: 0.4rem;
    background-image: url("../../../assets/images/common/right_arrow.png");
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
    margin-right: 3%;
}
</style>
