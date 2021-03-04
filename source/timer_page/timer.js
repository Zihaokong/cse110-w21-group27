// number of distraction tracked
let distractCounter = 0;

// let isPomo = false;


let currentTaskId;
let allTasks;

window.onload = function template() {
    // set variable denote current timer mode
    //localStorage.setItem('isPomo', 'false');
    // render current task name to timer page
    const id = JSON.parse(localStorage.getItem('currentTask'));
    allTasks = JSON.parse(localStorage.getItem('allTasks'));
    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i].id === id) {
            currentTaskId = i;
            document.getElementById('currTask').innerHTML =
                allTasks[currentTaskId].name;
        }
    }
    if(localStorage.getItem('ShortBreak') == 'true'){
        document.getElementById('shortBreakModal').style.display = 'none';
        document.body.style.backgroundImage = 'linear-gradient(to right,#74EBD5,#ACB6E5)';
        document.getElementById("currTask").innerHTML = "Short Break";
        document.getElementById("button-container").style.display = 'none';
        start(0, 3);
    }
    else if(localStorage.getItem('LongBreak') == 'true'){
        document.getElementById('longBreakModal').style.display = 'none';
        document.body.style.backgroundImage = 'linear-gradient(to right,#ACB6E5,#74EBD5)';
        document.getElementById("currTask").innerHTML = "Long Break";
        document.getElementById("button-container").style.display = 'none';
        start(0, 5);
    }
    else{
        localStorage.setItem('isPomo', 'false');
        document.getElementById('minutes').innerHTML = '01';
        document.getElementById('seconds').innerHTML = '00';
        document.getElementById("distraction-btn").innerHTML = "Distraction : " + distractCounter;
        document.getElementById("title_timer").innerHTML = "01:00" + "- Time To Work!";
        start(0, 3);
    }
    // render starting value of timer
    
};

/**
 * Set a timer that count down for 60 second.
 * @param {integer} minutes minute of timer
 * @param {integer} seconds second of timer
 */

function start(minutes, seconds) {
    localStorage.setItem('ShortBreak','false');
    localStorage.setItem('LongBreak','false');


    // display correct distraction counter 
    distractCounter = 0;
    document.getElementById("distraction-btn").innerHTML = "Distraction : " + distractCounter;
    let secs = 0;
    let totalsecs = (minutes + 1) * 60;
    //var progress_ring_interval = setInterval(updateProgressRing, 10);
    if (minutes < 10) {
        document.getElementById("minutes").innerHTML = "0" + minutes;
    } else {
        document.getElementById("minutes").innerHTML = minutes;
    }
    if (seconds < 10) {
        document.getElementById("seconds").innerHTML = "0" + seconds;
        document.getElementById("title_timer").innerHTML = minutes + ":0" + seconds + "- Time To Work!";
    } else {
        document.getElementById("seconds").innerHTML = seconds;
        document.getElementById("title_timer").innerHTML = minutes + ":" + seconds + "- Time To Work!";
    }

    var minutes_interval = setInterval(minutesTimer, 60000);
    var seconds_interval = setInterval(secondsTimer, 1000);
    secs = secs + 1;
    perc = 100 - (((totalsecs - secs) / totalsecs) * 100);
    setProgress(perc);

    /*function updateProgressRing(){
        secs = secs + 1;
        perc = 100-(((totalsecs - secs)/totalsecs)*100);
        setProgress(perc);
        console.log("123");
    }*/

    function minutesTimer() {
        minutes = minutes - 1;
        if (minutes < 10) {
            document.getElementById("minutes").innerHTML = "0" + minutes;
        } else {
            document.getElementById("minutes").innerHTML = minutes;
        }
    }

    function secondsTimer() {
        seconds = seconds - 1;
        secs = secs + 1;
        perc = 100 - (((totalsecs - secs) / totalsecs) * 100);
        setProgress(perc);
        if (seconds < 10) {
            document.getElementById("seconds").innerHTML = "0" + seconds;
            document.getElementById("title_timer").innerHTML = minutes + ":0" + seconds + "- Time To Work!";
            if (seconds == 0) {
                if (minutes <= 0) {
                    clearInterval(minutes_interval);
                    clearInterval(seconds_interval);
                    resetProgressRing();
                    let counter = Number(localStorage.getItem('sessionCounter'));
                    counter = counter + 1;
                    console.log(counter)
                    let pomo = localStorage.getItem('isPomo');
                    console.log(pomo);
                    if (pomo == 'true') {
                        localStorage.setItem('isPomo', 'false');
                        displayBreakComplete();
                    } else {
                        localStorage.setItem('isPomo', 'true');
                        if (counter%4 == 0) {
                            localStorage.setItem('sessionCounter', counter);
                            localStorage.setItem('LongBreak', 'true');
                            displayLongBreak();
                        } else {
                            localStorage.setItem('sessionCounter', counter);
                            localStorage.setItem('ShortBreak', 'true');
                            displayShortBreak();
                        }

                        // update progress for current task
                        allTasks[currentTaskId].current += 1;
                        localStorage.setItem('allTasks', JSON.stringify(allTasks));
                    }
                }
                seconds = 60;
            }
        } else {
            document.getElementById("seconds").innerHTML = seconds;
            document.getElementById("title_timer").innerHTML = minutes + ":" + seconds + "- Time To Work!";
        }

    }
}

function distractionCount() {
    distractCounter = distractCounter + 1;
    document.getElementById("distraction-btn").innerHTML = "Distraction : " + distractCounter;
}

function displayFailModal() {
    document.getElementById("failModal").style.display = 'block';
}

function failSession() {
    document.getElementById("failModal").style.display = 'none';
    window.location.href = "../index.html";
}

function quitFailModal() {
    document.getElementById("failModal").style.display = 'none';
}