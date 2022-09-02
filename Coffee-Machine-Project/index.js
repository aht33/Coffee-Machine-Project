const prompt = require('prompt-sync') ({sigint: true});

const multiLinePrompt = ask => {
    const lines = ask.split(/\r?\n/);
    const promptLine = lines.pop();
    console.log(lines.join('\n'));
    return prompt(promptLine);
};

let currentWater = 400, currentMilk = 540,
    currentCoffeeBeans = 120, currentCups = 9,
    currentDollars = 550;

let checkSupplies = {
    espresso:{
        water:250,
        beans:16,
        cups:1
    },
    latte:{
        water:350,
        milk:75,
        beans:20,
        cups:1
    },
    cappuccino:{
        water:200,
        milk:100,
        beans:12,
        cups:1
    }
}
function noWater() {
    console.log(`Sorry, not enough water!`);
}

function noMilk() {
    console.log(`Sorry, not enough milk!`);
}

function noBeans() {
    console.log(`Sorry, not enough coffee beans!`);
}

function noCups() {
    console.log(`Sorry, not enough cups!`);
}

function resourceDialogEspresso() {
    if(currentWater < checkSupplies.espresso.water) {
        noWater();
        coffeeMachine();
    } else if(currentCoffeeBeans < checkSupplies.espresso.beans) {
        noBeans();
        coffeeMachine();
    } else if(currentCups < checkSupplies.espresso.cups) {
        noCups();
        coffeeMachine();
    } else {
        console.log(`We have enough resources to make you an espresso!`);
    }
}

function resourceDialogLatte() {
    if(currentWater < checkSupplies.latte.water) {
        noWater();
        coffeeMachine();
    } else if(currentMilk < checkSupplies.latte.milk) {
        noMilk();
        coffeeMachine();
    } else if(currentCoffeeBeans < checkSupplies.latte.beans) {
        noBeans();
        coffeeMachine();
    } else if(currentCups < checkSupplies.latte.cups) {
        noCups();
        coffeeMachine();
    } else {
        console.log(`We have enough resources to make you a latte!`);
    }
}

function resourceDialogCappuccino() {
    if(currentWater < checkSupplies.cappuccino.water) {
        noWater();
        coffeeMachine();
    } else if(currentMilk < checkSupplies.cappuccino.milk) {
        noMilk();
        coffeeMachine();
    } else if(currentCoffeeBeans < checkSupplies.cappuccino.beans) {
        noBeans();
        coffeeMachine();
    } else if(currentCups < checkSupplies.cappuccino.cups) {
        noCups();
        coffeeMachine();
    } else {
        console.log(`We have enough resources to make you a cappuccino!`);
    }
}


let currentIce = 50;

let iceNeeded = [2, 4, 6];

let iceChosen = () => {
    let iceOption =
        Number(multiLinePrompt(`How much ice would you like? 1 - No Ice, 2 - Light (2 cubes), 3 - Regular (4 cubes), 4 - Heavy (6 cubes)
`));
    if (Number(iceOption) === 1) {
        console.log(`Okay, no ice!`);
    } else if(Number(iceOption) === 2 && currentIce >= 2) {
        currentIce -= 2;
    } else if(Number(iceOption) === 3 && currentIce >= 4) {
        currentIce -= 4;
    } else if(Number(iceOption) === 4 && currentIce >= 6) {
        currentIce -= 6;
    } else if((Number(iceOption) === 2 || Number(iceOption) === 3 || Number(iceOption) === 4) && currentIce < iceNeeded[iceOption - 2]) {
        console.log(`Not enough ice cubes! We only have ${currentIce}`);
        iceChosen();
    } else {
        console.log(`Pick an appropriate option!`);
        iceChosen();
    }
}

let remaining = () => {
    console.log(`The coffee machine has:
${currentWater} ml of water
${currentMilk} ml of milk
${currentCoffeeBeans} g of coffee beans
${currentCups} disposable cups
${currentIce} ice cubes
$${currentDollars} of money
`);
    coffeeMachine();
}

let coffeeMachine = () => {
    let choice = multiLinePrompt(`Write action (buy, fill, take, remaining, exit):
  `);
    if (choice === "buy") {
        let buyChoice = multiLinePrompt(`What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu
`);
        if(Number(buyChoice) === 1){
            resourceDialogEspresso();
            iceChosen();
            console.log(`An espresso is on the way!`);
            currentWater -= 250;
            currentCoffeeBeans -= 16;
            currentDollars += 4;
            currentCups -= 1;
            coffeeMachine();
        } else if(Number(buyChoice) === 2){
            resourceDialogLatte();
            iceChosen();
            console.log(`A latte is on the way!`);
            currentWater -= 350;
            currentMilk -= 75;
            currentCoffeeBeans -= 20;
            currentCups -= 1;
            currentDollars += 7;
            coffeeMachine();
        } else if(Number(buyChoice) === 3){
            resourceDialogCappuccino();
            iceChosen();
            console.log(`A cappuccino is on the way!`);
            currentWater -= 200;
            currentMilk -= 100;
            currentCoffeeBeans -= 12;
            currentDollars += 6;
            currentCups -= 1;
            coffeeMachine();
        } else if(buyChoice === 'back') {
            coffeeMachine();
        } else {
            console.log(`Please enter an appropriate choice.`);
            coffeeMachine();
        }
    } else if(choice === "fill") {
        let addedWater = multiLinePrompt(`Write how many ml of water you want to add: `);
        let addedMilk = multiLinePrompt(`Write how many ml of milk you want to add: `);
        let addedCoffeeBeans = multiLinePrompt(`Write how many grams of coffee beans you want to add: `);
        let addedCups = multiLinePrompt(`Write how many disposable cups of coffee you want to add: `);
        currentWater += Number(addedWater);
        currentMilk += Number(addedMilk);
        currentCoffeeBeans += Number(addedCoffeeBeans);
        currentCups += Number(addedCups);
        coffeeMachine();
    } else if(choice === "take") {
        console.log(`I gave you $${currentDollars}`);
        currentDollars = 0;
        coffeeMachine();
    } else if(choice === `remaining`) {
        remaining();
    } else if(choice === "exit") {
        console.log(`exit`);
    } else {
        console.log(`Please enter an appropriate action.`);
    }
}

coffeeMachine();