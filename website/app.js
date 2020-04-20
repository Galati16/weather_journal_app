/* Global Variables */
const buttonStart = document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
console.log(newDate);
// Personal API Key for OpenWeatherMap API
key = '';
// Event listener to add function to existing HTML DOM element
buttonStart.addEventListener('click', function(key) {
    SendRequest();
    updateDome();
});
/* Function called by event listener */
function SendRequest() {
    alert('And off we go')
};
/* Function to GET Web API Data*/

/* Function to POST data */

/* Function to update DOM */
function updateDome() {
    document.getElementById('date').innerHTML = newDate;
    document.getElementById('temp').innerHTML = '00°C';
    document.getElementById('centent').innterHTML = 'bubb';
};