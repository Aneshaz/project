import Vue from 'vue';
import VueRouter from 'vue-router';
import { getToken } from "@/utils/index";
import { goLogin } from "@/api/index";

Vue.use(VueRouter);

import IndexPage from '@/pages/Index';
import FAQ from "@/pages/FAQ";

const router = new VueRouter({
    routes: [{
        path: '/index',
        component: IndexPage
    }, {
        path: '*',
        redirect: '/index'
    }, {
        path: '/FAQ',
        component: FAQ
    }]
})

router.beforeEach((to, from, next) => {
    if (getToken()) {
        next();
    } else {
        goLogin();
    }
})

router.afterEach((to, from) => {

})

export default router;