<template>
	<div>
		<h1>회원목록</h1>
		<div>
			<ul>
				<UserListItem
					v-for="userItem in userlist"
					:key="userItem.id"
					:userItem="userItem"
				></UserListItem>
			</ul>
		</div>
	</div>
</template>

<script setup>
import { apiGetUsers } from '@/apis/user';
import { onMounted, ref } from 'vue';
import UserListItem from '@/components/UserListItem.vue';

const userlist = ref();
onMounted(() => {
	console.log('ddd');
	getUserList1();
});

const getUserList1 = async () => {
	console.log('getUserList');
	const { data } = await apiGetUsers();
	console.log(data);
	userlist.value = data;
};
</script>

<style lang="scss" scoped></style>
