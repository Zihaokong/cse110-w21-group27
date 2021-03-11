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

statsList = [
    {date: 1, distractions: 5, passOrNot: 1},
    {date: 30, distractions: 5, passOrNot: 1},
    {date: 35, distractions: 5, passOrNot: 0},
    {date: 48, distractions: 3, passOrNot: 1},
    {date: 65, distractions: 5, passOrNot: 0},
    {date: 69, distractions: 5, passOrNot: 1}]

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
    if(diffDays - x == 0) {
        todayPomos++;
        if(z == 1) {
            todayDistractions = todayDistractions + y;
            todayCompletedPomos++;
        }
    }
    //last 7 days section
    if(diffDays - x <= 7) {
        weekPomos++;
        if(z == 1) {
            weekDistractions = weekDistractions + y;
            weekCompletedPomos++;
        }
    }
    //last 30 days section
    if(diffDays - x <= 30) {
        monthPomos++;
        if(z == 1) {
            monthDistractions = monthDistractions + y;
            monthCompletedPomos++;
        }
    }
});

document.getElementById("todayPomos").innerText = todayPomos;
document.getElementById("todayAvgDistractions").innerText = (todayDistractions / todayCompletedPomos).toFixed(1);
document.getElementById("todaySuccess").innerText = (100 * todayCompletedPomos / todayPomos).toFixed(2) + "%";

document.getElementById("weekPomos").innerText = weekPomos;
document.getElementById("weekAvgDistractions").innerText = (weekDistractions / weekCompletedPomos).toFixed(1);
document.getElementById("weekSuccess").innerText = (100 * weekCompletedPomos / weekPomos).toFixed(2) + "%";

document.getElementById("monthPomos").innerText = monthPomos;
document.getElementById("monthAvgDistractions").innerText = (monthDistractions / monthCompletedPomos).toFixed(1);
document.getElementById("monthSuccess").innerText = (100 * monthCompletedPomos / monthPomos).toFixed(2) + "%";
