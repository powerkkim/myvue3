<template>
	<div>
		<!-- <router-link to="/home">홈으로</router-link> |
		<router-link to="/about">about</router-link> |
		<router-link to="/user">user 목록</router-link> |
		<router-link to="/member"> 회원전용 </router-link> -->
		<Menubar :model="items">
			<template #item="{ item, props, hasSubmenu }">
				<router-link
					v-if="item.route"
					v-slot="{ href, navigate }"
					:to="item.route"
					custom
				>
					<a v-ripple :href="href" v-bind="props.action" @click="navigate">
						<span :class="item.icon" />
						<span class="ml-2">{{ item.label }}</span>
					</a>
				</router-link>
				<a
					v-else
					v-ripple
					:href="item.url"
					:target="item.target"
					v-bind="props.action"
				>
					<span :class="item.icon" />
					<span class="ml-2">{{ item.label }}</span>
					<span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
				</a>
			</template>
		</Menubar>
	</div>
</template>

<script setup>
import Menubar from 'primevue/menubar';
import { ref } from 'vue';

const items = ref([
	{
		label: '홈으로',
		icon: 'pi pi-home',
		route: 'home',
	},
	{
		label: 'about',
		icon: 'pi pi-info',
		route: 'about',
	},
	{
		label: 'user 목록',
		icon: 'pi pi-user',
		route: 'user',
	},
	{
		label: '회원전용',
		icon: 'pi pi-user-plus',
		route: 'member',
	},
]);
</script>

<style lang="scss" scoped></style>
