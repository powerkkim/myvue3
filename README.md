# myvue3
## Vue 프로젝트 생성 과정

1. Vite Vue 프로젝트 생성
   ```
   npm init vue
   ```

2. 프로젝트 설정
   - Project name: vue-project
   - Add TypeScript? No
   - Add JSX Support? No
   - Add Vue Router for Single Page Application development? Yes
   - Add Pinia for state management? Yes
   - Add Vitest for Unit Testing? No
   - Add an End-to-End Testing Solution? No
   - Add ESLint for code quality? Yes
   - Add Prettier for code formatting? Yes

3. 프로젝트 디렉토리로 이동 및 종속성 설치
   ```
   cd vue-project
   npm install
   ```

4. 코드 포맷팅
   ```
   npm run format
   ```

5. 개발 서버 실행
   ```
   npm run dev
   ```


## Vue 프로젝트 eslint 기본 설정.

1. .eslintrc.cjs 파일 수정.
```javascript
require('@rushstack/eslint-patch/modern-module-resolution');
module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier'     //  '@vue/eslint-config-prettier/skip-formatting'  skip-formatting 을 제거
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      // prettier 설정 적용
		'prettier/prettier': [
			'error',
			{
				singleQuote: true,
				semi: true,
				useTabs: true,
				tabWidth: 2,
				trailingComma: 'all',
				printWidth: 80,
				bracketSpacing: true,
				arrowParens: 'always',
				endOfLine: 'auto',
			},
		],
	},
};
```
2. prettier 를 eslint option에 설정함에 따라 .prettierrc.json 파일은 불필요 합니다. 삭제 처리 합니다.


3. settings.json 파일 수정.

CTRL+, > eslint 검색 > ESlint 선택 > 하단에 ESlint: Validate  Edit in settings.json 클릭 
![alt text](./md/image.png)

![alt text](./md/image2.png)

```
{
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit", 
  },
  "editor.formatOnSave": false, 
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact", 
    "vue",
  ],  
}

```

4. package.json 파일 수정.
prettier는 lint를 이용하여 lint에서 대신 처리해 줌으로서 format 명령어를 따로 사용하지 않음.

```javascript
"scripts": {
  "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs --fix --ignore-path .gitignore",
  // "format": "prettier --write src/"  ( 제거해 준다. )
}
```

5. 설정된 포맷 전체 파일 반영
```
npm run lint
```

** 이후 저장시에 설정된 포맷에 맞도록 자동 수정됨. **

## Vue 프로젝트 기본파일 초기화.
### 기반이 되는 코드 만들기. 
1. 불필요 파일 제거 
- .prettierrc.json 파일 제거.
- assets/base.css, assets/main.css 파일 제거.
- components 파일 제거. 
- views 파일 제거. 
- router/index.js 수정. ( 불필요 파일 제거로 인한 수정.)
- main.js 수정. assets import 제거.
```javascript
//router/index.js
import { createRouter, createWebHistory } from 'vue-router';
// import HomeView from '../views/HomeView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		// {
		// 	path: '/',
		// 	name: 'home',
		// 	component: HomeView,
		// },
		// {
		// 	path: '/about',
		// 	name: 'about',
		// 	// route level code-splitting
		// 	// this generates a separate chunk (About.[hash].js) for this route
		// 	// which is lazy-loaded when the route is visited.
		// 	component: () => import('../views/AboutView.vue'),
		// },
	],
});

export default router;
```
2. App.vue 파일 수정.

```html
<script setup>
import { useCounterStore } from '@/stores/counter';

const counterStore = useCounterStore();
</script>

<template>
	<h1>Home</h1>
	<p>Count: {{ counterStore.count }}</p>
	<button @click="counterStore.increment">Increment</button>
</template>
