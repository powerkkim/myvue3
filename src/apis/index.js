// src/apis/index.js
import axios from 'axios';
import { setInterceptors } from '@/apis/common/interceptors';

const createInstance = () => {
	const instance = axios.create({
		baseURL: import.meta.env.VITE_API_URL, // 기본 URL 설정
		timeout: 3000, // 요청 제한 시간 설정
	});
	return setInterceptors(instance);
};

// const createInstanceWithAuth = (url) => {
// 	const instance = axios.create({
// 		baseURL: `${import.meta.env.VITE_API_URL}${url}`, // 기본 URL 설정
// 		timeout: 3000, // 요청 제한 시간 설정
// 	});
// 	return setInterceptors(instance);
// };

export const instance = createInstance();
// export const postsInstance = createInstanceWithAuth('/posts');
