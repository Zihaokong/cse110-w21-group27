function displayBreakComplete(){let a=new Audio("../../media/break-tune.mp3");a.play(),document.getElementById("breakCompleteModal").style.display="block"}function continueTask(){document.getElementById("breakCompleteModal").style.display="none",document.body.style.backgroundImage="linear-gradient(to right,#E0EAFC,#CFDEF3)",document.getElementById("currTask").innerHTML="Task",document.getElementById("button-container").style.display="flex",document.getElementById("start-btn").style.display="block",document.getElementById("button-container").style.paddingLeft="0px",window.location.reload()}function changeTask(){document.getElementById("breakCompleteModal").style.display="none",window.location.href="../index.html"}function displayShortBreak(){let a=new Audio("../../media/work-tune.mp3");a.play(),setTimeout(function(){window.location.reload()},2e3)}function startShortBreak(){document.getElementById("container-short").style.display="none",start(0,3)}function displayLongBreak(){let a=new Audio("../../media/work-tune.mp3");a.play(),setTimeout(function(){window.location.reload()},2e3)}function startLongBreak(){document.getElementById("container-long").style.display="none",start(0,5)}function startTimer(){document.getElementById("start-btn").style.display="none",document.getElementById("button-container").style.paddingLeft="150px",start(0,3)}