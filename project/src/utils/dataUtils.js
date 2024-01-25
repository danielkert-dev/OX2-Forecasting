import { monthlyData } from "../components/MonthlyDataComp";

export function processDailyData(weatherData) {
        /* //@ Process 
        - Group irradiance values by day and calculate rounded daily average
      */

        const directNormalIrradiance = weatherData.hourly.direct_normal_irradiance
        const hourlyTime = weatherData.hourly.time
        const dataForDaily = []
      
        let currentDate = null;
        let totalIrradiance = 0;
        let hourCount = 0;
        let day = 0;
      
        for (let i = 0; i < hourlyTime.length ; i++) {
          const time = hourlyTime[i];
          const date = time.split("T")[0];
      
          if (date !== currentDate) {
            // New day, save the average irradiance for the previous day
            if (currentDate !== null) {
              // const sunshine = weatherData.daily.sunshine_duration[day-1]
              // const sunshineHours = Math.floor(sunshine / 3600)
              // const sunshineMinutes = Math.floor((sunshine % 3600) / 60)
              const weather = weatherData.daily.weather_code[day-1]
              const temperature = weatherData.daily.temperature_2m_max[day-1]
  
              dataForDaily.push({
                date: currentDate,
                totalIrradiance: totalIrradiance,
                // sunshine: sunshineHours + "." + sunshineMinutes,
                weather: weather,
                temperature: temperature,
              });
            }
      
            // Reset counters for the new day
            currentDate = date;
            totalIrradiance = 0;
            hourCount = 0;
            day++;
          }
      
          // Accumulate irradiance for the current day
          totalIrradiance += directNormalIrradiance[i];
          hourCount++;
        }
      
        // Add the last day's average irradiance
        if (currentDate !== null) {
          dataForDaily.push({
            date: currentDate,
            totalIrradiance: totalIrradiance,
          });
        }
  
        if (dataForDaily && Array.isArray(dataForDaily)) {
          // Solar Irradence = Direct Normal Irradiance
          const panelArea = 56;
          const panelEfficiency = 0.35;
      
          // Calculate energy for each day using the formula
          let completeData = dataForDaily.map(day => {
            const energy = day.totalIrradiance * panelArea * panelEfficiency;
            // If before today then past if after today then future if today then current
            const age =
              day.date > new Date().toISOString().slice(0, 10)
                ? "future"
                : day.date === new Date().toISOString().slice(0, 10)
                ? "current"
                : "past";
    
    
            let accuracy = 100;
            if (age === 'current') {
              accuracy = 95;
            }
            if (age === 'past') {
              accuracy = 100;
            }
            if (age === 'future') {
              accuracy = 90;
            }
    
            return {
              date: day.date,
              energyW: energy.toFixed(2),
              energyKWh: (energy / 1000).toFixed(2),
              weather: day.weather,
              temperature: day.temperature,
              sunshine: day.sunshine,
              age: age,
              accuracy: accuracy,
            };
          });
    
          // remove last data completeData
          completeData.pop();
    
          // console.log(completeData);
          return completeData;
  }
}

export function processHourlyData(weatherDayData) {

  const directNormalIrradiance = weatherDayData.hourly.direct_normal_irradiance
  const hourlyTime = weatherDayData.hourly.time
  const weather = weatherDayData.hourly.weather_code
  const temperature = weatherDayData.hourly.temperature_2m
  const accuracy = 95;

  const panelArea = 56;
  const panelEfficiency = 0.35;

  let completeData = []

  for (let i = 0; i < hourlyTime.length ; i++) {
    const energy = directNormalIrradiance[i] * panelArea * panelEfficiency;

    completeData.push({
      date: hourlyTime[i],
      energyW: energy.toFixed(2),
      energyKWh: (energy / 1000).toFixed(2),
      weather: weather[i],
      temperature: temperature[i],
      accuracy: accuracy,
    })

  }

  // remove hours before this current hour
  const currentHour = new Date().getHours()

  completeData = completeData.slice(currentHour)
  // completeData 
  console.log(completeData)


  // console.log(completeData)
  return completeData


  // return {
  //   date: day.date,
  //   energyW: energy.toFixed(2),
  //   energyKWh: (energy / 1000).toFixed(2),
  //   weather: day.weather,
  //   temperature: day.temperature,
  //   sunshine: day.sunshine,
  //   age: age,
  //   accuracy: accuracy,
  // };


}

export function processMonthlyData() {
  /* 
  date: january,
  energyKWh: 100kwh,
  weather: sunny,
  sunsgine: ?,
  age: past||current||future,
  accuracy: accuracy,
  */
  const data = monthlyData
  return data

}


export function processYearlyData(weatherData) {

  // console.log('pr')

  return weatherData
}