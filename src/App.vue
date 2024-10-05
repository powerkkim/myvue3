<script setup></script>

<template>
	<h1>Vue3 test</h1>
	<router-link to="/home">홈으로</router-link> |
	<router-link to="/about">about</router-link> |
	<router-link to="/member"> 회원전용 </router-link>

	<router-view></router-view>
</template>
