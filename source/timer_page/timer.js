let distractCounter = 0;
let isPomo = false;
localStorage.setItem('isPomo', 'false');

function template(){
    
    document.getElementById("minutes").innerHTML = "01";
    document.getElementById("seconds").innerHTML = "00";
    document.getElementById("distraction-btn").innerHTML = "Distraction : " + distractCounter;
    document.getElementById("title_timer").innerHTML = "01:00" + "- Time To Work!";
    //setTimeout(function(){ start(0, 59); }, 1000);
    start(0,59);
}

function start(minutes, seconds){
    distractCounter = 0;
    document.getElementById("distraction-btn").innerHTML = "Distraction : " + distractCounter;
    let secs = 0;
    let totalsecs = (minutes+1) * 60;
    //var progress_ring_interval = setInterval(updateProgressRing, 10);
    if(minutes<10){
        document.getElementById("minutes").innerHTML = "0"+minutes;
    }
    else{
        document.getElementById("minutes").innerHTML = minutes;
    }
    if(seconds < 10){
        document.getElementById("seconds").innerHTML = "0"+seconds;
        document.getElementById("title_timer").innerHTML = minutes + ":0" + seconds + "- Time To Work!";
    }
    else{
        document.getElementById("seconds").innerHTML = seconds;
        document.getElementById("title_timer").innerHTML = minutes + ":" + seconds + "- Time To Work!";
    }

    var minutes_interval = setInterval(minutesTimer, 60000);
    var seconds_interval = setInterval(secondsTimer, 1000);
    secs = secs + 1;
    perc = 100-(((totalsecs - secs)/totalsecs)*100);
    setProgress(perc);

    /*function updateProgressRing(){
        secs = secs + 1;
        perc = 100-(((totalsecs - secs)/totalsecs)*100);
        setProgress(perc);
        console.log("123");
    }*/

    function minutesTimer(){
        minutes = minutes -1;
        if(minutes<10){
            document.getElementById("minutes").innerHTML = "0"+minutes;
        }
        else{
            document.getElementById("minutes").innerHTML = minutes;
        }
    }

    function secondsTimer(){
        seconds = seconds -1;
        secs = secs + 1;
        perc = 100-(((totalsecs - secs)/totalsecs)*100);
        setProgress(perc);
        if(seconds < 10){
            document.getElementById("seconds").innerHTML = "0"+seconds;
            document.getElementById("title_timer").innerHTML = minutes + ":0" + seconds + "- Time To Work!";
            if(seconds == 0){
                if(minutes <= 0){
                    clearInterval(minutes_interval);
                    clearInterval(seconds_interval);
                    resetProgressRing();
                    let counter = Number(localStorage.getItem('sessionCounter'));
                    counter = counter+1;
                    console.log(counter)
                    let pomo = localStorage.getItem('isPomo');
                    console.log(pomo);
                    if(pomo == 'true'){
                        localStorage.setItem('isPomo','false');
                        displayBreakComplete();
                    }
                    else{
                        localStorage.setItem('isPomo', 'true');
                        if(counter <= 3){
                            localStorage.setItem('sessionCounter', counter);
                            displayShortBreak();
                        }
                        else if(counter == 4){
                            localStorage.setItem('sessionCounter',0);
                            displayLongBreak();
                        }
                    }
                }
                seconds = 60;
            }
        }
        else{
            document.getElementById("seconds").innerHTML = seconds;
            document.getElementById("title_timer").innerHTML = minutes + ":" + seconds + "- Time To Work!";
        }
        
    } 
}

function distractionCount(){
    distractCounter = distractCounter + 1;
    document.getElementById("distraction-btn").innerHTML = "Distraction : " + distractCounter;
}

function displayFailModal(){
    document.getElementById("failModal").style.display = 'block';
}
function failSession(){
    document.getElementById("failModal").style.display = 'none';
    window.location.href="../index.html";
}
function quitFailModal(){
    document.getElementById("failModal").style.display = 'none';
}