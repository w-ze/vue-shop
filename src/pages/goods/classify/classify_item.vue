<template>
    <div ref="scroll-content" @touchmove.prevent class="scroll-content parent">
        <div class="show">
            <div
                v-for="(item, index) in goodsData"
                :key="index"
                class="goods-list-wrap"
                v-show="!isNull"
            >
                <div class="goods-list-title">{{ item.title }}</div>
                <div class="goods-list">
                    <div
                        class="goods-wrap"
                        v-for="(item2, index2) in item.goods"
                        :key="index2"
                        @click="goPage('/goods/info?gid=' + item2.gid)"
                    >
                        <div class="goods-image-wrap">
                            <img
                                src="../../../assets/images/common/grey.jpg"
                                :data-echo="item2.image"
                                alt
                            />
                        </div>
                        <div class="goods-title">{{ item2.title }}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="no-data" v-show="isNull">没有商品~</div>
    </div>
</template>

<script>
import IScroll from '../../../assets/js/libs/iscroll.js';
import { lazyImg } from "../../../assets/js/libs/utils";
export default {
    components: {},
    props: {},
    data() {
        return {
            cid: "",
            goodsData: [],
            isNull: false
        }
    },
    watch: {},
    computed: {},
    methods: {
        goPage(url) {
            this.$router.push(url);
        },
        getGoods() {
            this.$request(
                this.$config.baseApi +
                "/home/category/show?cid=" +
                this.cid +
                "&token=" +
                this.$config.token,
                "get"
            ).then(res => {
                // console.log(res.data);
                if (res.code === 200) {
                    this.isNull = false;
                    this.goodsData = res.data;
                    this.$nextTick(() => {
                        lazyImg();
                        this.myScroll.refresh();
                        this.myScroll.on('scrollEnd', () => {
                            lazyImg();
                        });
                    });
                } else if (res.code === 201) {
                    this.goodsData = res.data;
                    this.isNull = true;
                }
            });
        },
    },
    created() {
        this.cid = this.$route.query.cid;

        this.getGoods()
    },
    mounted() {
        this.myScroll = new IScroll(this.$refs['scroll-content'], {
            // eventPassthrough : true,
            scrollX: false,
            scrollY: true,
            preventDefault: false
            //click:true
        });
    },
    beforeRouteUpdate(to, from, next) {
        // console.log(next)
        this.cid = to.query.cid;
        this.getGoods();
        next();
    }
}
</script>
<style scoped>
article {
    position: relative;
    width: 77%;
    /* overflow: auto; */
    height: 100vh;
}
article .goods-list-title {
    font-size: 0.28rem;
    color: #323232;
    margin-top: 0.28rem;
}
article .goods-list-wrap {
    width: 92%;
    margin: 0 auto;
}
article .goods-list {
    width: 100%;
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 0.32rem;
    margin-top: 0.2rem;
}
article .goods-list .goods-wrap {
    width: 33%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 0.2rem;
}
article .goods-list .goods-wrap .goods-image-wrap {
    width: 1.2rem;
    height: 1.2rem;
}
article .goods-image-wrap img {
    width: 100%;
    height: 100%;
}
article .goods-title {
    font-size: 0.24rem;
    color: #323232;
    text-overflow: ellipsis;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
}
.no-data {
    margin-top: 0.8rem;
    text-align: center;
    font-size: 0.32rem;
}
.scroll-content {
    height: 100%;
    overflow: hidden;
    position: relative;
}
.content {
    height: 100%;
}
</style>