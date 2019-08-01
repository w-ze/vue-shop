import Vue from 'vue';
//引入路由
import Router from 'vue-router';

Vue.use(Router);//装载路由

//实例化路由
let router = new Router({
    mode: "hash",//1、hash哈希：有#号。2、history历史：没有#号
    base: process.env.BASE_URL,
    //记录滚动的位置解决白屏问题，必须配合keep-alive
    scrollBehavior(to, from, position) {
        if (position) {
            return position
        } else {
            return { x: 0, y: 0 }
        }
    },
    routes: [
        {
            path: "/",
            name: "main",
            component: () => import('./pages/home/main/index'),
            redirect: "/index",
            children: [
                {
                    path: "index",
                    name: "index",
                    component: () => import('./pages/home/index/index'),
                    meta: { title: "首页", keepAlive: true }
                },
                {
                    path: "cart",
                    name: "cart",
                    component: () => import('./pages/home/cart/index'),
                    meta: { title: "购物车", keepAlive: false }
                },
                {
                    path: "my",
                    name: "my",
                    component: () => import('./pages/user/index/index'),
                    meta: { title: "我的", keepAlive: false }
                }
            ]
        },
        {
            path: "/goods/classify",
            name: "classify",
            component: () => import('./pages/goods/classify/index'),
            meta: { title: "我的", keepAlive: false },
            redirect: "/goods/classify/classify_item",
            children: [
                {
                    path: "classify_item",
                    name: "classify_item",
                    component: () => import("./pages/goods/classify/classify_item.vue"),
                    meta: { title: "商品分类", keepAlive: false }

                }
            ]
        },
        {
            path: "/goods/info",
            name: "info",
            component: () => import("./pages/goods/info/index.vue"),
            meta: { title: "商品详情", keepAlive: false },
            redirect: "/goods/info/info_content",
            children: [
                {
                    path: "info_content",
                    name: "info_content",
                    component: () => import("./pages/goods/info/content.vue"),
                    meta: { title: "商品详情", keepAlive: false },

                },
                {
                    path: "info_desc",
                    name: "info_desc",
                    component: () => import("./pages/goods/info/desc.vue"),
                    meta: { title: "商品详情", keepAlive: false },

                },
                {
                    path: "info_comment",
                    name: "info_comment",
                    component: () => import("./pages/goods/info/comment.vue"),
                    meta: { title: "商品详情", keepAlive: false },

                }
            ]
        },
        {
            path: "/login",
            name: "login",
            component: () => import('./pages/user/login/index.vue'),
        },
        {
            path: "/register",
            name: "register",
            component: () => import('./pages/user/register/index.vue'),
        }
    ]
});
router.beforeEach((to, from, next) => {
    //console.log(to.meta);
    if (to.meta.auth) {
        if (Boolean(localStorage['isLogin'])) {
            next()
        } else {
            next("/login");
        }
    } else {
        next()
    }
});
export default router;
