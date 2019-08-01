<template>
    <div class="page">
        <header :class="{ red: isScrollColor }">
            <img
                src="../../../assets/images/common/class.png"
                alt
                @click="goPage('goods/classify')"
            />
            <div class="search">
                <div class="search-icon"></div>
                <div class="search-input">输入喜欢宝贝名称</div>
            </div>
            <span>登录</span>
        </header>
        <div class="banner-wrap">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div
                        class="swiper-slide"
                        v-for="(item, index) in swiperData"
                        :key="index"
                    >
                        <img :src="item.image" alt />
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </div>
        <div class="classify">
            <ul v-for="(item, index) in navData" :key="index">
                <li>
                    <img
                        src="../../../assets/images/common/grey.jpg"
                        :data-echo="item.image"
                        alt
                    />
                </li>
                <li>{{ item.title }}</li>
            </ul>
        </div>
        <template v-for="(item, index) in goodsData">
            <div v-if="index == 0 || index % 2 == 0" :key="index" class="goods">
                <div :class="'goods-title-' + (index + 1)">
                    —— {{ item.title }} ——
                </div>
                <div class="goods-list">
                    <div
                        class="goods-list1"
                        @click="goPage('/goods/info?gid=' + item.items[0].gid)"
                    >
                        <div class="goods-name">{{ item.items[0].title }}</div>
                        <span class="goods-discount">精品折扣</span>
                        <span :class="'goods-price-' + (index + 1)"
                            >{{ item.items[0].price }}元</span
                        >
                        <img
                            src="../../../assets/images/common/grey.jpg"
                            :data-echo="item.items[0].image"
                            alt
                        />
                    </div>
                    <div class="goods-list2">
                        <div
                            class="goods-list2-1"
                            @click="
                                goPage('/goods/info?gid=' + item.items[1].gid)
                            "
                        >
                            <div class="goods-list2-left">
                                <div class="goods-name">
                                    {{ item.items[1].title }}
                                </div>
                                <div class="goods-desc">品质精挑</div>
                            </div>
                            <div class="goods-list2-right">
                                <img
                                    src="../../../assets/images/common/grey.jpg"
                                    :data-echo="item.items[1].image"
                                    alt
                                />
                            </div>
                        </div>
                        <div
                            class="goods-list2-2"
                            @click="
                                goPage('/goods/info?gid=' + item.items[2].gid)
                            "
                        >
                            <div class="goods-list2-left">
                                <div class="goods-name">
                                    {{ item.items[2].title }}
                                </div>
                                <div class="goods-desc">品质精挑4折起</div>
                            </div>
                            <div class="goods-list2-right">
                                <img
                                    src="../../../assets/images/common/grey.jpg"
                                    :data-echo="item.items[2].image"
                                    alt
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="goods-list3">
                    <div
                        class="goods-list3-1"
                        v-for="(item2, index2) in item.items.slice(3)"
                        :key="index2"
                        @click="goPage('/goods/info?gid=' + item2.gid)"
                    >
                        <div class="goods-name">{{ item2.title }}</div>
                        <img
                            src="../../../assets/images/common/grey.jpg"
                            :data-echo="item2.image"
                            alt
                        />
                        <div class="goods-price1">￥{{ item2.price }}</div>
                        <div class="goods-price2">
                            ￥{{ item2.price + 120 }}
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="goods" :key="index">
                <div :class="'goods-title-' + (index + 1)">
                    —— {{ item.title }} ——
                </div>
                <div class="goods-list">
                    <div
                        class="goods-list2"
                        v-for="(item2, index2) in item.items.slice(0, 2)"
                        :key="index2"
                        @click="goPage('/goods/info?gid=' + item2.gid)"
                    >
                        <div class="goods-name">{{ item2.title }}</div>

                        <div class="goods-desc">火爆开售</div>
                        <img
                            src="../../../assets/images/common/grey.jpg"
                            :data-echo="item2.image"
                        />
                    </div>
                </div>
                <div class="goods-list3">
                    <div
                        class="goods-list3-1"
                        v-for="(item2, index2) in item.items.slice(2)"
                        :key="index2"
                        @click="goPage('/goods/info?gid=' + item2.gid)"
                    >
                        <div class="goods-name">{{ item2.title }}</div>
                        <img
                            src="../../../assets/images/common/grey.jpg"
                            :data-echo="item2.image"
                            alt
                        />
                        <div class="goods-price1">￥{{ item2.price }}</div>
                        <div class="goods-price2">
                            ￥{{ item2.price + 30 }}.00
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <div class="recommend">
            <div class="line"></div>
            <div class="recommend-title">
                <span>为你推荐</span>
            </div>
            <div class="line"></div>
        </div>
        <div class="recommend-area">
            <div
                class="item-list"
                v-for="(item, index) in recommendData"
                :key="index"
            >
                <img
                    src="../../../assets/images/common/grey.jpg"
                    :data-echo="item.image"
                    alt
                />
                <div class="item-name">{{ item.title }}</div>
                <div class="item-price">￥399.00</div>
            </div>
        </div>
    </div>
</template>

<script>
/*eslint-disable*/
import { lazyImg } from "../../../assets/js/libs/utils";
import Swiper from "../../../assets/js/libs/swiper/swiper";
export default {
    data() {
        return {
            swiperData: [],
            navData: [],
            goodsData: [],
            recommendData: [],
            isScrollColor: false
        };
    },
    components: {},
    methods: {
        goPage(url) {
            this.$router.push(url);
        },
        getSwiper() {
            this.$request(
                this.$config.baseApi +
                "home/index/slide?token=" +
                this.$config.token,
                "get"
            ).then(res => {
                if (res.code === 200) {
                    this.swiperData = res.data;
                    this.$nextTick(() => {
                        //created中操作dom异步执行
                        var mySwiper = new Swiper(".swiper-container", {
                            pagination: {
                                el: ".swiper-pagination",
                                clickable: true
                            },
                            autoplay: {
                                delay: 3000,
                                stopOnLastSlide: false,
                                disableOnInteraction: false
                            }
                        });
                    });
                }
            });
        },
        getNav() {
            this.$request(
                this.$config.baseApi +
                "home/index/nav?token=" +
                this.$config.token,
                "get"
            ).then(res => {
                if (res.code === 200) {
                    this.navData = res.data;
                    this.$nextTick(() => {
                        lazyImg();
                    });
                }
            });
        },
        getGoods() {
            this.$request(
                this.$config.baseApi +
                "home/index/goodsLevel?token=" +
                this.$config.token,
                "get"
            ).then(res => {
                if (res.code === 200) {
                    this.goodsData = res.data;
                    this.$nextTick(() => {
                        lazyImg();
                    });
                }
            });
        },
        getRecommend() {
            this.$request(
                this.$config.baseApi +
                "home/index/recom?token=" +
                this.$config.token,
                "get"
            ).then(res => {
                if (res.code === 200) {
                    this.recommendData = res.data;
                    this.$nextTick(() => {
                        lazyImg();
                    });
                }
            });
        },
        eventScroll() {
            let scrollTop =
                document.body.scrollTop || document.documentElement.scrollTop;
            console.log(scrollTop);
            if (scrollTop > 100) {
                this.isScrollColor = true;
            } else {
                this.isScrollColor = false;
            }
        }
    },
    created() {
        this.getSwiper();
        this.getNav();
        this.getGoods();
        this.getRecommend();
        // this.$request(
        //     this.$config.baseApi + "home/index/nav?token=" + this.$config.token,
        //     "get"
        // ).then(res => {
        //     console.log(res);
        // });
    },
    mounted() {
        document.title = this.$route.meta.title;
        window.addEventListener("scroll", this.eventScroll);
    },
    //解决keep-alive缓存的问题，实时更新数据
    activated() {
        document.title = this.$route.meta.title;
    }
};
</script>

<style scoped>
@import "../../../assets/js/libs/swiper/swiper.css";
p {
    margin: 0;
}

.red {
    background: linear-gradient(
        rgb(235, 22, 37) 0%,
        rgba(255, 255, 255, 0) 100%
    );
}
header {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
}
header img {
    width: 0.6rem;
    height: 0.6rem;
    padding-left: 3%;
    padding-right: 3%;
    margin-top: 0.08rem;
}
header .search {
    display: flex;
    padding-right: 5%;
    box-sizing: border-box;
    margin-top: 0.08rem;
}
header .search-icon {
    width: 0.68rem;
    height: 0.52rem;
    background: url("../../../assets/images/common/search_icon.png") no-repeat
        rgba(255, 255, 255, 0.6);
    background-size: 0.52rem;
    border-radius: 0.1rem 0 0 0.1rem;
}
header .search-input {
    width: 4rem;
    height: 0.52rem;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 0 0.1rem 0.1rem 0;
    overflow: hidden;
    font-size: 0.26rem;
    line-height: 0.52rem;
    color: #fff;
}
header span {
    font-size: 0.4rem;
    color: #fff;
    padding-right: 5%;
    margin-top: 0.08rem;
}
.banner-wrap img {
    width: 100%;
    vertical-align: top;
}

.classify {
    margin-top: 0.1rem;
    padding: 0.2rem 0;
    display: flex;
    justify-content: space-around;
    background: #fff;
    align-items: center;
}
.classify img {
    width: 0.8rem;
    height: 0.8rem;
}
.classify li {
    font-size: 0.24rem;
    color: #7b7f82;
    text-align: center;
}
.goods {
    margin-top: 0.3rem;
    background: #fff;
}
.goods-title-1 {
    text-align: center;
    height: 0.6rem;
    line-height: 0.6rem;
    font-size: 0.28rem;
    color: #f73b61;
    border-bottom: 1px #ccc solid;
}
.goods-title-2 {
    text-align: center;
    height: 0.6rem;
    line-height: 0.6rem;
    font-size: 0.28rem;
    color: #fe5719;
    border-bottom: 1px #ccc solid;
}
.goods-title-3 {
    text-align: center;
    height: 0.6rem;
    line-height: 0.6rem;
    font-size: 0.28rem;
    color: #5fc600;
    border-bottom: 1px #ccc solid;
}
.goods-list {
    display: flex;
}

.goods-list1 {
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
}
.goods-list1 img {
    width: 3rem;
    height: 1.5rem;
}
.goods-list .goods-list1,
.goods-list2 {
    text-align: center;
    width: 50%;
    /* padding: 0.2rem; */
    overflow: hidden;
}
.goods-list2 {
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
}
.goods-name {
    font-size: 0.28rem;
    font-weight: bold;
    overflow: hidden;
    /* text-overflow: ellipsis; */
    /* white-space: nowrap; */
    height: 0.4rem;
    margin: 0;
}
.goods-discount {
    font-size: 0.24rem;
    color: #cb385d;
}
.goods-price-1 {
    font-size: 0.28rem;
    line-height: 0.4rem;
    background: #f21d4f;
    color: #fff;
    border-radius: 0.1rem;
    margin-left: 15%;
}
.goods-price-3 {
    font-size: 0.28rem;
    line-height: 0.4rem;
    background: #5fc600;
    color: #fff;
    border-radius: 0.1rem;
    margin-left: 15%;
}
.goods-list2 img {
    width: 1.2rem;
    height: 1.2rem;
}

.goods-list2-1,
.goods-list2-2 {
    width: 100%;
    display: flex;
}
.goods-list2-1 {
    border-bottom: 1px solid #ccc;
}

.goods-list2-left {
    width: 70%;
}

.goods-desc {
    margin: 0;
    font-size: 0.24rem;
    color: #7b7f82;
}

.goods-list3 {
    display: flex;
}
.goods-list3-1 {
    width: 25%;
    text-align: center;
    border-right: 1px solid #ccc;
}
.goods-list3-1 img {
    width: 1.52rem;
    height: 1.52rem;
}
.goods-price1 {
    color: #d32a4e;
}
.goods-price2 {
    text-decoration: line-through;
    font-size: 0.24rem;
    color: #7b7f82;
}
.recommend {
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.recommend .line {
    width: 30%;
    height: 0;
    border-bottom: 1px solid #999;
}

/* .recommend .recommend-title img {
  width: 0.35rem;
  height: 0.35rem;
  vertical-align: middle;
} */
.recommend .recommend-title span {
    padding-left: 0.6rem;
    font-size: 0.32rem;
    line-height: 0.35rem;
    background: url("../../../assets/images/home/index/recom.png") no-repeat;
    background-size: 0.35rem;
}
.recommend-area {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 1.2rem;
}
.recommend-area .item-list {
    width: 48.5%;
    text-align: center;
    background: #fff;
    margin-top: 0.2rem;
}
.recommend-area .item-list img {
    width: 2.8rem;
    height: 2.8rem;
}
.recommend-area .item-list .item-name {
    text-align: left;
    font-size: 0.28rem;
    padding-left: 0.12rem;
}
.recommend-area .item-list .item-price {
    text-align: left;
    font-size: 0.28rem;
    color: #d32a4e;
    padding-left: 0.12rem;
    padding-top: 0.18rem;
    padding-bottom: 0.18rem;
}
</style>
