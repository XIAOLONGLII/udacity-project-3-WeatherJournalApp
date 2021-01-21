/* Global Variables */
// api.openweathermap.org/data/2.5/weather?zip={zip code}&appid={API key} 
let baseURL = "api.openweathermap.org/data/2.5/weather?zip=";
let apiKey = "&appid=be54761f3c8d3fba4b50dc1e316cfc6b";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//doc: Write an async function in app.js that uses fetch() to make a GET request to the OpenWeatherMap API.
const zipCode = document.getElementById('zip').value;
const getZipcode = async(baseURL, zipCode, apiKey) => {
    const result = await fetch(baseURL+zipCode+apiKey);
    try {
        const data = await result.json();
        console.log(data);
    }
    catch(error) {
        console.log('error: '+ error);
    }
};
//doc: Create an event listener for the element with the id: generate, with a callback function to execute when it is clicked.
document.getElementById('generate').addEventListener('click', performAction);
function performAction(e) {
    getZipcode(baseURL, zipCode, apiKey);
}
//doc: Finally, chain another Promise that updates the UI dynamically 
const updateUI = async() => {
    const result = await fetch(baseURL+zipCode+apiKey);
    try {
        const allData = await request.json();
        document.getElementById('temp').innerHTML = allData[0].temp;
        document.getElementById('date').innerHTML = allData[0].date;
        document.getElementById('content').innerHTML = allData[0].content;

    }catch(error) {
        console.log('error: '+ error);
    }
};

