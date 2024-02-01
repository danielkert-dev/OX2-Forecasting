<script setup>
import { onMounted, watch } from "vue";
import { useLanguageStore } from "../stores/LanguageStore.js";
import { useTextStore } from "../stores/TextStore.js";

onMounted(async () => {
    await useTextStore().setText()
})

watch(useLanguageStore(), async () => {
    console.log(useLanguageStore().$state.about)
})
</script>

<template>
    <div class="container text-center my-5 py-5">
    <div class="w-75 mx-auto" v-html=" useLanguageStore().about[0].content.rendered"></div>
    </div>
</template>
