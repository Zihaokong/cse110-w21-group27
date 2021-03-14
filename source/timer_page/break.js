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
    resetProgressRing();
    document.getElementById("distraction-btn").innerHTML = "Distraction : " + distractCounter;
    document.getElementById("title_timer").innerHTML = "01:00" + "- Time To Work!";
    document.getElementById('minutes').innerHTML = '01';
    document.getElementById('seconds').innerHTML = '00';
    document.getElementById('currTask').innerHTML = allTasks[currentTaskId].name;
    //start(0, 3);
    //window.location.reload();
}

function changeTask() {
    document.getElementById('breakCompleteModal').style.display = 'none';
    window.location.href = "../index.html";
}

function displayShortBreak() {
    let audio1 = new Audio("../../media/work-tune.mp3");
    audio1.play();
    setTimeout(function(){
        resetProgressRing();
        document.body.style.backgroundImage = 'linear-gradient(to right,#74EBD5,#ACB6E5)';
        document.getElementById('minutes').innerHTML = '01';
        document.getElementById('seconds').innerHTML = '00';
        document.getElementById("currTask").innerHTML = "Short Break";
        document.getElementById("button-container").style.display = 'none';
        document.getElementById("container-short").style.display = 'block';
        //window.location.reload(); 
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
        resetProgressRing();
        document.body.style.backgroundImage = 'linear-gradient(to right,#ACB6E5,#74EBD5)';
        document.getElementById('minutes').innerHTML = '01';
        document.getElementById('seconds').innerHTML = '00';
        document.getElementById("currTask").innerHTML = "Long Break";
        document.getElementById("button-container").style.display = 'none';
        document.getElementById("container-long").style.display = 'block';
        //window.location.reload(); 
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