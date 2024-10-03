// import { userStore } from '@/stores/userStore';

export function setInterceptors(instance) {
	// 요청 인터셉터 추가
	instance.interceptors.request.use(
		(config) => {
			// 요청을 보내기 전에 수행할 작업
			// const token = userStore().getToken();
			// console.log('token:', token);
			// if (token) {
			// 	config.headers['Authorization'] = `${token}`;
			// }
			config.headers['Content-Type'] = 'application/json';

			console.log('Request sent:', config);
			return config;
		},
		(error) => {
			// 요청 오류가 있는 경우 수행할 작업
			return Promise.reject(error);
		},
	);

	// 응답 인터셉터 추가
	instance.interceptors.response.use(
		(response) => {
			// 응답 데이터를 가공하거나 로깅
			console.log('Response received:', response);
			return response;
		},
		(error) => {
			// 응답 오류가 있는 경우 수행할 작업
			console.log('응답 오류 실패:', error);
			return Promise.reject(error);
		},
	);

	return instance;
}
