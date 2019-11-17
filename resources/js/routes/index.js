import Vue from 'vue'
import Router from 'vue-router'

import Auth from '../packages/auth'
Vue.use(Auth)

import Register from '../pages/register'
import Login from '../pages/login'
import Details from '../pages/details'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Details,
            meta: {
                forAuth: true
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                forVisitors: true
            }
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            meta: {
                forVisitors: true
            }
        },
        {
            path: '/details',
            name: 'details',
            component: Details,
            meta: {
                forAuth: true
            }
        }
    ]
});

router.beforeEach(
	(to, from, next) => {
		if(to.matched.some(record => record.meta.forVisitors)) {
			if(Vue.auth.isAuthenticated()) {
				next({
					path: '/'
				})
			} else next()
		}
		else if(to.matched.some(record => record.meta.forAuth)) {
			if(!Vue.auth.isAuthenticated()) {
				next({
					path: '/login'
				})
			} else next()
		}
		else next()
	}
)

export default router