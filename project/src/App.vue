<script setup>
import { RouterView, RouterLink } from "vue-router";
import { Transition } from "vue";
import NavComp from "./components/global/NavComp.vue";
import LoadingComp from "./components/global/LoadingComp.vue";
import { useDataTypeStore } from "./stores/DataTypeStore";

const udts = useDataTypeStore();

function resetDataType() {
  udts.dataType = "daily";
}
</script>

<template>
  <LoadingComp/>
  <NavComp />
  <RouterView />

    <footer class="text-center footer pt-3">
      <RouterLink
        to="/"
        class="m-2 text-decoration-none text-light"
        @click="resetDataType()"
        >Home</RouterLink
      >
      <RouterLink to="/about" class="m-2 text-decoration-none text-light"
        >About</RouterLink
      >
    </footer>

  <span></span>

</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap");

$main-color: #416661;
$secondary-color: #004140;
$third-color: #343434;
$text-color: #f8f7f6;

body {
  // Background opacity
  font-family: "Poppins", sans-serif;
  // overflow: hidden; /* Hide scrollbars */
  // background-image: url('https://cdn.discordapp.com/attachments/1194950596386619414/1197828146276343899/sidebar.png?ex=65bcaf64&is=65aa3a64&hm=4d10065f60acbb09e9857faf2a4dd3a76b35a9db125558950d692a286b3d294e&');
  // background-repeat: no-repeat;
  // background-size: cover;
}




footer {
  position: fixed;
    height: 60px;
    bottom: 0;
    width: 100%;
}

@media screen and (min-width: 1800px) {

  footer::before {
  content: "";
  position:fixed;
  top: 0%;
  left: 0%;
  right: 0;
  bottom: 0;
  background-image: url("./assets/images/full.svg");
  z-index: -1000;
  opacity: 1;
  -khtml-user-select: none;
    -o-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  transform: scale(1.01);
}

}

@media screen and (max-width: 1800px) {
  footer {
    background-color: $third-color !important;
  }

  footer::before {
    content: "";
    background-image: "";
    top: 0%;
    left: 0%;
    opacity: 1;
  }

}

/* Style the scrollbar */
::-webkit-scrollbar {
  width: 0px; /* Adjust the width as needed */
  background: transparent; /* Set the background color of the scrollbar track */
}
::-webkit-scrollbar-thumb {
  background: transparent; /* Set the background color of the scrollbar handle */
}
::-webkit-scrollbar-thumb:hover {
  background: transparent; /* Set the background color of the scrollbar handle on hover */
}


@media screen and (max-width: 385px) {
  html {
    display: none;
  }
}
</style>
