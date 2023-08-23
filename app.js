// values for the info box
const popValue = document.getElementById('population');
const acresAmount = document.getElementById('acres'); 
const grainAmount = document.getElementById('grain');
const acrePrice = document.getElementById('acreValue');

// internal values
let population = 100;
let acres = 1000;
let grain = 2800;
let acreValue = 20;
let fed = 0;
let planted = 0;
// calculate a random value for the acre
calculateAcreValue = () => {
    return Math.floor(Math.random() * (25 - 17) + 17);
}

// calculate a modifier for the population
calculatePopulationModifier = () => {
    return Math.floor(Math.random() * (2 - 1) + 1);
}

// calculate a random value for the harvest
calculateHarvestModifier = () => {
    return Math.floor(Math.random() * (6) + 2);
}

// get user input
const inputValue = document.getElementById('inputBox');

// get buttons
const buyButton = document.getElementById('buy');
const sellButton = document.getElementById('sell');
const feedButton = document.getElementById('feed');
const plantButton = document.getElementById('plant');
const endTurn = document.getElementById('end');

function updateInfo() {
    popValue.innerHTML = population;
    acresAmount.innerHTML = acres;
    grainAmount.innerHTML = grain;
    acrePrice.innerHTML = acreValue;
    document.getElementById('inputBox').value = '';

}

function buy(inputValue, acreValue) {
    if (Number(inputValue) * acreValue > grain) {
        updateTextArea('You do not have enough grain to buy that much land');
    }
    if (inputValue * acreValue <= grain) {
        console.log(grain);
        grain -= Number(inputValue) * acreValue;
        console.log(grain);
        acres += Number(inputValue);
        updateTextArea(`You bought ${inputValue} acres for ${inputValue * acreValue} bushels of grain`);
    }
    updateInfo();
}

function sell(inputValue, acreValue) {
    if (inputValue > acres) {
        updateTextArea('You do not have enough land to sell');
    }
    if (inputValue <= acres) {
        grain += Number(inputValue) * acreValue;
        acres -= Number(inputValue);
        updateTextArea(`You sold ${inputValue} acres for ${inputValue * acreValue} bushels of grain`);
    }
    updateInfo();
}

// abstract this out a bit more for plagues, rats, and major events.

function calculatePopulationChange(fed) {
    var lessPopulation = population;
    if ((fed / 3) < lessPopulation) {
        var lostPopulation = lessPopulation - Math.trunc(((fed / 3) / calculatePopulationModifier()));
        population -= lostPopulation;
        updateTextArea(`You lost ${lostPopulation} people, your population is unhappy.`);
    }
    var equalPopulation
    if ((fed / 3) == equalPopulation) {
        updateTextArea('Your population is unchanged, but complacent.');
    }
    var morePopulation = population;
    if ((fed / 3) > morePopulation) {
        var addedPopulation = Math.trunc((fed - morePopulation) / (4 * calculatePopulationModifier()));
        population += addedPopulation;
        updateTextArea(`You gained ${addedPopulation} people, your population is happy.`);
    }
    updateInfo();
}

function calculateHarvest(planted) {
    var addedGrain = planted * calculateHarvestModifier();
    if (planted > acres) {
        updateTextArea('You do not have enough land to plant that much grain');
    }
    if (planted <= acres) {
        grain += addedGrain;
        updateTextArea(`You harvested ${addedGrain} bushels of grain`);
        addedGrain = 0;
    }    
    plantButton.removeEventListener('click', plant);
    acreValue = calculateAcreValue();
    updateInfo();
}

buyButton.addEventListener('click', () => {
    buy(inputValue.value, acreValue, grain);
});

sellButton.addEventListener('click', () => {
    sell(inputValue.value, acreValue, grain);
});

function feed(inputValue) {
    if (inputValue > grain) {
        updateTextArea('You do not offer enough grain to feed your people');
    }
    if (inputValue <= grain) {
        grain -= Number(inputValue);
        fed = Number(inputValue);
        updateTextArea(`You fed ${inputValue} bushels of grain to your people`);
    }
    updateInfo();
}

feedButton.addEventListener('click', () => {
    feed(inputValue.value, grain);
});

function plant(inputValue) {
    if ((inputValue * 3) > grain && inputValue <= (population * 10)) {
        updateTextArea('You do not have enough grain to plant that much land, but you have enough people.');
    }
    if ((inputValue * 3) <= grain && inputValue <= (population * 10)) {
        grain -= (Number(inputValue) * 3);
        planted = Number(inputValue);
        updateTextArea(`You planted ${inputValue} acres with grain.`);
    }
    if ((inputValue * 3) <= grain && inputValue > (population * 10)) {
        updateTextArea('You have the grain, but you do not have enough people to plant that much land.');
    }
    if ((inputValue * 3) > grain && inputValue > (population * 10)) {
        updateTextArea('You do not have enough grain or people to plant that much land.');
    }
    updateInfo();
}

plantButton.addEventListener('click', () => {
    if (inputValue.value > acres) {
        updateTextArea('You do not have enough land to plant that much grain');
    }
    if (inputValue.value <= acres ) {
        plant(inputValue.value, grain);
    }
});

endTurn.addEventListener('click', () => {
    
        calculateHarvest(planted);
    
        calculatePopulationChange(fed);
    
    fed = 0;
    planted = 0;
});

updateInfo();

