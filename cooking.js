//by FAR the most fun i've had learning to code
//the disproportionate level of amusement i got seeing this cat doing his little animation is nuts
//i learned a lot

//setting variables for use in functions

//img position
let position = 0;
//img rotation
let catrotate = 0;
//img vertical axis orientation
let catflip = 0;
//animation speed
let movetime = 0;
//number of movements executed
let movecount = 0;
//number of wiggles executed
let wigglecount = 0;
//current step of the wiggle progress
let wigglestep = "right";
//current major function
let cookstep = 0;
//sequence of major functions executed by start button
let cookshow = [moverlong, wiggler, flipr, movellong, wigglel, flipl, moverlong];

//cooking audio
let crowd = document.getElementById("crowd");
let sizzle = document.getElementById("sizzle");
let cheer = document.getElementById("cheer");

//double spacing used between functions, they started to blur together


//adjusts speed between animation resolutions
function setspeed(ms){
    clearInterval(movetime);
    movetime = setInterval(cookrun, ms);
}


//triggered by start button
function cookstart(){
    //flips button abilities
    document.getElementById("cooky").disabled = true;
    document.getElementById("cookn").disabled = false;

    //background music
    crowd.play();
    //begins major function cycle at designated speed
    movetime = setInterval(cookrun, 200);
}


//resets all variables
function cookstop(){
    clearInterval(movetime);
    cookstep = 0;
    position = 0;
    catflip = 0;
    catrotate = 0;
    wigglestep = "right";
    wigglecount = 0;
    movecount = 0;
    movecat();

    //flips button abilities
    document.getElementById("cooky").disabled = false
    document.getElementById("cookn").disabled = true
}


//resolves img location and orientation changes, figuring out the order for these was a headache
function movecat(){
    document.getElementById("catrice").style.transform = 
    `translateX(${position}px) rotateY(${catflip}deg) rotate(${catrotate}deg)`;

}


//proceeds through major functions
function cookrun(){
    //stops and resets once all major functions executed
    if(cookstep >=cookshow.length){
        cookstop();
        return;
    }

    //executes current major function
    cookshow[cookstep]();
}


//every movement function is twinned, please assume same comments for the twin with inverted orientations

//wiggle functions perform rapid lateral movements back and forth to simulate pan tossing
function wiggler(){
    //executed slower to better see individual movements
    setspeed(400);
    if(wigglestep === "right"){
        //originally only one execution, additionals added to compensate for decreased movement distance
       for(let w = 0; w < 5; w++){
            sizzle.play();
            mover();
        }
        wigglecount++;
        wigglestep = "left";
    }

    //alternates between left and right movement
    else if(wigglestep === "left"){
        for(let w = 0; w < 5; w++){
            sizzle.play();
            movel();
        }
        wigglecount++;
        wigglestep = "right";
    }
    
    //once enough pan tosses are perform, moves to next major function
    if(wigglecount >= 6){
        wigglecount = 0;
        cookstep++;
    }
}


//reoeated move(r/l) executions collapsed into for loops
function wigglel(){
    setspeed(400);
    if(wigglestep === "left"){
        for(let w = 0; w < 5; w++){
            sizzle.play();
            movel();
        }
        wigglecount++;
        wigglestep = "right";
    }

    else if(wigglestep === "right"){
        for(let w = 0; w < 5; w++){
            sizzle.play();
            mover();
        }
        wigglecount++;
        wigglestep = "left";
    }

    if(wigglecount >= 6){
        wigglecount = 0;
        cookstep++;
    }
}


//after pan tossing, the pan is literally tossed
function flipr(){
    //adjusts rotation
    if(catrotate === 0 && catflip === 0){
        catrotate = -30;
        movecat();
    }

    //adjusts vertical orientation
    else if(catrotate === -30 && catflip === 0){
        catflip = 180;
        movecat();
    }
    
    //resets rotation
    else if(catrotate === -30 && catflip === 180){
        catrotate = 0;
        movecat();
        cheer.play();
    }

    //returns to starting position, proceeds to next major function
    else if( catrotate === 0 && catflip === 180){
        catflip = 0;
        movecat();
        cookstep++;
    }
}


function flipl(){
    if(catrotate === 0 && catflip === 180){
        catrotate = -30;
        movecat();
    }

    else if(catrotate === -30 && catflip === 180){
        catflip = 0;
        movecat();
    }
    
    else if(catrotate === -30 && catflip === 0){
        catrotate = 0;
        movecat();
        cheer.play();
    }     

    else if(catrotate === 0 && catflip === 0){
        catflip = 180;
        movecat();
        cookstep++;
    }
}


//move(r/l) is base img x axis position changer
function mover(){
    //ditance minimized for fluid movement
    position +=1;
    movecat();
}


//move(r/l)long is major function dictating use of small moves
function moverlong(){
    //flips img on y axis to face direction about to move
    if(catflip === 180){
        catflip = 0;
        movecat();
    }
    //speed increased for fluid movement
    setspeed(10);
    mover();
    movecount++;

    //alloted movement before next major function
    if(movecount >= 500){
        movecount = 0;
        cookstep++;
    }    
}


function movel(){
    position -=1;
    movecat();
}


function movellong(){
    if(catflip === 0){
        catflip = 180;
        movecat();
    }
    setspeed(10);
    movel();
    movecount++;

    //double the distance of counterpart so that img can move from center to right, right to left, then left back to center
    if(movecount >= 1000){
        movecount = 0;
        cookstep++;
    }
}