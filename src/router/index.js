import * as VueRouter from 'vue-router'

import {getCookie} from "@/router/getCookie";
import axios from "axios";
import UserControl from "@/components/UserControl";
import NoticeBoard from "@/components/NoticeBoard";
import GlobalStatus from "@/components/GlobalStatus";
import AdminLogin from "@/components/AdminLogin";
import AdminBase from "@/components/AdminBase";

const routes = [
    {
        path: '/',
        component: AdminLogin
    },
    {
        path: '/admin',
        component: AdminBase,
        meta: {requiresAuth: true},
        children: [
            {
                path: 'user-ctrl',
                component: UserControl
            },
            {
                path: 'notice-board',
                component: NoticeBoard
            },
            {
                path: 'global-status',
                component: GlobalStatus
            }
        ]
    }
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {

    //TODO 这行是为了方便前端开发，实际运行环境需要删除
    next()

    //如果访问的url需要授权,则校验登录状态
    if (to.meta.requiresAuth) {
        let token = getCookie('token')
        axios({
            url: "/api/islogin",
            method: "get",
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        }).then(response => {
            if (response.data === true) {
                next()
            } else {
                //未登录则重定向到登陆页面
                next({
                    path: '/',
                    // 保存当前位置，用于重定向
                    query: {redirect: to.fullPath},
                })
            }
        }).catch(() => {
            //未登录则重定向到登陆页面
            next({
                path: '/',
                // 保存当前位置，用于重定向
                query: {redirect: to.fullPath},
            })
        })
    } else {
        next()
    }
})

export default router



