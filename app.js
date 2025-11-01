let gameSeq = [];
let userSeq = [];

let btns = ["yellow","red","purple","green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function() {
    if (started == false) {
        console.log("game is started");
        started = true;

        levelup();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    },250);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    },250);
}

function levelup(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    
    let randIdx = Math.floor(Math.random() * 3);
    let randcolor = btns[randIdx];   
    let randBtn = document.querySelector(`.${randcolor}`);
   // console.log(randIdx);
    //console.log(randcolor);
    //console.log(randBtn);
    gameSeq.push(randcolor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(indx) {
    //console.log("curr level: ", level);
    let idx = level-1;

    if (userSeq[indx] === gameSeq[indx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelup, 1000);
        }

        //console.log("same value");
    } else {
        h2.innerHTML = `Game over! Your Score was <b> ${level}<b/> <br/>press any key.`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor="white";
        }, 150);
        reset();
    }
}

function btnpress(){
    //console.log(this);
    let btn = this;
    userflash(btn);

    usercolor = btn.getAttribute("id");
    //console.log(usercolor);
    userSeq.push(usercolor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnpress);
}

function reset() {
    started = false
    gameSeq = [];
    userSeq = [];
    level = 0;
}