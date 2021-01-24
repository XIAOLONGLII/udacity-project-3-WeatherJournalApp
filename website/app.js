/* Global Variables */
// api.openweathermap.org/data/2.5/weather?zip={zip code}&appid={API key} 
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&units=metric&appid=be54761f3c8d3fba4b50dc1e316cfc6b";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 + '/'+ d.getDate()+'/'+ d.getFullYear();


/* 1. Event listener when clicking 'generate' */
//doc: Create an event listener for the element with the id: generate, with a callback function to execute when it is clicked.
const regex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
document.getElementById('generate').addEventListener('click', performAction);

/* 2. callback fundtion of 'generate' event listener 
Here we want to do: 
a. get the user input: zipcode
b. once we got the zipcode, then we can get all weather data by using getWeatherData()
c. once we got weather data, added it to the post request, then send it to server. 
d. updateUI will retrieve data from server then update the tags. 
*/
function performAction(e) {
    //a. verify zipcode
    const zipCode = document.getElementById('zip').value;
    if(zipCode.value === '' || !zipCode.match(regex)) {
        alert(`ipcode can't be empty or contain alphabets!`);
    }
   
    //b. get the getWeatherData
    getWeatherData(baseURL, zipCode, apiKey)
    .then(function(data) {
        postData('/body', {temp:data.main.temp, date:newDate, content:data})
        .then(updateUI()) //doc: Finally, chain another Promise that updates the UI dynamically 
    })
}
/* 3. function to get web api data */
//doc: Write an async function in app.js that uses fetch() to make a GET request to the OpenWeatherMap API.
const getWeatherData = async(baseURL, zipCode, apiKey) => {
    const result = await fetch(baseURL+zipCode+apiKey);
    try {
        const data = await result.json();
        return data;
    }
    catch(error) {
        console.log('error: '+ error);
    }
};

/* 4. function to post data */
const postData = async ( url = '', data = {})=>{
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
// 5. when click generate, this will be called! 
const updateUI = async() => {
    const result = await fetch('/body');
    try {
        const allData = await result.json();
        console.log(allData);
        document.getElementById('location').innerHTML = "location: "+allData.content.name;
        document.getElementById('temp').innerHTML = "tempeture: "+allData.content.main.temp + " feels like " + allData.content.main.feels_like;
        document.getElementById('date').innerHTML = "Today's date: " +allData.body.date;
        document.getElementById('humidity').innerHTML = "Today's humidity: "+allData.content.main.humidity;
        document.getElementById('weather').innerHTML = "Today's weather: " +allData.content.weather.main + ", descprtion: " + allData.content.weather[0].description; 
        document.querySelector('.title').innerHTML = "Today you are feeling " + document.querySelector('#feelings').value;

    }catch(error) {
        console.log('error: ' , error);
    }
};

