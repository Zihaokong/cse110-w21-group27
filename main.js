let statsList,modal,btns,cancelBtns,spanClose;window.onload=handleLoad;function openModal(){modal.style.display="block"}function openInfoModal(){document.getElementById("infoModal").style.display="block"}function closeInfoModal(){document.getElementById("infoModal").style.display="none"}function determineSessionDate(){const a=new Date(JSON.parse(localStorage.getItem("lastVisit"))),b=new Date,c=Math.floor(Math.abs(b-a)/86400000);if(0!==c){const b=+localStorage.getItem("todayPomo"),c=+localStorage.getItem("distractCounter"),d=+localStorage.getItem("sessionCounter"),e={day:a.toLocaleDateString("en-US"),pomoCount:b,distractions:c,completedPomos:d};statsList.unshift(e),localStorage.setItem("todayPomo",0),localStorage.setItem("distractCounter",0),localStorage.setItem("sessionCounter",0),localStorage.setItem("statsList",JSON.stringify(statsList))}}function scrollFunc(){window.scrollTo(0,0)}function closeModal(){modal.style.display="none",document.getElementById("play-modal").style.display="none",document.getElementById("edit-modal").style.display="none",document.getElementById("delete-modal").style.display="none"}function eventCloseModal(a){switch(a.target){case modal:modal.style.display="none";break;case document.getElementById("delete-modal"):document.getElementById("delete-modal").style.display="none";break;case document.getElementById("edit-modal"):document.getElementById("edit-modal").style.display="none";break;case document.getElementById("infoModal"):document.getElementById("infoModal").style.display="none";break;case document.getElementById("play-modal"):document.getElementById("play-modal").style.display="none";break;default:}}function handleLoad(){modal=document.getElementById("add-task-modal"),btns=document.getElementsByClassName("add-task-btn"),cancelBtns=document.getElementsByClassName("cancel-btn"),spanClose=document.getElementsByClassName("close");const a=localStorage.getItem("statsList");a&&"undefined"!==a?(statsList=JSON.parse(a),determineSessionDate()):statsList=[];for(let a=0;a<spanClose.length;++a)spanClose[a].addEventListener("click",closeModal),cancelBtns[a].addEventListener("click",closeModal);for(let a=0;a<btns.length;++a)btns[a].addEventListener("click",openModal);window.onclick=eventCloseModal,window.onbeforeunload=handleUnload}function handleUnload(){determineSessionDate();const a=new Date;localStorage.setItem("lastVisit",JSON.stringify(a.toLocaleDateString("en-US"))),document.getElementById("main-container").remove()}"undefined"!=typeof exports&&(module.exports={openModal,determineSessionDate,closeModal,eventCloseModal,openInfoModal,closeInfoModal,handleLoad,handleUnload,scrollFunc});