<template>
	<h1>Home</h1>

	<p>Count: {{ counterStore.count }}</p>
	<Toast />

	<Button @click="increment" label="Count"></Button>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter';
import { useToast } from 'primevue/usetoast';
import Button from 'primevue/button';
import Toast from 'primevue/toast';

const toast = useToast();

const counterStore = useCounterStore();

const increment = () => {
	counterStore.increment();
	toast.add({
		severity: 'success',
		summary: 'PrimeVue',
		detail: 'Welcome to PrimeVue + Create Vue',
		life: 3000,
	});
};
</script>
