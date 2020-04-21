/* Global Variables */
const buttonStart = document.getElementById('generate');


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Personal API Key for OpenWeatherMap API
const baseUrl = 'http://api.openweathermap.org/data/2.5/forecast?';
const corsvar = 'https://cors-anywhere.herokuapp.com/'
const key = '&appid=a50025fbaef94083e1bbf95dfe9f0a0b';
const localurl = 'http://localhost:3000/data'

// Event listener to add function to existing HTML DOM element
buttonStart.addEventListener('click', function() {
    //assign changed values:
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    //assamble url:
    const Url = `${corsvar}${baseUrl}zip=${zip},de${key}`;
    updatePost(Url, feelings);
});

/* Function called by event listener */
async function updatePost(url, feelings) {
    const newTempData = getWebApiData(url)
        .then(function(temperatur) {
            uploadData(localurl, temperatur, feelings, newDate);
            updateDome(localurl);
        });
};

/* Function to GET Web API Data*/
async function getWebApiData(url) {
    const respond = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000/',
        },
        credentials: 'same-origin',
    });
    try {
        const data = await respond.json();
        const tempCelsius = data.list[0].main.temp - 273.15;
        return tempCelsius;
    } catch (error) {
        console.log('error is:', error);
    }
};

/* Function to POST data */
async function uploadData(localurl, newTempData, feelings, newDate) {
    console.log('1.PostData');
    const data = {
        temperatur: newTempData.toFixed(2),
        date: newDate,
        userResponse: feelings
    };
    const response = await fetch(localurl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const newdata = await response.json()
        return newdata
    } catch (error) {
        console.log('error', error);
    }
};
/* Function to update DOM */
async function updateDome(localurl) {


    const response = await fetch(localurl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    try {
        const dataFromServer = await response.json();
        document.getElementById('date').innerHTML = dataFromServer.date;
        document.getElementById('temp').innerHTML = dataFromServer.temperatur + ' °C';
        document.getElementById('content').innerHTML = dataFromServer.userResponse;
        return dataFromServer;
    } catch (error) {
        console.log('error', error);
    }
};