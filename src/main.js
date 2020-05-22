import Vue from 'vue';
import App from './App.vue';
import router from './routes';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';

import { messages } from './layout/default/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './shared/components/assets/css/theme-green/index.css'; // 浅绿色主题
import './shared/components/assets/css/icon.css';
import './layout/default/directives';
import 'babel-polyfill';

Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title}`;
    const user = localStorage.getItem('ms_username');//判断是否为用户
    const secret = 1;//为token验证提供判断，每次判断前需向端发送验证请求，返回判断结果，待完善

    if (secret !== 1 && to.path !== '/login' && to.path !== '/register' && to.path !== '/forgetpassword') {
        //无token情况
        next('/login');
        document.title = '登录';
    } else if(!user && to.path !== '/login' && to.path !== '/register' && to.path !== '/forgetpassword') {
        //有token非用户情况
        next('/login');
        document.title = '登录';
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }

});

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');
