// If we only need to pop up this single modal, then
// putting this in header-comp might be smarter.
if (localStorage.getItem('isNoob') === 'true') {
  document.getElementById('tutorialModal').style.display = 'block';
} else {
  // do nothing
}

document.getElementById('tutorialModal').onclick = (event) => {
  // clicked inside modal
  document.getElementById('tutorialModal').style.display = 'none';
};
document.querySelector('#tutorialModal > div').onclick = (event) => {
  // clicked outside modal
  event.stopPropagation();
};
