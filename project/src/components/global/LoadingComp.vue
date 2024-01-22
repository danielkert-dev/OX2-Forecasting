<script setup>
import { onMounted, ref, watch } from 'vue';
import { loadingStore } from '../../stores/LoadingStore.js';

const loading = ref(true);

onMounted(async () => {
    loading.value = await loadingStore().isLoading;
});

watch(loadingStore(),async () => {
    loading.value = await loadingStore().isLoading;
    // {{ console.log(loading.value) }}
});

</script>


<template>
  <!-- if true then loding if false then loaded -->
    <div :class="{ loaded: !loading , loading: loading }">
    <div class="lds-ellipsis">
      <!-- <img src="../../assets/images/animation.gif" width="100" height="100"> -->
      <div></div><div></div><div></div><div></div>
      </div>
    </div>
</template>
    
<style scoped>

.loaded {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}

.loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background-color: rgba(255, 255, 255, 1);
    opacity: 1;
    transition: all 0.3s ease-in-out;
  }
  
  .lds-ellipsis {
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;

    width: 80px;
    height: 80px;
  }
  .lds-ellipsis div {
    position: absolute;
    top: 0;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.6);
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  .lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
  
</style>