<template>
    <div class="page">
        <HeaderComponent
            title="修改收货"
            right-text="删除"
            @right-click="del()"
        ></HeaderComponent>
        <div class="main">
            <ul>
                <li>收货人</li>
                <li><input type="text" placeholder="收货人姓名" /></li>
            </ul>
            <ul>
                <li>联系方式</li>
                <li><input type="text" placeholder="联系人手机号" /></li>
            </ul>
            <ul>
                <li>所在地区</li>
                <li>
                    <input
                        type="text"
                        placeholder="请选择收货地址"
                        class="area"
                    />
                </li>
            </ul>
            <ul>
                <li>详细地址</li>
                <li><input type="text" placeholder="街道详细地址" /></li>
            </ul>
            <ul>
                <li>设置为默认地址</li>
                <li><input type="checkbox" checked /></li>
            </ul>
            <button type="button" class="submit-save">修改</button>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import HeaderComponent from '../../../components/header';
import { safeUser } from '../../../assets/js/libs/utils';

export default {
    data() {
        return {
            aid: this.$route.query.aid
        }
    },
    components: {
        HeaderComponent
    },
    created() {
        safeUser(this)
    },
    methods: {

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
    overflow: hidden;
    background-color: #ffffff;
}
.main {
    width: 100%;
    margin-top: 1rem;
}
.main ul {
    width: 100%;
    height: 1.02rem;
    border-bottom: #efefef 1px solid;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
}
.main ul li {
    font-size: 0.32rem;
    margin-left: 0.3rem;
}
.main ul li:nth-child(2) {
    width: 62%;
    height: 100%;
}
.main ul li input[type="text"] {
    width: 100%;
    height: 100%;
    font-size: 0.32rem;
}
.main ul li .area {
    font-size: 0.28rem !important;
}
.main ul li input[type="checkbox"] {
    width: 0.4rem;
    height: 0.4rem;
    margin-top: 0.3rem;
}
.main .submit-save {
    width: 85%;
    height: 0.8rem;
    background-color: #fcb40a;
    border-radius: 4px;
    margin: 0 auto;
    display: block;
    border: 0 none;
    outline: none;
    font-size: 0.32rem;
    color: #ffffff;
    margin-top: 0.4rem;
}
</style>
