import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../layout/default/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../routes/passport/shared/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    //用户信息
                    path: '/user',
                    component: () => import(/* webpackChunkName: "user" */ '../routes/passport/shared/UserFrom.vue'),
                    meta: { title: '用户信息' }
                },
                {
                    //班课信息
                    path: '/class',
                    component: () => import(/* webpackChunkName: "class" */ '../routes/passport/shared/ClassFrom.vue'),
                    meta: { title: '班课信息' }
                },
                {
                    //个人消息
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../routes/passport/shared/Tabs.vue'),
                    meta: { title: '个人消息' }
                },
                {
                    // 使用说明
                    path: '/i18n',
                    component: () => import(/* webpackChunkName: "i18n" */ '../layout/passport/I18n.vue'),
                    meta: { title: '使用说明' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../layout/passport/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../layout/passport/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../layout/passport/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/level',
                    component: () => import(/* webpackChunkName: "Level" */ '../routes/passport/shared/Level.vue'),
                    meta: { title: '等级设置', permission: true }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../routes/passport/login/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '/register',
            component: () => import(/* webpackChunkName: "register" */ '../routes/passport/register/Register.vue'),
            meta: { title: '注册' }
        },
        {
            path: '/forgetPassword',
            component: () => import(/* webpackChunkName: "forgetPassword" */ '../routes/passport/register/ForgetPassword.vue'),
            meta: { title: '忘记密码' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
