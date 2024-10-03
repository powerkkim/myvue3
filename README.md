# Axios를 이용한 Instance 및 Interface 공통 처리

## 목차
1. [소개](#소개)
2. [Axios Instance 생성](#axios-instance-생성) 
3. [공통 요청 및 응답 처리](#공통-요청-및-응답-처리)
4. [사용 예시](#사용-예시)

## 소개
이 문서는 Axios를 사용하여 HTTP 요청을 처리할 때 instance와 interface를 활용한 공통 처리 방법과 사용법을 설명합니다.

## Axios Instance 생성
Axios instance를 생성하여 기본 설정을 공통으로 관리할 수 있습니다.

```javascript
import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://api.example.com',
    timeout: 5000,
    headers: {'Content-Type': 'application/json'}
});
```

## 공통 요청 및 응답 처리
인터셉터를 사용하여 요청 및 응답을 공통으로 처리합니다.

```javascript 
instance.interceptors.request.use(
  (config) => {
    // 요청 전 처리
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // 응답 데이터 처리
    return response;
  },
  (error) => {
    // 에러 처리
    return Promise.reject(error);
  }
);
```



