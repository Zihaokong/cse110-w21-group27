window.addEventListener('load', () => {
  // If we only need to pop up this single modal, then
  // putting this in header-comp might be smarter.
  if (localStorage.getItem('isNoob') === 'true') {
    document.getElementById('tutorialModal').style.display = 'block';
  } else {
    // do nothing
  }

  document.getElementById('tutorialModal').onclick = (event) => {
    // clicked outside modal
    document.getElementById('tutorialModal').style.display = 'none';

    // Change localStorage's isNoob value on disabling tutorials (or other event)
    // Here it turns off noob mode as soon as you close out the first tutorial.
    localStorage.setItem('isNoob', false);
  };
  document.querySelector('#tutorialModal > div').onclick = (event) => {
    // clicked inside modal
    event.stopPropagation();
  };
});
