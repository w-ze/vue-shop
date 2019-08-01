<template>
    <div>
        <header>
            <div class="back-wrap" @click="$router.go(-1)">
                <img src="../../../assets/images/home/goods/back.png" alt="" />
            </div>
            <div class="title">购物车</div>
        </header>
        <main>
            <div
                class="cart-wrap"
                v-for="(item, index) in cartData"
                :key="index"
            >
                <div class="check">
                    <label
                        :class="{ checked: item.checked }"
                        @click="checkedItem(index)"
                    ></label>
                </div>
                <div class="cart-item">
                    <div class="head-wrap">
                        <div class="img-wrap">
                            <img
                                src="../../../assets/images/common/grey.jpg"
                                :data-echo="item.img"
                                alt=""
                            />
                        </div>
                        <div class="del" @click="delGoods(index)">
                            删除
                        </div>
                    </div>
                    <div class="info-wrap">
                        <div class="title">{{ item.title }}</div>
                        <div class="color">
                            <span
                                v-for="(item2, index2) in item.attrs"
                                :key="index2"
                            >
                                {{ item2.title }}：
                                <span
                                    v-for="(item3, index3) in item2.param"
                                    :key="index3"
                                >
                                    {{ item3.title }}
                                </span>
                            </span>
                        </div>
                        <div class="price">￥{{ item.price }}</div>
                    </div>
                </div>
                <div class="num-wrap">
                    <div
                        :class="
                            item.amount > 1
                                ? { mul: true }
                                : { mul: true, none: true }
                        "
                        @click="deAmount({ index: index })"
                    >
                        -
                    </div>
                    <div class="num">
                        <input
                            type="tel"
                            :value="item.amount"
                            class="num-input"
                            @keyup="changeAmount($event)"
                        />
                    </div>
                    <div class="add" @click="inAmount({ index: index })">+</div>
                </div>
            </div>
            <div class="bar">
                <div class="allcheck-wrap">
                    <div
                        :class="{ allcheck: true, checked: allchecked }"
                        @click="isAllChecked()"
                    ></div>
                    <div class="word">全选</div>
                </div>
                <div class="total">
                    运费：<span class="sumprice">￥{{ freight }}</span>
                    合计：<span class="sumprice">￥{{ total }}</span>
                </div>
                <div :class="{ pay: true, active: total > 0 }">去结算</div>
            </div>
        </main>
        <footer></footer>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex"
import { lazyImg } from "../../../assets/js/libs/utils";


export default {
    data() {
        return {
            allchecked: true
        }
    },
    methods: {
        ...mapMutations({
            "inAmount": "cart/inAmount",
            "deAmount": "cart/deAmount",
            "delItem": "cart/delItem",
            "selectItem": "cart/selectItem",
            "allSelectItem": "cart/allSelectItem"
        }),
        changeAmount(e) {
            // console.log(e)
            this.amount = e.target.value;
            this.amount = this.amount.replace(/[a-zA-Z]|[\u4e00-\u9fa5]/g, "")
            if (this.amount === "" || parseInt(this.amount) === 0) {
                this.amount = 1;
            }
        },
        isAllChecked() {
            this.allchecked = !this.allchecked;
            this.allSelectItem({ allchecked: this.allchecked })

        },
        checkedItem(index) {
            this.selectItem({ index: index });
            this.checkedAllItem()
        },
        delGoods(index) {
            this.delItem({ index: index });
            this.checkedAllItem()
        },
        // 检测是否全选
        checkedAllItem() {
            let isNull = true;
            if (this.cartData.length > 0) {
                for (let key in this.cartData) {
                    if (!this.cartData[key].checked) {
                        isNull = false;
                        break;
                    }
                }
                if (!isNull) {
                    this.allchecked = false
                } else {
                    this.allchecked = true
                }
            } else {
                this.allchecked = false
            }
        }
    },
    computed: {
        ...mapState({
            'cartData': (state) => state.cart.cartData
        }),
        ...mapGetters({
            "total": "cart/total",
            "freight": "cart/freight"
        })
    },
    mounted() {
        lazyImg()
        console.log(this.cartData)
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
main {
    background-color: #fff;
    height: 100vh;
    padding-top: 1rem;
    box-sizing: border-box;
}
main .cart-wrap {
    height: 2.4rem;
    border-bottom: 2px solid #efefef;
    display: flex;
    position: relative;
}
main .check {
    width: 10%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
main .check label {
    display: block;
    width: 0.32rem;
    height: 0.32rem;
    border-radius: 50%;
    border: 1px solid #efefef;
}
main .cart-item {
    width: 90%;
    height: 100%;
    display: flex;
}
main .head-wrap {
    height: 100%;
    width: 1.2rem;
}
main .img-wrap {
    width: 1.2rem;
    height: 1.2rem;
    margin-top: 0.6rem;
}
main .del {
    color: #bfbfbf;
    font-size: 0.24rem;
    text-align: center;
}
main .img-wrap img {
    width: 100%;
    height: 100%;
}
main .info-wrap {
    padding-left: 3%;
}
main .info-wrap .title {
    padding-top: 0.2rem;
    font-size: 0.24rem;
    color: #323232;
    height: 0.6rem;
    width: 100%;
    padding-right: 3%;
}
main .info-wrap .color {
    font-size: 0.24rem;
    color: #323232;
    width: 100%;
}
main .info-wrap .price {
    padding-top: 0.4rem;
    color: #cc0004;
    font-size: 0.28rem;
}
main .num-wrap {
    width: 2rem;
    margin-right: 0.2rem;
    display: flex;
    border: 1px solid #000;
    height: 0.6rem;
    border-radius: 0.06rem;
    position: absolute;
    right: 3%;
    bottom: 15%;
}
main .num {
    width: 0.76rem;
    height: 0.6rem;
    text-align: center;
    font-size: 0.1rem;
    line-height: 0.6rem;
    color: #323232;
}
main .num-input {
    width: 0.76rem;
    text-align: center;
}
main .add {
    text-align: center;
    font-size: 0.1rem;
    color: #323232;
    height: 0.4rem;
    width: 0.6rem;
    margin-top: 0.1rem;
    border-left: 1px solid #000;
    line-height: 0.4rem;
}
main .mul {
    text-align: center;
    font-size: 0.1rem;
    color: #323232;
    height: 0.4rem;
    width: 0.6rem;
    margin-top: 0.1rem;
    border-right: 1px solid #000;
    line-height: 0.4rem;
}
main .none {
    color: #b5b5b5;
}
.bar {
    height: 1rem;
    border-top: 2px solid #efefef;
    position: fixed;
    bottom: 1rem;
    left: 0;
    width: 100vw;
    display: flex;
    justify-content: space-between;
}
.allcheck-wrap {
    display: flex;
    align-items: center;
    font-size: 0.24rem;
    color: #323232;
    padding-left: 3%;
}
.allcheck {
    width: 0.32rem;
    height: 0.32rem;
    border-radius: 50%;
    border: 1px solid #efefef;
    margin-right: 0.1rem;
}
.total {
    display: flex;
    align-items: center;
    justify-content: right;
    flex: 1;
    font-size: 0.24rem;
    padding-left: 14%;
}
.sumprice {
    color: #cc0004;
}
.pay {
    width: 2.2rem;
    height: 1rem;
    font-size: 0.32rem;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #bfbfbf;
}
.checked {
    background: url("../../../assets/images/home/cart/checkmark.png") center
        no-repeat;
    background-size: 0.32rem 0.32rem;
}
.active {
    background: #cc0004;
}
.color span {
    padding-right: 0.2rem;
}
</style>
