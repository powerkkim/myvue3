<template>
	<h1>Home</h1>

	<p>Count: {{ counterStore.count }}</p>
	<button @click="counterStore.increment">Increment</button>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter';

const counterStore = useCounterStore();
</script>
