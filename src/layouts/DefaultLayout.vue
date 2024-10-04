<template>
	<AppHeader></AppHeader>
	<router-view></router-view>
	<AppFooter></AppFooter>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
</script>
