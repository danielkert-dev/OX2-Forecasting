<script setup>
import { onMounted, ref, watch, computed, nextTick } from "vue";

import { desciptionFromEnergy } from "../components/DescriptionComp";


import { useTextStore } from "../stores/TextStore.js";
import { useDataStore } from "../stores/DataStore.js";
import { useDataTypeStore } from "../stores/DataTypeStore";
import { useLanguageStore } from "../stores/LanguageStore";

import { GChart } from "vue-google-charts";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Scrollbar } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const modules = [Pagination, Scrollbar];

useTextStore().setText();

// data type to determine what page it is on
const udts = useDataTypeStore()
// // const dataType = 'daily';
const dataType = udts.dataType;
const monthlyData = ref([]);
const selectedData = ref('')
const selectedDate = ref('')
const firstDate = ref('')// const lastDate = ref('')
const lastDate = ref('')

// const textData = ref('')
// const textList = ref([]);

const selectedSlide = ref('0');
const swiperRef = ref(null);

onMounted(async () => {
  const thisMonth = new Date().getMonth()
  await useDataStore().setData();
  monthlyData.value = await useDataStore().$state.dataMonthlyOutput[0];

  selectedData.value = monthlyData.value[thisMonth]
  udts.selectedDate = thisMonth
  selectedDate.value = thisMonth

  goToSlide(thisMonth);


  // console.log(selectedDate.value)
  // firstDate.value = monthlyData.value[0].date
  // lastDate.value = monthlyData.value[0].date


  // console.log(firstDate.value)
  // console.log(lastDate.value)

  accuracyData.value = [
    ["Name", "Accuracy"],
    [`${ useLanguageStore().text.accuracy }`, { v: selectedData.value.accuracy, f: "90%" }],
    ["Rest", { v: 100 - 100 * (selectedData.value.accuracy / 100), f: "10%" }],
  ];

  nextTick(() => {
    if (swiperRef.value && swiperRef.value.swiper) {
      swiperRef.value.swiper.update();
    }
  });

});

watch(selectedDate, () => {
  udts.selectedDate = selectedDate.value;

    selectedData.value = monthlyData.value[Number(selectedDate.value)];
    goToSlide(selectedDate.value);

});

watch(useLanguageStore(), async () => {
  accuracyData.value = [
    ["Name", "Accuracy"],
    [`${ useLanguageStore().text.accuracy }`, { v: selectedData.value.accuracy, f: "90%" }],
    ["Rest", { v: 100 - 100 * (selectedData.value.accuracy / 100), f: "10%" }],
  ];
  chartData.value = [
    ["Type", "KWH", { role: "tooltip" }], // Add a new column for colors
    [`${ useLanguageStore().text.electricalGrid }`, selectedData.value.energyKWh / 2, `${selectedData.value.energyKWh / 2} KWH`], // Use color1 for the first slice
    [`${ useLanguageStore().text.hydrogen }`, selectedData.value.energyKWh / 5, `${selectedData.value.energyKWh / 5} KWH`], // Use color2 for the second slice
    [`${ useLanguageStore().text.battery }`, selectedData.value.energyKWh / 5, `${selectedData.value.energyKWh / 5} KWH`], // Use color3 for the third slice
  ];

  if (selectedData.value.energyKWh < 0.99) {
    chartData.value = [
      ["Type", "KWH"], // Add a new column for colors
      ["No energy", 0.00001], // Use color1 for the first slice
    ];
  }
});

watch(useDataTypeStore() , async () => {
  selectedDate.value = udts.selectedDate
  selectedData.value = monthlyData.value[Number(selectedDate.value)]

  
  accuracyData.value = [
    ["Name", "Accuracy"],
    [`${ useLanguageStore().text.accuracy }`, { v: selectedData.value.accuracy, f: "90%" }],
    ["Rest", { v: 100 - 100 * (selectedData.value.accuracy / 100), f: "10%" }],
  ];

  chartData.value = [
    ["Type", "KWH", { role: "tooltip" }], // Add a new column for colors
    [`${ useLanguageStore().text.electricalGrid }`, selectedData.value.energyKWh / 2, `${selectedData.value.energyKWh / 2} KWH`], // Use color1 for the first slice
    [`${ useLanguageStore().text.hydrogen }`, selectedData.value.energyKWh / 5, `${selectedData.value.energyKWh / 5} KWH`], // Use color2 for the second slice
    [`${ useLanguageStore().text.battery }`, selectedData.value.energyKWh / 5, `${selectedData.value.energyKWh / 5} KWH`], // Use color3 for the third slice
  ];

  if (selectedData.value.energyKWh < 0.99) {
    chartData.value = [
      ["Type", "KWH"], // Add a new column for colors
      ["No energy", 0.00001], // Use color1 for the first slice
    ];
  }
})


// Functions
const goToSlide = (index) => {
  console.log(index)
  swiperRef.value.slideTo(index);
};

function next() {
  swiperRef.value.slideNext(); // should work
}

function prev() {
  swiperRef.value.slidePrev(); // should work
}

function nextWeek() {
  for (let i = 0; i < 12; i++) {
    swiperRef.value.slideNext(); // should work
  }
}

function prevWeek() {
  for (let i = 0; i < 12; i++) {
    swiperRef.value.slidePrev(); // should work
  }
}

function getRef(swiperInstance) {
  swiperRef.value = swiperInstance;
}

function indexToMonth(index) {
  console.log(index)
  return ["Feb", "Mar", "Apr", `${ useLanguageStore().text.may }`, "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan" ][index];
}

function monthColor(index) {
  // Vår : #8FDBB9 Sommar : #FFD700 höst: #FF4500 Vinter : #ADD8E6 
  return ["#8FDBB9", "#8FDBB9", "#8FDBB9", "#FFD700", "#FFD700", "#FFD700", "#FF4500", "#FF4500", "#FF4500", "#ADD8E6", "#ADD8E6", "#ADD8E6"][index];
}

/* chart*/
const chartData = ref([
  ["Type", "KWH"], // Add a new column for colors
  [`${ useLanguageStore().text.electricalGrid }`, 100], // Use color1 for the first slice
  [`${ useLanguageStore().text.hydrogen }`, 20], // Use color2 for the second slice
  [`${ useLanguageStore().text.battery }`, 20], // Use color3 for the third slice
]);

const chartOptions = ref({
  //    title: "KWH",
  titleTextStyle: { alignment: "center" },
  legend: { position: "labeled" },
  chartArea: {width: '100%', height: '75%'},
  backgroundColor: { fill: "transparent" },
  fontName: "Poppins",
  fontSize: 15,
  height: 180,
  // add kwh to value 
  pieSliceText: "value",
  pieStartAngle: 100,
  // Energy color, Hydrogen color, Battery color
  colors: ["#5f9ea0", "#d9ead3", "#f9dc5c", "#f3b49f", "#f6c7b6"],
});

const chartType = ref("PieChart");

const accuracyData = ref([
  ["Name", "Accuracy"],
  [`${ useLanguageStore().text.accuracy }`, { v: selectedData.accuracy, f: "90%" }],
  ["Rest", { v: 0.1, f: "10%" }],
]);
const accuracyOptions = ref({
  pieHole: 0.85,
  chartArea: { width: "80%", height: "80%" },
  height: 100,
  pieStartAngle: 0,
  pieSliceText: "value",
  backgroundColor: { fill: "transparent" },
  pieSliceTextStyle: {
    color: "black",
  },
  legend: "none",
  pieSliceBorderColor: "transparent",
  slices: {
    0: { color: "green", textStyle: { color: "transparent" } },
    1: { color: "transparent", textStyle: { color: "transparent" } },
  },
});

const accuracyType = ref("PieChart");


</script>

<template>
  <div class="container my-5">
  <!-- {{ monthlyData }} -->

  <swiper
      ref="{swiperRef}"
      :slidesPerView="20"
      :spaceBetween="0"
      :centeredSlides="true"
      :mousewheel="true"
      :pagination="false"
      :modules="modules"
      @slideChange="
        selectedSlide = $event.activeIndex;
        selectedDate = monthlyData[$event.activeIndex].num;
      "
      @swiper="getRef"
      class="mySwiper"
    >

    <template v-for="(data, index) in monthlyData" :key="data.date">
        <!-- if not active then notActiveSlide class -->
        <swiper-slide
          class="mySlide d-flex align-items-end justify-content-center"
          :class="{
            activeSlide: index == selectedSlide,
            notActiveSlide: index != selectedSlide,
          }"
          :id="data"
        >

                  <div
            class="mySlideData d-flex align-items-end justify-content-center rounded"
            :style="{
              backgroundColor: `${monthColor(data.num)}`,
              height: `${data.energyKWh * .06}px`,
            }"
          >
          {{ console.log(monthColor(data.num)) }}
          <!-- <span class="text-muted">{{ data.energyKWh }}</span> -->
          <span class="mySliderDate text-center" style="font-size: .8rem">
            <b>{{ indexToMonth(data.num) }}</b><br>
            {{ new Date(data.date).getFullYear() }}
            </span>

            <p class="mySliderDate text-center">
            </p>
          </div>
        </swiper-slide>
      </template>
    
    </swiper>

    <div class="d-flex w-100 justify-content-center my-2">
      <button @click="prevWeek()" class="append-buttons btn" style="font-size: 1.5rem; z-index: 10;"><<</button>
      <button @click="prev()" class="append-buttons btn" style="font-size: 1.5rem; z-index: 10;"><</button>
      
      <button @click="next()" class="append-buttons btn" style="font-size: 1.5rem; z-index: 10;"
        >></button>
        <button @click="nextWeek()" class="append-buttons btn" style="font-size: 1.5rem; z-index: 10;">
          >>
          </button>
  </div>

    {{ console.log(selectedSlide) }}



  <!-- {{ selectedData }}
  {{ selectedDate }} -->

  <div class="">
      <div class="mainBox mt-1">
        <div class="row w-100 d-flex justify-content-between mx-auto g-4">

          <div
            class="rounded col-md-3 p-3 infoBox d-flex justify-content-center align-content-center"
          >
            <div class="d-flex flex-column justify-content-center align-content-center">
              <p class="w-100 text-center" style="font-size: 1.5rem;">
                ⚡
              </p>
                <p class="w-100 text-center" style="font-size: 1.4rem;">{{ selectedData.energyKWh }}KWH</p>
                {{ useLanguageStore().text.energy }}
            </div>
          </div>


          <div
            class="rounded col-md-3 p-3 infoBox d-flex justify-content-center align-content-center"
          >
            <div class="d-flex flex-column justify-content-center align-content-center">
              <p class="w-100 text-center" style="font-size: 1.5rem;">
              ☀️
              </p>
                <p class="w-100 text-center" style="font-size: 1.4rem;">{{ selectedData.dailysunhours }}h</p>
                {{ useLanguageStore().text.sun }}
            </div>
          </div>


          <div class="rounded col-md-3 px-3 infoBox">
            <p class="card-text text-center accuracyNumber">
              {{ selectedData.accuracy }}%
            </p>
            <GChart
              class="accuracyChart"
              :type="accuracyType"
              :data="accuracyData"
              :options="accuracyOptions"
            ></GChart>
            <p class="text-center mt-1">
              {{ useLanguageStore().text.accuracy }}
            </p>
          </div>

          </div>

          <div class="row mx-auto">
            <div class="col-sm-6 p-2">
              <!-- When all the data is available -->
              <!-- <p class="pieTitle">KWH</p> -->
              <GChart
                class="shareChart"
                :type="chartType"
                :data="chartData"
                :options="chartOptions"
              ></GChart>
            </div>


            <div class="col-md-6 p-5 d-flex flex-column justify-content-center align-items-center">
              <br />
              <!-- From wordpress add text with integrated data -->
              <p class="" style="font-size: 1.5rem"> 
                {{ desciptionFromEnergy(selectedData.energyKWh) }}
              </p>
              <div class="">
                Image
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<style lang="scss">
$main-color: #416661;
$secondary-color: #004140;
$third-color: #343434;
$text-color: #f8f7f6;


.mySwiper {
  height: 18rem;
  cursor: grab;
}

.mySwiper:active {
  cursor: grabbing;
}

.mySwiper::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(0, 0, 0, 0) 20%
  );
  z-index: 10;
  pointer-events: none;
}

.mySwiper::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    -90deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(0, 0, 0, 0) 20%
  );
  z-index: 10;
  /* Dont interact */
  pointer-events: none;
}

.mySlideData {
  min-height: 10%;
  max-height: 13rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  margin-bottom: 3rem;
  width: 100%;
}

/* media width */
@media screen and (max-width: 1150px) {
  .dataTypeSelect {
    width: 100%;
  }

  .dateSelectDaily {
    width: 100%;
  }

  .mySwiper {
    height: 18rem;
  }

  .mySlideData {
    width: 50%;
  }

  .mySliderDate {
    opacity: 0;
  }

  .mySlideData {
    margin-bottom: 1rem;
  }
}

.mySliderDate {
  margin-bottom: -3rem;
  text-wrap: nowrap;
  text-align: center;
}

.mySlide {
  width: 5% !important;
  user-select: none;
}

.activeSlide {
  /* Apply your desired styles to highlight the active slide */
  border-radius: 0.2rem;
}

.notActiveSlide {
  opacity: 0.4;
}


/* Data */

.accuracyNumber {
  font-size: 1.4rem;
  color: green;
  translate: 2px 50px;
  height: 0;
  margin-left: auto;
  margin-right: auto;
}

.accuracyChart {
  margin-left: auto;
  margin-right: auto;
}

.weatherImage {
  width: 3.5rem;
  height: 3.5rem;
  // background-color: $main-color;
}

.infoBox {
  background-color: $text-color;
  min-height: 10rem;
}

.shareChart {
  margin-top: 2rem;
}
</style>
