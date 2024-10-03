<template>
	<li>
		<div>{{ userItem.id }}</div>
		<div>{{ userItem.age }}</div>
		<div>{{ userItem.username }}</div>
		<div>{{ userItem.email }}</div>
		<div>{{ userItem.phone }}</div>
	</li>
</template>

<script setup>
const props = defineProps({
	userItem: {
		type: Object,
		required: true,
	},
});

console.log(props);
</script>

<style lang="scss" scoped></style>
