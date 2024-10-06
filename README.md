# 1. PrimeVue 설정 가이드
## 1-1. 모듈 설치

터미널에서 다음 명령어를 실행하여 필요한 모듈을 설치합니다:

```
bash
npm install @primevue/themes primevue primeicons
```


## 1-2. main.js 설정

`src/main.js` 파일을 다음과 같이 수정합니다:

```javascript
// main.js
import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css';

import App from './App.vue';
import router from './router';
import pinia from './stores';

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: '.my-app-dark',
            cssLayer: false,
        },
    },
});

// 필요한 PrimeVue 컴포넌트들을 여기에 전역 등록
// 예: app.component('Button', Button);

app.mount('#app');
```


## 1-3. 설정 설명

- `@primevue/themes`에서 Aura 테마를 가져옵니다.
- `primevue/config`에서 PrimeVue를 가져옵니다.
- `primeicons/primeicons.css`를 가져와 아이콘을 사용할 수 있게 합니다.
- `app.use(PrimeVue, {...})`로 PrimeVue를 설정합니다.
  - Aura 테마를 사용하도록 지정합니다.
  - 테마 옵션에서 `prefix`, `darkModeSelector`, `cssLayer` 등을 설정할 수 있습니다.

## 1-4. 컴포넌트 사용

- 필요한 개별 컴포넌트는 각 Vue 파일에서 import하여 사용하거나, main.js에서 전역으로 등록할 수 있습니다.

## 1-5. 다크 모드

- 다크 모드를 사용하려면 `.my-app-dark` 클래스를 앱의 루트 요소에 추가하면 됩니다.


# 2. 페이지 layout 설정

## 2-1. 레이아웃 컴포넌트 생성

* 레이아웃별 컴포넌트를 생성합니다.
* DefaultLayout.vue 생성, EmptyLayout.vue 생성
* 각 layout별 router-view를 사용하여 페이지를 구성합니다.
```vue
// DefaultLayout.vue
<template>
	<AppHeader></AppHeader>
	<router-view></router-view>
	<AppFooter></AppFooter>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
</script>
```

```vue
// EmptyLayout.vue
<template>
	<h1>Empty Layout</h1>
	<router-view></router-view>
</template>

```
* App.vue 는 전체 layout을 담을수 있도록 router-view만 존재 합니다.
```
// App.vue
<template>
	<router-view></router-view>
</template>

<script setup></script>
```

* router 설정 
- 각 layout 별 페이지 설정 ( children 을 통해 router 설정 )

```javascript
// router/index.js  
import { createRouter, createWebHistory } from 'vue-router';
// import { userStore } from '@/stores/userStore';

const routes = [
	{ path: '/', redirect: '/home' },
	{
		path: '/',
		name: 'defaultLayout',
		component: () => import('@/layouts/DefaultLayout.vue'),
		children: [
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
		],
	},
	{
		path: '/',
		name: 'emptyLayout',
		component: () => import('@/layouts/EmptyLayout.vue'),
		children: [
			{
				path: '/login',
				name: 'login',
				component: () => import('@/views/LoginView.vue'),
			},
		],
	},
	{
		path: '/:pathMatch(.*)*',
		component: () => import('@/views/NotFoundPage.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL), // vite.config. base 설정.
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
```




