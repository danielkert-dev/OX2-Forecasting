<script setup>
import { onMounted, ref, watch, computed, nextTick } from "vue";

import { useRouter } from "vue-router";
const router = useRouter();
import { useDataTypeStore } from "../../stores/DataTypeStore";
import WpAPIComp from "../../components/global/WpAPIComp.vue";

const udts = useDataTypeStore();
const dataType = ref(udts.dataType);
const firstDate = ref(udts.firstDate);
const lastDate = ref(udts.lastDate);
const selectedDate = ref(udts.selectedDate);

function goToView(dataType) {
  if (dataType === "daily") {
    router.push({ name: "main" });
  } else if (dataType === "monthly") {
    router.push({ name: "monthly" });
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
    console.log(router.currentRoute.value.name);
    if (router.currentRoute.value.name === "main") {
      dataType.value = "daily";
    } else {
      dataType.value = router.currentRoute.value.name;
    }
  }
);
</script>

<template>
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
      class="middleWrap ms-1 d-flex flex-wrap justify-content-center align-content-center"
      v-if="router.currentRoute.value.name !== 'about'"
    >
      <select
        v-model="dataType"
        class="custom-select dark-mode form-select dataTypeSelect m-1"
        style="width: 8rem; height: fit-content"
        @change="goToView(dataType)"
      >
        <option value="daily" :selected="dataType === 'daily'">Daily</option>
        <option value="monthly" :selected="dataType === 'monthly'">Monthly</option>
        <option value="yearly" :selected="dataType === 'yearly'">Yearly</option>
      </select>

      <div v-if="dataType === 'daily'">
        <!-- Diable date selectedData before first date after last date -->
        <input
          type="date"
          v-model="selectedDate"
          :min="firstDate"
          :max="lastDate"
          class="m-1 dark-mode form-control dateSelectDaily d-flex flex-wrap justify-content-center align-content-center"
          style="width: 10rem; height: fit-content"
        />
      </div>

      <div v-if="dataType === 'monthly'">
        <div
          class="d-flex flex-wrap justify-content-center align-content-center"
          v-if="router.currentRoute.value.name !== 'about'"
        >
          <select
            style="width: 8rem; height: fit-content"
            class="custom-select dark-mode form-control dateSelectMonthly mt-1"
          >
            <option>Januari</option>
            <option>Februari</option>
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

nav {
  width: 100vw;
  color: $text-color !important;
}

@media screen and (min-width: 1350px) {
  nav::before {
  content: "";
  position: absolute;
  top: 40%;
  margin-top: -.3rem;
  left: 41%;
  right: 0;
  bottom: 0;
  background-image: url("../../assets/images/wave4.svg");
  z-index: -1;
  opacity: 1;
  background-repeat: no-repeat;
  background-size: 100% 150%;
  background-position: center;

  transform: scale(6);
  background-position: top;
  filter:brightness(.8);

}
}

.middleWrap {
  width: 30rem;
}

@media screen and (max-width: 1350px) {
  nav {
    background-color: $secondary-color !important;
  }

  .middleWrap {
    width: fit-content;
  }
}

.navSpacer {
  height: 5rem;
}

.iconWrap {
  height: 4rem;
}



@media screen and (max-width: 600px) {
  
  .iconWrap {
    width: 100%;
    text-align: center;
  }

  .navSpacer {
  height: 5rem;
}

  
}


input,
select {
  background-color: $secondary-color;
  color: $text-color;
  color-scheme: dark;
  border: none;
  filter:brightness(1.2);
}

select:focus,
select:active,
input:focus,
input:active {
  background-color: $secondary-color;
  color: $text-color;
  border: none;
  outline: none;
}


.custom-select {
  background: $secondary-color
    url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3e%3cpath fill='white' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e")
    no-repeat right 0.75rem center/8px 10px !important;
}
</style>
