<template>
    <div class="app">
        <header>
            <div class="back-img">
                <img
                    src="../../../assets/images/home/goods/back.png"
                    alt
                    @click="goBack()"
                />
            </div>
            <div class="search-wrap">
                <input type="text" name id placeholder="请输入宝贝名称" />
            </div>
        </header>
        <main>
            <aside class="parent" ref="scroll-classify" @touchmove.prevent>
                <div class="show">
                    <div
                        :class="{
                            classify: true,
                            active: item.checked,
                            item: true
                        }"
                        ref="classify-item"
                        v-for="(item, index) in classifyData"
                        :key="index"
                        @click="
                            goPage(
                                '/goods/classify/classify_item?cid=' + item.cid,
                                index
                            )
                        "
                    >
                        {{ item.title }}
                    </div>
                </div>
            </aside>
            <article>
                <router-view></router-view>
            </article>
        </main>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
// import { mapMutations } from "vuex"
import IScroll from "../../../assets/js/libs/iscroll.js"
import { lazyImg } from "../../../assets/js/libs/utils";
let { mapState, mapActions } = createNamespacedHelpers("classify")

export default {
    /*eslint-disable*/

    components: {},
    props: {},
    data() {
        return {
            cid: this.$route.query.cid ? this.$route.query.cid : ""
        };
    },
    watch: {},
    computed: {
        ...mapState(['classifyData'])
    },
    methods: {
        ...mapActions(['getClassify']),
        // ...mapMutations(['getClassify']),
        goBack() {
            this.$router.go(-1)
        },
        goPage(url, index) {
            this.$router.replace(url);
            this.cid = this.$route.query.id;
            this.changeColor(index);
            this.scrollPosition(index);
        },
        changeColor(index) {
            if (this.classifyData.length > 0) {
                for (let i = 0; i < this.classifyData.length; i++) {
                    if (this.classifyData[i].checked) {
                        this.classifyData[i].checked = false;
                        break;
                    }
                }
            }
            this.classifyData[index].checked = true;
            this.$set(this.classifyData, index, this.classifyData[index])
        },
        // getClassify() {
        //     this.$request(
        //         this.$config.baseApi +
        //         "home/category/menu?token=" +
        //         this.$config.token,
        //         "get"
        //     ).then(res => {
        //         // console.log(res)
        //         if (res.code === 200) {
        //             for (let i = 0; i < res.data.length; i++) {
        //                 res.data[i].checked = false;
        //             }
        //             console.log(res.data)
        //             this.classifyData = res.data;

        //             this.$nextTick(() => {
        //                 this.myScroll.refresh();
        //             })
        //         }
        //     });
        // },

        scrollPosition(index) {
            // console.log((this.classifyData.length - index) * this.$refs['classify-item'][0].offsetHeight)
            // console.log(this.$refs["scroll-classify"].offsetHeight)
            let scrollHeight = this.$refs['classify-item'][0].offsetHeight * index;
            if ((this.classifyData.length - index + 1) * this.$refs['classify-item'][0].offsetHeight >
                this.$refs["scroll-classify"].offsetHeight) {
                this.myScroll.scrollTo(0, -scrollHeight, 300, IScroll.utils.ease.elastic);

            }
        }
    },
    created() {
        this.cid = this.$route.query.id;
        // this.getClassify();
        this.getClassify({
            cid: this.cid, callback: () => {
                this.$nextTick(() => {
                    this.myScroll.refresh();
                })

            }
        })
        console.log(this.classifyData)
    },
    mounted() {
        this.$store.commit("classify/getClassify", { cid: this.cid })
        this.myScroll = new IScroll(this.$refs['scroll-classify'], {
            // eventPassthrough : true,
            scrollX: false,
            scrollY: true,
            preventDefault: false
            //click:true
        });
    }
};
</script>
<style scoped>
@import "../../../assets/css/common/common.css";
header {
    width: 100%;
    height: 1rem;
    display: flex;
    background: #fff;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
}
header .back-img {
    width: 0.8rem;
    height: 0.8rem;
}
header .back-img img {
    width: 100%;
}
header .search-wrap {
    height: 0.65rem;
    width: 6rem;
}
header .search-wrap input {
    width: 90%;
    padding-left: 5%;
    height: 100%;
    font-size: 0.32rem;
    border: 1px solid #ccc;
    box-sizing: border-box;
}
main {
    display: flex;
    height: 100vh;
    padding-top: 1rem;
    /* overflow: auto; */
    box-sizing: border-box;
}
aside {
    width: 23%;
    background: #fff;
    height: 100%;
}
aside .classify {
    width: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.28rem;
    text-align: center;
    border-top: 1px solid #ccc;
}
aside .active {
    color: #eb1625;
}
article {
    width: 77%;
    /* overflow: hidden; */
    height: 100%;
}

.parent {
    overflow: hidden;
    position: relative;
}

.app {
    background: rgb(238, 239, 239);
}
</style>