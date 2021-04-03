//  This function changes the header text for the webpage.
function changeHeader(newHeader) {
  document.getElementById('header').innerText = newHeader;
}

//  When the webpage is loaded...
window.addEventListener('DOMContentLoaded', function() {
  //  ...hide the warning message.
  document.getElementById('warning').style.display = 'none';
});
