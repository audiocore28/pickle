<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';

const store = useGameStore();
const { driveCapacity } = storeToRefs(store);

const sizes = ref([280,440,910]);
</script>

<template>
	<div class="py-1 px-2 bg-stone-600 rounded-[170px] border border-stone-500 justify-around items-center flex">
		<svg @click="store.getNextLowerCapacity(sizes)" width="14" height="15" class="cursor-pointer" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M2.33398 7.5H11.6673" stroke="#292524" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
		</svg>
		<span class="w-12 text-center text-stone-200 text-xs">{{ driveCapacity }} GB</span>
		<svg @click="store.getNextHigherCapacity(sizes)" class="cursor-pointer relative" width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M2.33398 7.49998H11.6673M7.00065 2.83331V12.1666V2.83331Z" stroke="#292524" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
		</svg>
	</div>
</template>