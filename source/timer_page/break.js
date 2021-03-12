function displayBreakComplete() {
    let audio = new Audio("../../media/break-tune.mp3");
    audio.play();
    document.getElementById('breakCompleteModal').style.display = 'block';
}

function continueTask() {
    document.getElementById('breakCompleteModal').style.display = 'none';
    document.body.style.backgroundImage = 'linear-gradient(to right,#E0EAFC,#CFDEF3)';
    document.getElementById("currTask").innerHTML = "Task";
    document.getElementById("button-container").style.display = 'flex';
    document.getElementById("start-btn").style.display = 'block';
    document.getElementById("button-container").style.paddingLeft = '0px';
    //start(0, 3);
    window.location.reload();
}

function changeTask() {
    document.getElementById('breakCompleteModal').style.display = 'none';
    window.location.href = "../index.html";
}

function displayShortBreak() {
    let audio1 = new Audio("../../media/work-tune.mp3");
    audio1.play();
    setTimeout(function(){ 
        window.location.reload(); 
    }, 2000);
}

function startShortBreak(){
    document.getElementById("container-short").style.display = 'none';
    start(0,3);
}

function displayLongBreak() {
    let audio2 = new Audio("../../media/work-tune.mp3");
    audio2.play();
    setTimeout(function(){ 
        window.location.reload(); 
    }, 2000);
}

function startLongBreak() {
    document.getElementById("container-long").style.display = 'none';
    start(0,5);
}

function startTimer(){
    document.getElementById("start-btn").style.display = 'none';
    document.getElementById("button-container").style.paddingLeft = '150px';
    start(0,3);
}