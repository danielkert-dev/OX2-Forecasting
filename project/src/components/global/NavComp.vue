<script setup>
import { onMounted, ref, watch, computed, nextTick } from "vue";

import { useRouter } from "vue-router";
const router = useRouter();
import { useDataTypeStore } from "../../stores/DataTypeStore";
import WpAPIComp from "../../components/global/WpAPIComp.vue";
import { useDataStore } from "../../stores/DataStore";

const udts = useDataTypeStore();
const dataType = ref(udts.dataType);
const firstDate = ref(udts.firstDate);
const lastDate = ref(udts.lastDate);
const selectedDate = ref(udts.selectedDate);

function goToView(dataType) {
  if (dataType === "daily") {
    router.push({ name: "main" });
  } else if ( dataType === "hourly") {
    router.push({ name: "hourly" });
  } else if (dataType === "monthly") {
    router.push({ name: "monthly" });
    selectedDate.value = 0
  } else if (dataType === "yearly") {
    router.push({ name: "yearly" });
  } else {
    console.error("Invalid data type");
  }
}


/* //@watch
 */

watch(useDataTypeStore(), async () => {
  // console.log(dataType);
  // console.log(udts.firstDate);
  // console.log(udts.selectedDate);

  firstDate.value = udts.firstDate;
  lastDate.value = udts.lastDate;
  selectedDate.value = udts.selectedDate;
});

watch(selectedDate, () => {
  udts.selectedDate = selectedDate.value;
});

// Sets the date of dataType to the current route (Needed to display in nav)
watch(
  () => router.currentRoute.value,
  () => {
    // console.log(router.currentRoute.value.name);
    if (router.currentRoute.value.name === "main") {
      dataType.value = "daily";
    } else {
      dataType.value = router.currentRoute.value.name;
    }
  }
);
</script>

<template>
  <span class="nav-img"></span>
  <nav class="d-flex navbar fixed-top ">
    <div class="ms-2 iconWrap">
      <h4 class="">
        <img
          style="margin-top: -0.2rem"
          width="45"
          src="https://www.datanom.ax/~kjell/ox2/wp-content/uploads/2024/01/OX2_logo_white-1.png"
        />
        Forecast
      </h4>
      <p class="text-light">Möckelö</p>
    </div>

    <div
      class="middleWrap"
      v-if="router.currentRoute.value.name !== 'about'"
    >
      <select
        v-model="dataType"
        class="custom-select dark-mode form-select dataTypeSelect me-1"
        style="width: 10rem; height: fit-content;"
        @change="goToView(dataType)"
      >
        <option value="hourly" :selected="dataType === 'hourly'">Hourly</option>
        <option value="daily" :selected="dataType === 'daily'">Daily</option>
        <option value="monthly" :selected="dataType === 'monthly'">Monthly</option>
        <!-- <option value="yearly" :selected="dataType === 'yearly'" disabled>Yearly</option> -->
      </select>

      <div v-if="dataType === 'daily'">
        <input
          type="date"
          v-model="selectedDate"
          :min="firstDate"
          :max="lastDate"
          class=" dark-mode form-control dateSelectDaily my-auto ms-1"
          style="width: 10rem"
        />
      </div>

      <div v-if="dataType === 'hourly'">
        <select
        v-model="selectedDate"
            style="width: 10rem; height: fit-content"
            class="custom-select dark-mode form-control dateSelectMonthly ms-1 my-auto"
          >
      <option v-for="data in useDataStore().$state.dataHourlyOutput" :key="new Date(data.date).getHours()- new Date().getHours()" :value="new Date(data.date).getHours()- new Date().getHours()" :selected="new Date(data.date).getHours()- new Date().getHours() === selectedDate" >{{ new Date(data.date).getHours() + ":00" }}</option>
        </select>
      </div>

      <div v-if="dataType === 'monthly'">
        <div
          class="d-flex flex-wrap justify-content-center align-content-center"
          v-if="router.currentRoute.value.name !== 'about'"
        >
          <select
            v-model="selectedDate"
            style="width: 10rem; height: fit-content"
            class="custom-select dark-mode form-control dateSelectMonthly ms-1 my-auto"
          >
            <option value="0">Februari</option>
            <option value="1">Mars</option>
            <option value="2">April</option>
            <option value="3">Maj</option>
            <option value="4">Juni</option>
            <option value="5">Juli</option>
            <option value="6">Augusti</option>
            <option value="7">September</option>
            <option value="8">Oktober</option>
            <option value="9">November</option>
            <option value="10">December</option>
            <option value="11">Januari</option>
          </select>
        </div>
      </div>
    </div>

    <div class="me-2 ">
      <WpAPIComp />
    </div>
  </nav>

  <div class="navSpacer"></div>
</template>

<style scoped lang="scss">
$main-color: #616968;
$secondary-color: #004140;
$third-color: #343434;
$text-color: #f8f7f6;
$nav-color: #354A48;

nav {
  width: 100vw;
  color: $text-color !important;
}


@media screen and (min-width: 1400px) {

}

.middleWrap {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 2000px) {
  nav {
    // background-color: $third-color !important;
  }

  .nav-img {
  content: "";
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url("../../assets/images/animated5.svg");
  top: -37%;
  left: 0%;
  opacity: 1;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  z-index: 2;
  user-select: none;
  pointer-events: none;
  // filter:drop-shadow(0 0 1rem $main-color);
}

  .middleWrap {
    width: fit-content;
  }

}

@media screen and (min-width: 1350px){
  .dataTypeSelect {
  margin-left: 1.3rem
}

  .iconWrap {
      padding-left: 1rem;
    }

  .middleWrap {
    
  }
  
}

.navSpacer {
  height: 5rem;
}

.iconWrap {
  height: 4rem;
}



.dateSelectDaily {

}



@media screen and (max-width: 600px) {
  
  .nav-img {
  top: -32%;
}
  .iconWrap {
    width: 100%;
    text-align: center;
  }

  .navSpacer {
  height: 5rem;
}

.dataTypeSelect {
margin-left: .4rem
}
  
}


input,
select {
  background-color: $third-color;
  color: $text-color;
  color-scheme: dark;
  border: none;
  filter:brightness(1.2);
  outline: none;
  box-shadow: none;

}

select:focus,
select:active,
input:focus,
input:active {
  background-color: $third-color;
  color: $text-color;
  border: none;
  outline: none;
  // shadow none

  box-shadow: none;
}


.custom-select {
  background: $third-color
    url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3e%3cpath fill='white' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e")
    no-repeat right 0.75rem center/8px 10px !important;
    outline: none;
}
</style>
