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
<<<<<<< HEAD
    start(5,00);
=======
    start(0,3);
>>>>>>> 59601d6e285eb3ea04cd4706734b5354e889c745
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
<<<<<<< HEAD
    start(15,00);
=======
    start(0,5);
>>>>>>> 59601d6e285eb3ea04cd4706734b5354e889c745
}

function startTimer(){
    document.getElementById("start-btn").style.display = 'none';
    document.getElementById("button-container").style.paddingLeft = '150px';
<<<<<<< HEAD
    start(25,00);
=======
    start(0,3);
>>>>>>> 59601d6e285eb3ea04cd4706734b5354e889c745
}