<script setup lang="ts">
import $ from "jquery";
//@ts-nocheck
import AppLayout from "./components/AppLayout.vue";
$("#app").removeClass("x-loading");
</script>

<template>
	<AppLayout />
</template>

<style scoped>
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
}

.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
