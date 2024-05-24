import Vue from 'vue'
import Router from 'vue-router';
import TokenService from "./services/TokenService";

Vue.use(Router);

const router = new Router({
	mode: 'history',
	linkActiveClass: 'active',
	routes: [
		{
			path: '/',
			component: () => import('./pages/Index'),
			name: 'home'
		},
		{
			path: '/add',
			component: () => import('./pages/EmployeeAdd'),
			name: 'employee-add'
		},
		{
			path: '/edit/:id',
			component: () => import('./pages/EmployeeEdit'),
			name: 'employee-edit'
		},
		{
			path: '/department',
			component: () => import('./pages/Department'),
			name: 'department'
		},
		{
			path: '/programming-language',
			component: () => import('./pages/ProgrammingLanguage'),
			name: 'programming-language'
		},
		{
			path: '/users',
			component: () => import('./pages/User'),
			name: 'user'
		},
		{
			path: '/login',
			component: () => import('./pages/Login'),
			name: 'login',
			meta: {
				public: true,
				onlyWhenLoggedOut: true
			},
		}
	]
});

router.beforeEach((to, from, next) => {
	const isPublic = to.matched.some(record => record.meta.public);
	let hasToken = !!TokenService.getToken();

	if (!isPublic && !hasToken) {
		return next({
			name: 'login'
		})
	}

	next();
});

export default router;
