const circle = document.querySelector(".progress-ring-circle");
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset = 0;

function setProgress(percent) {
  const offset = (percent / 100) * circumference;
  circle.style.strokeDashoffset = -offset;
}

function resetProgressRing(){
  circle.style.strokeDashoffset = 0;
}