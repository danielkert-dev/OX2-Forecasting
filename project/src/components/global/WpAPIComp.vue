<script setup>
/* //@ Imports
    - Wordpress api fetch
    - Language store to change language
    - Text store to access fetch globaly
*/

import { ref, onMounted, computed, watch } from "vue";
import { useWpAPIStore } from "../../stores/WpAPIStore.js";
import { useLanguageStore } from "../../stores/LanguageStore.js";
// import { useTextStore } from "../../stores/TextStore.js";
// import { useRouter } from "vue-router";
// const router = useRouter();

/* //@ Variables 
    - Set path and queries
*/


const endpointCategories = computed(() => {
  const language = useLanguageStore().getLanguage();
  const endpointCategoriesPre = "categories?slug=forecasting-";
  if (language === "en") {
    return endpointCategoriesPre + "en";
  } else if (language === "sv") {
    return endpointCategoriesPre + "sv";
  } 
  else if (language === "fi") {
    return endpointCategoriesPre + "fi";
  }
  else {
    return console.error("Language not found");
  }
});

const data = ref([]);

const selectedLanguage = ref(useLanguageStore().getLanguage());
onMounted(async () => {
  await useLanguageStore().setText(selectedLanguage.value);

  if (selectedLanguage.value === "en") {
  try {
    data.value = await useWpAPIStore().fetchData("posts?categories=9", "");
    useLanguageStore().setTextAbout(data.value);
  } catch (error) {
    console.error(error.message);
  }
   
 } else if (selectedLanguage.value === "sv") {
  try {
    data.value = await useWpAPIStore().fetchData("posts?categories=31", "");
    useLanguageStore().setTextAbout(data.value);
  } catch (error) {
    console.error(error.message);
  }
 } 
 else if (selectedLanguage.value === "fi") {
  try {
    data.value = [await useWpAPIStore().fetchData("posts/594", "")];
    useLanguageStore().setTextAbout(data.value);
  } catch (error) {
    console.error(error.message);
  }
 } 
//  else if (selectedLanguage.value === "fi") {
//   // https://www.datanom.ax/~kjell/ox2/wp-json/wp/v2/posts/594
//   try {
//     data.value = await useWpAPIStore().fetchData("posts?categories=594", "");
//     useLanguageStore().setTextAbout(data.value);
//   } catch (error) {
//     console.error(error.message);
//   }
//  }
})

/* //@ Methods
 */


/* //@ Watchers
 */

watch(selectedLanguage, async () => {
 if (selectedLanguage.value === "en") {
  try {
    data.value = await useWpAPIStore().fetchData("posts?categories=9", "");
    useLanguageStore().setTextAbout(data.value);
  } catch (error) {
    console.error(error.message);
  }
   
 } else if (selectedLanguage.value === "sv") {
  try {
    data.value = await useWpAPIStore().fetchData("posts?categories=31", "");
    useLanguageStore().setTextAbout(data.value);
  } catch (error) {
    console.error(error.message);
  }
 } 
 
 else if (selectedLanguage.value === "fi") {
  try {
    data.value = [await useWpAPIStore().fetchData("posts/594", "")];
    useLanguageStore().setTextAbout(data.value);
  } catch (error) {
    console.error(error.message);
  }
 } 
//  else if (selectedLanguage.value === "fi") {
//   // https://www.datanom.ax/~kjell/ox2/wp-json/wp/v2/posts/594
//   try {
//     data.value = await useWpAPIStore().fetchData("posts?categories=594", "");
//     useLanguageStore().setTextAbout(data.value);
//   } catch (error) {
//     console.error(error.message);
//   }
//  }
});

/* //@ Functions
 */

async function updateLanguage() {
  useLanguageStore().setLanguage(selectedLanguage.value);
  useLanguageStore().setText(selectedLanguage.value);
}

</script>

<template>
  <div class="h-100 d-flex flex-wrap justify-content-center align-content-center">
    <img src="https://www.datanom.ax/~kjell/ox2/wp-content/uploads/2024/01/Asset-1@100x.png" class="lang-img" v-if="selectedLanguage === 'en'">
    <img src="https://www.datanom.ax/~kjell/ox2/wp-content/uploads/2024/01/Asset-2@100x-1.png" class="lang-img" v-if="selectedLanguage === 'sv'">
    <img src="https://www.datanom.ax/~kjell/ox2/wp-content/uploads/2024/01/Artboard-1-1.png" class="lang-img" v-if="selectedLanguage === 'fi'">
      <select
      class="custom-select lang-select rounded"
      v-model="selectedLanguage"
      @change="updateLanguage"
    >
      <option value="en">En</option>
      <option value="sv">Sv</option>
      <option value="fi">Fi</option>
    </select>
  </div>
</template>

<style scoped lang="scss">
$main-color: #616968;
$secondary-color: #004140;
$third-color: #343434;
$text-color: #f8f7f6;
$nav-color: #354A48;

.lang-select {
  display: flex;
  justify-content: center;
  align-content: center;
  background-color: $third-color;
  color: $text-color;
  color-scheme: dark;
  border: none;
  padding: .45rem;
  padding-left: .6rem;
  padding-right: .6rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  filter:brightness(1.2);
  opacity: 0;
}

.lang-img {
  width: 2rem;
  height: 2rem;
  position: absolute;
  padding: 0;
  margin: 0;
  // translate: .7rem .2rem;
  pointer-events: none;
  z-index: 10;
  right: .6rem;
  margin-top: .2rem;
}



.lang-select:focus,
.lang-select:active {
  background-color: $third-color;
  color: $text-color;
  color-scheme: dark;
  border: none;
  outline: none;
}

@media screen and (min-width: 1400px) {
  .lang-select {
    margin-left: 150px;
    background-color: $third-color;
    color: $text-color;
  }

  .lang-select:focus,
.lang-select:active {
  background-color: $third-color;
  color: $text-color;
}

  
}


</style>
