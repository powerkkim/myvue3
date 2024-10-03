import { createRouter, createWebHistory } from 'vue-router';
// import { userStore } from '@/stores/userStore';

const routes = [
	{ path: '/', redirect: '/home' },
	{
		path: '/home',
		name: 'home',
		component: () => import('@/views/HomeView.vue'),
	},
	{
		path: '/about',
		name: 'about',
		component: () => import('@/views/AboutView.vue'),
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/LoginView.vue'),
	},
	{
		path: '/user',
		name: 'user',
		component: () => import('@/views/UserView.vue'),
	},
	{
		path: '/member',
		name: 'member',
		component: () => import('@/views/MemberView.vue'),
		meta: { requiresAuth: true },
	},
	{
		path: '/:pathMatch(.*)*',
		component: () => import('@/views/NotFoundPage.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

router.beforeEach((to, from, next) => {
	// explicitly return false to cancel the navigation
	// if (to.meta.requiresAuth && !userStore().isLogin()) {
	if (to.meta.requiresAuth) {
		next({ name: 'login' });
	} else {
		next();
	}
});

export default router;
