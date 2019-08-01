<template>
    <div class="com">
        <div class="comment-list" v-show="!isCommentsNull" @tochmove.prevent>
            <div class="comment-title">商品评价({{ pageInfo.total }})</div>
            <div ref="scroll-review" class="parent">
                <div>
                    <div
                        class="comment"
                        v-for="(item, index) in commentsData"
                        :key="index"
                    >
                        <div class="user">
                            <div class="user-wrap">
                                <img
                                    src="../../../assets/images/common/grey.jpg"
                                    :data-echo="item.head"
                                    alt=""
                                />
                            </div>
                            <div class="nickname">{{ item.nickname }}</div>
                        </div>
                        <div class="comment-content">
                            {{ item.content }}
                        </div>
                        <div class="date">{{ item.times }}</div>
                    </div>
                    <div style="height:1rem"></div>
                </div>
            </div>
        </div>
        <div class="no-comment" v-show="isCommentsNull">没有相关评论！</div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex"
import { lazyImg } from "../../../assets/js/libs/utils";
import BScroll from "../../../assets/js/libs/bscroll"
let { mapState, mapMutations, mapActions } = createNamespacedHelpers("goodsInfo")

export default {
    components: {},
    props: {},
    data() {
        return {
            gid: this.$route.query.gid ? this.$route.query.gid : "",
            curPage: 1,
        }
    },
    watch: {},
    computed: {
        ...mapState(['commentsData']),
        ...mapState(['isCommentsNull']),
        ...mapState(['pageInfo'])
    },
    methods: {
        ...mapActions(["getComment"]),

    },
    created() {
        this.getComment({
            gid: this.gid,
            curPage: this.curPage,
            callback: () => {
                this.$nextTick(() => {
                    lazyImg();
                    this.myScroll.refresh();
                    this.myScroll.on('scrollEnd', () => {
                        lazyImg();
                    });
                    this.myScroll.on("pullingUp", () => {
                        console.log("ajax")
                        if (this.curPage < this.pageInfo.pagenum) {
                            this.curPage++;
                            this.$request(this.$config.baseApi + "/home/reviews/index?gid=" + this.gid + "&token=" + this.$config.token + "&page=" + this.curPage + "").then(res => {
                                console.log(res)
                                if (res.code === 200) {
                                    this.commentsData.push(...res.data)
                                    // for (let key in res.data) {
                                    //     this.commentsData.push(res.data[key])
                                    // }
                                    console.log(this.commentsData)
                                }
                            })
                        }
                        console.log(this.curPage)
                        this.myScroll.finishPullUp();//可以多次执行上拉刷新
                    });
                })
            }
        })
    },
    mounted() {
        this.myScroll = new BScroll(this.$refs['scroll-review'], {
            //这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启上拉加载
            pullUpLoad: {
                threshold: 10
            },
            useTransition: false  // 防止iphone微信滑动卡顿
        });

    }
}
</script>
<style scoped>
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
    height: 100%;
}
.comment-title {
    padding-left: 5%;
    color: #7b7f82;
    font-size: 0.32rem;
    padding-top: 0.2rem;
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
    font-size: 0.36rem;
    color: #fff;
    line-height: 1.2rem;
    text-align: center;
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
}
.parent {
    height: 100%;
    overflow: hidden;
    position: relative;
}
.com {
    height: 100%;
}
</style>