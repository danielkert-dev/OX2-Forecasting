import { useLanguageStore } from "../stores/LanguageStore";


export function desciptionFromEnergy(energy) {

    if (energy < 0.5) {
        return "No energy"
    }

    if (energy < 2.5) {
        let pots = energy / 0.2;
        pots = Math.round((pots + Number.EPSILON)*100)/100;
        return useLanguageStore().text.produce + pots + useLanguageStore().text.coffe + "<br>☕"
    }

    if (energy < 10) {
        let hours = energy / 1.5;
        hours = Math.round((hours + Number.EPSILON)*100)/100;
        return useLanguageStore().text.microwave + hours + useLanguageStore().text.hours + "<br>🍳"
    }

    // if (energy < 10) {
    //     let kettles = energy / 2.5;
    //     kettles = Math.round((kettles + Number.EPSILON)*100)/100;
    //     return useLanguageStore().text.kettle + kettles + useLanguageStore().text.hours + ""
    // }

    if (energy < 100) {
        let km = energy / 5.7;
        km = Math.round((km + Number.EPSILON)*100)/100;
        return useLanguageStore().text.tesla + km + " km <br>🚗"
    }

    if (energy > 100) {
        let houses = energy / 35;
        houses = Math.round((houses + Number.EPSILON)*100)/100;
        return useLanguageStore().text.household + houses + useLanguageStore().text.days + "<br>🏚️"
    }
}


// <div id="daily">

//     <div id="daily-energy-en">Energy Production</div>
//     <div id="daily-energy-sv">Energiproduktion</div>

// </div>

// <div id="monthly">

// </div>