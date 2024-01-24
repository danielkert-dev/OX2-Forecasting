export function desciptionFromEnergy(energy) {

    if (energy < 0.5) {
        return "No energy"
    }

    if (energy < 2.5) {
        let pots = energy / 0.2;
        pots = Math.round((pots + Number.EPSILON)*100)/100;
        return "Can produce " + pots + " pots of coffe"
    }

    if (energy < 5) {
        let hours = energy / 1.5;
        hours = Math.round((hours + Number.EPSILON)*100)/100;
        return "Can power a microwave for " + hours + " hours"
    }

    if (energy < 10) {
        let kettles = energy / 2.5;
        kettles = Math.round((kettles + Number.EPSILON)*100)/100;
        return "Can power a kettle for " + kettles + " hours"
    }

    if (energy < 100) {
        let km = energy / 5.7;
        km = Math.round((km + Number.EPSILON)*100)/100;
        return "Can drive a tesla for " + km + " km"
    }

    if (energy > 100) {
        let houses = energy / 35;
        houses = Math.round((houses + Number.EPSILON)*100)/100;
        return "Can power "+ houses +" houses for one day"
    }
}


// <div id="daily">

//     <div id="daily-energy-en">Energy Production</div>
//     <div id="daily-energy-sv">Energiproduktion</div>

// </div>

// <div id="monthly">

// </div>