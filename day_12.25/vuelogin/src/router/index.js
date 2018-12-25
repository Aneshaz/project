import Vue from "vue";
import Router from "vue-router";
import Login from "../components/login";
import LoginPage from "../components/loginPage";
import RegistryPage from "../components/registry";

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Login',
        component: Login
    }, {
        path: '/login',
        name: 'LoginPage',
        component: LoginPage
    }, {
        path: '/registry',
        name: 'RegistryPage',
        component: RegistryPage
    }]
})