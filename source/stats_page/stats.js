/* 
//this part should be included in timer.js to upload pomos to localStorage
let statsList;
const retrievedObject = localStorage.getItem('statsList');
if (!retrievedObject || retrievedObject === 'undefined') {
    statsList = [];
} else {
    statsList = JSON.parse(retrievedObject);
}
let startingDate = new Date('01/01/2021');
let today = new Date();
let diffTime = Math.abs(today - startingDate);
let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
//We need a new variable called "pass" to record whether the user has failed this pomo or not.
statsList.push({date: diffDays, distractions: distractCounter, passOrNot: pass});
localStorage.setItem('statsList', JSON.stringify(statsList));
*/


//method getting data for stats page content
let statsList;
const retrievedObject = localStorage.getItem('statsList');
if (!retrievedObject || retrievedObject === 'undefined') {
    statsList = [];
} else {
    statsList = JSON.parse(retrievedObject);
}

var startingDate = new Date('01/01/2021');
var today = new Date();
var diffTime = Math.abs(today - startingDate);
var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

var todayPomos = 0;
var weekPomos  = 0;
var monthPomos = 0;
var todayCompletedPomos = 0;
var weekCompletedPomos  = 0;
var monthCompletedPomos = 0;
var todayDistractions = 0;
var weekDistractions  = 0;
var monthDistractions = 0;

statsList.forEach(function (arrayItem) {
    var x = arrayItem.date;
    var y = arrayItem.distractions;
    var z = arrayItem.passOrNot;
    //today section
    if(x == diffDays) {
        todayPomos++;
        todayDistractions = todayDistractions + y;
        if(z == 1) {
            todayCompletedPomos++;
        }
    }
    //last 7 days section
    if(diffDays - x <= 7) {
        weekPomos++;
        weekDistractions = weekDistractions + y;
        if(z == 1) {
            weekCompletedPomos++;
        }
    }
    //last 30 days section
    if(diffDays - x <= 30) {
        monthPomos++;
        monthDistractions = monthDistractions + y;
        if(z == 1) {
            monthCompletedPomos++;
        }
    }
});

document.getElementById("todayPomos").innerText = todayPomos;
document.getElementById("todayAvgDistractions").innerText = todayDistractions / todayPomos;
document.getElementById("todaySuccess").innerText = 100 * todayCompletedPomos / todayPomos + "%";

document.getElementById("weekPomos").innerText = weekPomos;
document.getElementById("weekAvgDistractions").innerText = weekDistractions / weekPomos;
document.getElementById("weekSuccess").innerText = 100 * weekCompletedPomos / weekPomos + "%";

document.getElementById("monthPomos").innerText = monthPomos;
document.getElementById("monthAvgDistractions").innerText = monthDistractions / monthPomos;
document.getElementById("monthSuccess").innerText = 100 * monthCompletedPomos / monthPomos + "%";