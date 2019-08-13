<template>
    <div>
        <div class="item-wrap">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div
                        class="swiper-slide"
                        v-for="(item, index) in goodsInfoData.images"
                        :key="index"
                    >
                        <img :src="item" alt="" />
                    </div>
                </div>
                <div class="swiper-pagination"></div>
                <!--分页器。如果放置在swiper-container外面，需要自定义样式。-->
            </div>
        </div>
        <div class="title">{{ goodsInfoData.title }}</div>
        <div class="price">￥{{ goodsInfoData.price }}</div>
        <div class="list">
            <div class="express">快递：{{ goodsInfoData.freight }}元</div>
            <div class="count">月销量{{ goodsInfoData.sales }}件</div>
        </div>
        <div class="comment-list" v-show="!isCommentsNull">
            <div class="comment-title">
                商品评价({{ this.commentsData.length }})
            </div>
            <div
                class="comment"
                v-for="(item, index) in commentsData"
                :key="index"
            >
                <div class="user">
                    <div class="user-wrap">
                        <img :src="item.head" alt="" />
                    </div>
                    <div class="nickname">{{ item.nickname }}</div>
                </div>
                <div class="comment-content">{{ item.content }}</div>
                <div class="date">{{ item.times }}</div>
            </div>
            <div
                class="comment-more"
                @click="
                    goPage('/goods/info/info_comment', {
                        gid: $route.query.gid
                    })
                "
            >
                查看更多评价
            </div>
        </div>
        <div class="no-comment" v-show="isCommentsNull">没有相关评论！</div>
        <footer>
            <div class="fav">收藏</div>
            <div class="cart-add" @click="addCart()">加入购物车</div>
            <div
                ref="cart-panel"
                :class="{ 'attr-wrap': true, trans: isTrans }"
            >
                <div class="close">
                    <div class="x" @click="close()"></div>
                    <div class="line"></div>
                    <div class="point"></div>
                </div>
                <div class="attr-show">
                    <div class="goodsImg-wrap" ref="goods-info">
                        <img
                            ref="goods-img"
                            :src="
                                goodsInfoData.images
                                    ? goodsInfoData.images[0]
                                    : 0
                            "
                            alt=""
                        />
                    </div>
                    <div class="goods-info">
                        <div class="goods-title">{{ goodsInfoData.title }}</div>
                        <div class="goods-price">
                            ￥{{ goodsInfoData.price }}
                        </div>
                    </div>
                    <div class="goods-code">
                        商品编码：{{ goodsInfoData.gid }}
                    </div>
                </div>

                <div
                    class="rows-wrap"
                    v-for="(item, index) in attrData"
                    :key="index"
                >
                    <div class="rows-title">{{ item.title }}</div>
                    <div class="rows">
                        <div
                            :class="{
                                'rows-params': true,
                                active: item2.checked
                            }"
                            v-for="(item2, index2) in item.values"
                            :key="index2"
                            @click="setAttr(index, index2)"
                        >
                            {{ item2.value }}
                        </div>
                    </div>
                </div>
                <div class="count-wrap">
                    <div class="count">购买数量</div>
                    <div class="num-wrap">
                        <div
                            :class="
                                amount > 1
                                    ? { mul: true }
                                    : { mul: true, none: true }
                            "
                            @click="deAmount()"
                        >
                            -
                        </div>
                        <div class="num">
                            <input
                                type="tel"
                                :value="amount"
                                class="num-input"
                                @keyup="changeAmount($event)"
                            />
                        </div>
                        <div class="add" @click="inAmount()">+</div>
                    </div>
                </div>
                <div class="sureBtn" @click="submitData()">确定</div>
            </div>
        </footer>
        <div :class="{ mark: true, hide: isHide }"></div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
import { createNamespacedHelpers, mapMutations } from 'vuex'
import { lazyImg } from "../../../assets/js/libs/utils";
import Swiper from "../../../assets/js/libs/swiper/swiper";
import TweenMax from "../../../assets/js/libs/TweenMax"

let { mapState, mapActions } = createNamespacedHelpers("goodsInfo")
let oToast = Toast;
export default {
    components: {

    },
    props: {},
    data() {
        return {
            gid: this.$route.query.gid ? this.$route.query.gid : "",
            isHide: true,
            isTrans: false,
            amount: 1,
            curPage: 1,
            isMove: true
        }
    },
    watch: {},
    computed: {
        ...mapState(["goodsInfoData"]),
        ...mapState(['commentsData']),
        ...mapState(['isCommentsNull']),
        ...mapState(['attrData'])
    },
    methods: {
        ...mapActions(["getComment"]),
        ...mapActions(["getContent"]),
        ...mapActions(["getAttr"]),
        ...mapMutations({
            "addItem": "cart/addItem"
        }),
        goPage(url, query) {
            this.$router.replace({ path: url, query: query });
        },
        addCart() {
            this.isHide = false;
            this.isTrans = true;
        },
        close() {
            if (this.isMove) {
                this.isHide = true;
                this.isTrans = false;
            }
        },
        inAmount() {
            this.amount++;
        },
        deAmount() {
            this.amount > 1 ? this.amount-- : 1;
        },
        changeAmount(e) {
            // console.log(e)
            this.amount = e.target.value;
            this.amount = this.amount.replace(/[a-zA-Z]|[\u4e00-\u9fa5]/g, "")
            if (this.amount === "" || parseInt(this.amount) === 0) {
                this.amount = 1;
            }
        },
        setAttr(index, index2) {
            for (let i = 0; i < this.attrData[index].values.length; i++) {
                if (this.attrData[index].values[i].checked) {
                    this.attrData[index].values[i].checked = false;
                }
            }
            this.attrData[index].values[index2].checked = true;

        },
        submitData() {
            if (this.attrData.length > 0) {
                if (this.isMove) {
                    this.isMove = false;
                    let isChecked = false;
                    for (let i = 0; i < this.attrData.length; i++) {
                        isChecked = false;
                        for (let j = 0; j < this.attrData[i].values.length; j++) {
                            if (this.attrData[i].values[j].checked) {
                                isChecked = true;
                                break;
                            }
                        }
                        if (!isChecked) {
                            oToast("请选择" + this.attrData[i].title, isChecked)
                            break;
                        }
                    }
                    if (isChecked) {
                        let cartIcon = document.getElementById("cart")
                        let cartTop = window.innerHeight - this.$refs['cart-panel'].offsetHeight;
                        let cloneImg = this.$refs['goods-img'].cloneNode(true);
                        cloneImg.style.cssText = "width:0.4rem;height:0.4rem"
                        this.$refs['goods-info'].appendChild(cloneImg)
                        // console.log(cartIcon.offsetLeft)
                        oToast("提交数据")
                        TweenMax.to(cloneImg, 2, {
                            bezier: [{ x: 0, y: 0 }, { x: 30, y: -130 }, { x: cartIcon.offsetLeft, y: -cartTop }], onComplete: () => {
                                cloneImg.remove()
                                this.isMove = true;
                                let cartItem = {}, attrs = [], param = [];
                                if (this.attrData.length > 0) {
                                    for (let i = 0; i < this.attrData.length; i++) {
                                        param = [];
                                        for (let j = 0; j < this.attrData[i].values.length; j++) {
                                            if (this.attrData[i].values[j].checked) {
                                                param.push(
                                                    {
                                                        paramid: this.attrData[i].values[j].vid,
                                                        title: this.attrData[i].values[j].value
                                                    }
                                                )
                                            }
                                        }
                                        attrs.push(
                                            {
                                                attrid: this.attrData[i].attrid,
                                                title: this.attrData[i].title,
                                                param: param
                                            }
                                        );
                                    }
                                }
                                cartItem = {
                                    gid: this.gid,
                                    title: this.goodsInfoData.title,
                                    amount: this.amount,
                                    price: this.goodsInfoData.price,
                                    img: this.goodsInfoData.images[0],
                                    "checked": true,
                                    freight: this.goodsInfoData.freight,
                                    attrs: attrs
                                }
                                console.log(JSON.stringify(cartItem))
                                this.addItem(cartItem)
                            }
                        });
                        TweenMax.to(cloneImg, 0.2, { rotation: 360, repeat: -1 })
                    }
                }
            }


        }
    },
    created() {

        // this.$store.commit("goodsInfo/getComment", { gid: this.gid })
        // console.log(this.gid)
        this.getContent(
            {
                gid: this.gid,
                callback: () => {
                    this.$nextTick(() => {
                        var mySwiper = new Swiper('.swiper-container', {
                            // autoplay: true,//等同于以下设置
                            autoplay: {
                                delay: 3000,
                                stopOnLastSlide: false,
                                disableOnInteraction: false,
                            },
                            pagination: {
                                el: '.swiper-pagination',
                                clickable: true
                            },
                        });
                    })
                }
            })
        this.getComment({ gid: this.gid, curPage: this.curPage });
        this.getAttr({ gid: this.gid })
    },
    mounted() {
        console.log(this.attrData)

        lazyImg()
    }
}
</script>
<style scoped>
@import "../../../assets/js/libs/swiper/swiper.css";
.item-wrap {
    width: 100vw;
    /* height: 7.5rem; */
}
.item-wrap img {
    width: 100%;
    vertical-align: top;
}
.title {
    height: 1.2rem;
    font-size: 0.28rem;
    /* line-height: 1.2rem; */
    padding-left: 5%;
    padding-right: 5%;
    background: #fff;
    display: flex;
    align-items: center;
}
.price {
    height: 0.64rem;
    font-size: 0.28rem;
    line-height: 0.64rem;
    color: #f93036;
    padding-left: 5%;
    background: #fff;
}
.list {
    height: 1rem;
    padding-left: 5%;
    display: flex;
    justify-content: space-between;
    background: #fff;
}
.express,
.count {
    font-size: 0.24rem;
    color: #969696;
    line-height: 1rem;
}
.count {
    padding-right: 5%;
}
.no-comment {
    height: 1rem;
    background: #fff;
    margin-top: 1rem;
    text-align: center;
    font-size: 0.32rem;
    line-height: 1rem;
    margin-bottom: 1rem;
}
.comment-list {
    background: #fff;
    padding-bottom: 0.6rem;
    margin-bottom: 1rem;
}
.comment-title {
    padding-left: 5%;
    color: #7b7f82;
    font-size: 0.32rem;
    margin-top: 0.2rem;
}
.comment {
    padding-left: 5%;
    margin-top: 0.2rem;
}
.comment .user {
    display: flex;
    height: 1rem;
    font-size: 0.28rem;
    align-items: center;
}
.comment .user-wrap {
    width: 0.6rem;
    height: 0.6rem;
    margin-top: 0.2rem;
}
.comment .user-wrap img {
    width: 100%;
}
.comment .nickname {
    margin-top: 0.2rem;
    line-height: 0.8rem;
}
.comment .comment-content {
    font-size: 0.32rem;
    margin-top: 0.2rem;
    line-height: 0.48rem;
}
.comment .date {
    color: #7b7f82;
    font-size: 0.28rem;
    margin-top: 0.2rem;
}
.comment-more {
    width: 2.4rem;
    height: 0.52rem;
    border: 1px solid #d50a17;
    text-align: center;
    font-size: 0.28rem;
    color: #323232;
    line-height: 0.52rem;
    margin: 0 auto;
    margin-top: 0.6rem;
}
footer {
    height: 1.2rem;
    display: flex;
    color: #fff;
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    z-index: 99;
}
footer .fav {
    text-align: center;
    background: #fcb40a;
    width: 50%;
    z-index: 3;
    font-size: 0.36rem;
    line-height: 1.2rem;
}
footer .cart-add {
    text-align: center;
    background: #cc0004;
    width: 50%;
    z-index: 3;
    font-size: 0.36rem;
    line-height: 1.2rem;
}
.mark {
    height: 100vh;
    width: 100vw;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
}
.hide {
    display: none;
}
.attr-wrap {
    width: 100vw;
    height: 65vh;
    background: rgb(238, 238, 238);
    position: absolute;
    left: 0;
    bottom: -1000%;
    z-index: 99;
    transition: 1s;
    /* display: none; */
}
.attr-wrap .attr-show {
    height: 1.2rem;
    border-bottom: 1px solid #efefef;
    display: flex;
    justify-content: space-between;
    background: #fff;
}
.attr-wrap .goodsImg-wrap {
    width: 0.8rem;
    height: 0.8rem;
    margin-top: 0.2rem;
    margin-left: 0.2rem;
    margin-right: 0.2rem;
    position: relative;
}
.attr-wrap .goods-title {
    width: 4rem;
    margin-top: 0.12rem;
    font-size: 0.24rem;
    color: #323232;
}
.attr-wrap .goods-price {
    color: #f73f46;
    font-size: 0.24rem;
    /* margin-top: 0.25rem; */
}
.attr-wrap .attr-show img {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
}
.attr-wrap .goods-code {
    color: #888888;
    width: 3.2rem;
    font-size: 0.24rem;
    margin-top: 0.7rem;
    /* padding-right: 5%; */
}
.attr-wrap .rows-wrap {
    padding-left: 0.2rem;
    background: #fff;
}
.attr-wrap .rows-wrap .rows-title {
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.32rem;
    color: #323232;
}
.attr-wrap .rows {
    padding-bottom: 0.15rem;
    display: flex;
}
.attr-wrap .rows-params {
    padding: 0.2rem;
    background: #efefef;
    border-radius: 0.08rem;
    margin-right: 0.2rem;
    font-size: 0.28rem;
    color: #323232;
}
.count-wrap {
    background: #fff;
    height: 1.2rem;
    padding-left: 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.count-wrap .count {
    font-size: 0.32rem;
    color: #323232;
    line-height: 1.2rem;
}
.count-wrap .num-wrap {
    margin-right: 0.2rem;
    display: flex;
    border: 1px solid #000;
    height: 0.6rem;
    border-radius: 0.06rem;
}
.num {
    width: 0.76rem;
    height: 0.6rem;
    text-align: center;
    font-size: 0.1rem;
    line-height: 0.6rem;
    color: #323232;
    display: flex;
    justify-content: center;
    align-content: center;
}
.add {
    text-align: center;
    font-size: 0.1rem;
    color: #323232;
    height: 0.4rem;
    width: 0.6rem;
    margin-top: 0.1rem;
    border-left: 1px solid #000;
    line-height: 0.4rem;
}
.mul {
    text-align: center;
    font-size: 0.1rem;
    color: #323232;
    height: 0.4rem;
    width: 0.6rem;
    margin-top: 0.1rem;
    border-right: 1px solid #000;
    line-height: 0.4rem;
}
.none {
    color: #b5b5b5;
}
.sureBtn {
    width: 100vw;
    background: #cf0005;
    color: #fff;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    position: absolute;
    left: 0;
    bottom: 0;
    font-size: 0.32rem;
}
.close {
    width: 0.4rem;
    height: 1.2rem;
    position: absolute;
    top: -1rem;
    right: 0.2rem;
}
.x {
    width: 0.4rem;
    height: 0.4rem;
    background: url("../../../assets/images/home/goods/x.png");
    background-size: 0.4rem;
}
.line {
    width: 0.02rem;
    background: #fff;
    height: 0.72rem;
    margin-left: 0.18rem;
}
.point {
    background: #000;
    width: 0.1rem;
    height: 0.1rem;
    border-radius: 50%;
    margin-left: 0.13rem;
}
.trans {
    display: block;

    transform: translateY(-12rem);
}
.num-input {
    width: 0.76rem;
    text-align: center;
}
.attr-wrap .active {
    background: #fda208;
    color: #fff;
}
</style>