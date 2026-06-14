//welcome sheriff, here's how to nab a bandit
//the bandit has just robbed the general store, and in order to catch him lady luck must side with you
//global variables track the results of your chase
let successes = 0;
let failures = 0;

//the bandit has a head start, but isn't from around here
// catching up to him requires a 3+
const target = 3;

//this is the button pressed to play the game
function catchbandit(){

    //primes for luck modifier
    let luck = checkluck();

    //checks and displays luck results, backtick and interpolation used to simplifiy strings
    document.getElementById("destiny").innerHTML =
    `<b>Test your Luck: ${luck.text}</b>`;

    //2.5 second delay added for suspense, activates the full resolution of dice rolls
    setTimeout(() => {
        resolvegrit(luck.mod);
    }, 2500); 
}

//theres always more bandits to catch
// this is the button to reset the game
function town(){
        successes = 0;
        failures = 0;

        document.getElementById("destiny").innerHTML = "Another bandit is causing trouble!";
}

//the main die roll for whether you catch up to the bandit or not
//function chooses a random number, maximum increased to 6 and minimum raised to 1
function rollgrit(){
    return Math.floor(Math.random() * 6) + 1;
}

//while chasing the bandit, luck may or may not be on your side
function checkluck(){

    let roll = Math.floor(Math.random()*6) + 1;

    //=== used to ensure numbers stay numbers
    //if the sheriff is unlucky, the desert heat will tire his horse more than usual
    //if a 1 is rolled on the luck die, a -1 penalty is applied to the main roll
    if (roll === 1){
        return {mod: -1, text: "Your horse is getting tired! (-1)"};
    }

    //the bandit doesn't know this land well, he might slip up
    //if a 6 is rolled on the luck die, a +1 bonus is applied to the main roll
    if (roll === 6){
        return {mod: +1, text: "He took a wrong turn! (+1)"};
    }

    //normalcy, no modifers
    return {mod: 0, text: "The chase continues!"};
}

function resolvegrit(modifier){

    //sets the main die roll
    let roll = rollgrit();
    //sets the main die to be modified by the luck die
    let total = roll + modifier;

    //sets combined result
    let news = `Roll: ${roll} + ${modifier} = ${total}<br>`

    //if the combined result is more than 3...
    if (total >= target){
        //the success tracker increases by 1
        successes++;
        news += "<b>You're gaining on him!</b>";
    }

    //if not...
    else {
        //the failure tracker increases by 1
        failures++;
        news += "<b>He's losing you!</b>"
    }

    //sets conclusion display for user
    let roundup = checkroundup();

    //prints result to console
    console.log("checkroundup: " + checkroundup())

    //html fetches result
    document.getElementById("destiny").innerHTML = 
    //global variables displayed next to their targets ie 2/5
    news + `<br><br>` + `Successes: ${successes}/5<br>Failures: ${failures}/3` +
    //breaks added for visual appeal
    (roundup ? `<br><br><b>${roundup}</b>` : "");
}

//checks how effective your chase is
function checkroundup(){
        //the bandit had a head start, so you have some catching up to do
        //5 sucesses required to win
        if (successes >= 5){
            return "You got him! Well done Sheriff!";
        }

        //3 failures required to lose
        if (failures >= 3){
            return "The bandit got away!";
        }

        return "";
}