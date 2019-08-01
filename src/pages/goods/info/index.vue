<template>
    <div class="app">
        <header>
            <div class="back-wrap" @click="$router.go(-1)">
                <img src="../../../assets/images/home/goods/back.png" alt="" />
            </div>
            <div class="cards-menu">
                <div
                    :class="{ nav: true, active: contentStyle }"
                    @click="
                        goPage('/goods/info/info_content', {
                            gid: $route.query.gid
                        })
                    "
                >
                    商品
                </div>
                <div
                    :class="{ nav: true, active: descStyle }"
                    @click="
                        goPage('/goods/info/info_desc', {
                            gid: $route.query.gid
                        })
                    "
                >
                    详情
                </div>
                <div
                    :class="{ nav: true, active: commentStyle }"
                    @click="
                        goPage('/goods/info/info_comment', {
                            gid: $route.query.gid
                        })
                    "
                >
                    评价
                </div>
            </div>
            <div class="cart-wrap">
                <img
                    src="../../../assets/images/home/goods/cart.png"
                    alt=""
                    id="cart"
                    @click="goPage1('/cart')"
                />
                <div class="spot" v-show="cartData.length > 0"></div>
            </div>
        </header>
        <main>
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"
export default {
    components: {},
    props: {},
    data() {
        return {
            gid: this.$route.query.gid,
            contentStyle: true,
            descStyle: false,
            commentStyle: false,
        }
    },
    watch: {},
    computed: {
        ...mapState({
            "cartData": (state) => state.cart.cartData
        })
    },
    methods: {
        goPage(url, query) {
            this.$router.replace({ path: url, query: query });
        },
        goPage1(url) {
            this.$router.push(url);
        },
        changeStyle(url) {
            // console.log(url)
            switch (url) {
                case "/goods/info/info_content":
                    this.contentStyle = true;
                    this.descStyle = false;
                    this.commentStyle = false;
                    break;
                case "/goods/info/info_desc":
                    this.contentStyle = false;
                    this.descStyle = true;
                    this.commentStyle = false;
                    break;
                case "/goods/info/info_comment":
                    this.contentStyle = false;
                    this.descStyle = false;
                    this.commentStyle = true;
                    break;
            }
        },

    },
    created() {
    },
    mounted() {
    },
    beforeRouteUpdate(to, feom, next) {
        this.changeStyle(to.path);
        next()
    }
}
</script>
<style scoped>
header {
    height: 1rem;
    display: flex;
    background: #fff;
    justify-content: space-between;
    /* position: fixed;
    width: 100%;
    top: 0;
    left: 0; */
}
header .back-wrap {
    height: 0.8rem;
    width: 0.8rem;
    margin-top: 0.1rem;
}
header .back-wrap img {
    width: 100%;
}
.cards-menu {
    display: flex;
    font-size: 0.36rem;
    width: 50%;
}
.cards-menu .nav {
    width: 33%;
    line-height: 1rem;
    text-align: center;
}
.cart-wrap {
    width: 0.8rem;
    height: 0.8rem;
    margin-top: 0.1rem;
    padding-right: 3%;
}
.cart-wrap img {
    width: 100%;
}

.app {
    display: flex;
    height: 100vh;
    flex-direction: column;
}
main {
    flex: 1;
    overflow: auto;
    background: rgb(239, 239, 239);
}
.active {
    border-bottom: solid 2px #fda208;
}
.spot {
    width: 0.2rem;
    height: 0.2rem;
    border-radius: 50%;
    background: #cc0004;
    position: absolute;
    top: 0.1rem;
    right: 0.1rem;
}
</style>