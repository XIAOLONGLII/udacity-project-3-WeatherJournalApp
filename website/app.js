/* Global Variables */
// api.openweathermap.org/data/2.5/weather?zip={zip code}&appid={API key} 
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&units=metric&appid=be54761f3c8d3fba4b50dc1e316cfc6b";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 + '/'+ d.getDate()+'/'+ d.getFullYear();

//doc: Write an async function in app.js that uses fetch() to make a GET request to the OpenWeatherMap API.

const postData = async ( url = '', data = {})=>{
    // console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },     
      body: JSON.stringify(data), 
    });
      try {
        const newData = await response.json();
        return newData;
      }catch(error) {
        console.log("error", error);
      }
  }

//doc: Create an event listener for the element with the id: generate, with a callback function to execute when it is clicked.
let zipCode = document.getElementById('zip').value;
document.getElementById('generate').addEventListener('click', performAction);
function performAction(e) {
    zipCode = document.getElementById('zip').value;
    getZipcode(baseURL, zipCode, apiKey)
    .then(function(data) {
        postData('/all', {temp:data.main.temp, date:newDate, content:data})
        .then(updateUI()) //doc: Finally, chain another Promise that updates the UI dynamically 
    })
}

const getZipcode = async(baseURL, zipCode, apiKey) => {
    const result = await fetch(baseURL+zipCode+apiKey);
    //console.log('result: '+result);
    try {
        const data = await result.json();
        console.log(data);
        return data;
    }
    catch(error) {
        console.log('error: '+ error);
    }
};

const updateUI = async() => {
    const result = await fetch('/all');
    try {
        const allData = await result.json();
        console.log(allData[0]);
        document.getElementById('location').innerHTML = "location: "+allData[0].content.name;
        document.getElementById('temp').innerHTML = "tempeture: "+allData[0].content.main.temp + " feels like " + allData[0].content.main.feels_like;
        document.getElementById('date').innerHTML = "Today's date: " +allData[0].body.date;
        document.getElementById('humidity:').innerHTML = "Today's humidity: "+allData[0].content.main.humidity;
        document.getElementById('weather').innerHTML = "Today's weather: " +allData[0].content.weather[0].main + ", descprtion: " + allData[0].content.weather[0].description; 
        document.querySelector('.title').innerHTML = "Today you are feeling " + document.querySelector('#feelings').value;

    }catch(error) {
        console.log('error: ', error);
    }
};

