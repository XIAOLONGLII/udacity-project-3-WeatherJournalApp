/* Global Variables */
// api.openweathermap.org/data/2.5/weather?zip={zip code}&appid={API key} 
let baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
let apiKey = "&appid=be54761f3c8d3fba4b50dc1e316cfc6b";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

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
        console.log(newData);
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
    console.log(zipCode);
    getZipcode(baseURL, zipCode, apiKey)
    .then(function(data) {
        console.log(data); 
        postData('/all', {temp:data.main.temp, date:newDate, content:data.weather})
       
    })
    .then( updateUI())

}

const getZipcode = async(baseURL, zipCode, apiKey) => {
    const result = await fetch(baseURL+zipCode+apiKey);
    console.log('result: '+result);
    try {
        const data = await result.json();
        console.log(data);
        return data;
    }
    catch(error) {
        console.log('error: '+ error);
    }
};
//doc: Finally, chain another Promise that updates the UI dynamically 
const updateUI = async() => {
    const result = await fetch(baseURL+zipCode+apiKey);
    console.log('working?');
    try {
        const allData = await result.json();
        console.log('allData===');
        console.log(allData);
        document.getElementById('temp').innerHTML = allData[0].temp;
        document.getElementById('date').innerHTML = allData[0].date;
        document.getElementById('content').innerHTML = allData[0].content;

    }catch(error) {
        console.log('error: ', error);
    }
};

