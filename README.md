# Vue Router 컴포넌트 및 설정
=============================

## 1. router-link와 router-view
### 1.1 router-link
  * 네비게이션을 위한 컴포넌트
  * 페이지 새로고침 없이 SPA 방식으로 라우팅 처리
  * to 속성으로 이동할 경로 지정

### 1.2 router-view
  * 현재 라우트에 매칭된 컴포넌트를 렌더링하는 영역
  * 라우트 변경 시 동적으로 내용 업데이트
  * 사용 예시 (App.vue)

```html
<template>
  <router-link to="/home">홈으로</router-link> |
  <router-link to="/about">about</router-link>

  <router-view></router-view>
</template>
```

## 2. router/index.js 설정
router/index.js 파일은 Vue Router의 설정을 정의합니다. 주요 내용은 다음과 같습니다:
```javascript
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
```
주요 구성 요소:
1. 라우트 정의: routes 배열에 각 경로와 해당 컴포넌트를 매핑
2. 라우터 생성: createRouter 함수로 라우터 인스턴스 생성
3. 히스토리 모드: createWebHistory로 HTML5 History 모드 사용
4. 라우터 내보내기: 생성된 라우터를 export하여 다른 파일에서 사용 가능


## 3 코드 스플리팅 및 다이나믹 임포트
### 3.1 코드 스플리팅 (Code Splitting)
코드 스플리팅은 애플리케이션의 코드를 여러 개의 작은 청크(chunk)로 나누는 기술입니다.
#### 장점:
* 초기 로딩 시간 감소
* 필요한 코드만 로드하여 성능 향상
* 효율적인 캐싱
### 3.2 다이나믹 임포트 (Dynamic Import)
다이나믹 임포트는 코드 스플리팅을 구현하는 방법 중 하나로, 필요한 시점에 모듈을 동적으로 로드합니다.
#### Vue Router에서의 사용 예:
```javascript
const routes = [
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  }
]
```


## 4. Navigation Guard
Navigation Guard는 Vue Router에서 제공하는 기능으로, 라우트 간의 네비게이션을 제어하고 보호하는 데 사용됩니다. 주로 사용자 인증, 권한 확인, 데이터 로딩 등의 작업을 수행하는 데 활용됩니다.

> 주요 Navigation Guard 유형:
1. 전역 가드 (Global Guards):
    * router.beforeEach: 모든 라우트 변경 전에 실행
    * router.afterEach: 모든 라우트 변경 후에 실행
2. 라우트별 가드 (Per-Route Guard):
    * beforeEnter: 특정 라우트에 진입하기 전에 실행
3. 컴포넌트 내부 가드 (In-Component Guards):
    * beforeRouteEnter: 컴포넌트 렌더링 전 실행
    * beforeRouteUpdate: 같은 컴포넌트를 재사용할 때 실행
    * beforeRouteLeave: 현재 라우트에서 떠날 때 실행


> 전역 가드 설정. 
1. 라우트 설정:
먼저, 인증이 필요한 라우트에 meta 필드를 추가하고 requiresAuth: true를 설정합니다.
 
```javascript
// router/index.js
const routes = [
  {
    path: '/member',
    name: 'member',
    component: () => import('@/views/MemberView.vue'),
    meta: { requiresAuth: true },
  },
  // 다른 라우트들...
]; 
```

2. 전역 가드 설정:
router.beforeEach를 사용하여 모든 라우트 변경 전에 실행될 가드를 설정합니다.
```javascript
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !userStore().isLogin()) {
    next({ name: 'login' })
  } else {
    next()
  }
})
```

이 가드는 다음과 같이 작동합니다:
* to.meta.requiresAuth를 확인하여 현재 이동하려는 라우트가 인증을 요구하는지 확인합니다.
* userStore().isLogin()을 통해 사용자의 로그인 상태를 확인합니다.
* 인증이 필요하고 사용자가 로그인하지 않은 경우, 로그인 페이지로 리다이렉트합니다.
* 그 외의 경우에는 원래 이동하려던 페이지로 이동을 허용합니다.

이 방식을 사용하면 특정 라우트에 대해 인증을 요구할 수 있으며, 인증되지 않은 사용자의 접근을 효과적으로 제어할 수 있습니다. 또한, 각 라우트마다 meta 필드를 통해 인증 요구 사항을 쉽게 설정하고 관리할 수 있습니다.