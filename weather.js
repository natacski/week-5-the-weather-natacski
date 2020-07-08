
let inputCity = document.getElementById('city').value.toLowerCase();
const search = document.getElementById('search');
const table = document.getElementById('info');
const apiKey = 'd8273ff3fb899f65070a8154465cb75d'

//Initial request
search.addEventListener('click',(event) => {
    if (input.length == 0) {
        alert("Please insert a city name");
    }else{
        fetch(),
        displayInfo()
        .then(getTableData)
        .catch(noCity);
    }
});

//Fecth function
async function fetch(url) {                                                           
    return fetch(url)
          .then(checkStatus) 
          .then(res => res.json()) //get the response in json format
          .catch(error => console.log('Looks like there was a problem', error))
  }
  
  Promise.all([
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&units=metric&appid=${apiKey}`), //fetch the city weather data
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=daily&appid=${apiKey}`), //fetch the data for 7 days
    fetch('http://openweathermap.org/img/wn/10d@2x.png') // fetch the icons
  ])
    .then( data => {
        const city = data[0].message;
        const country = data[1].message;
        const currentWeather = data[2].message;

        displayInfo(city, country, currentWeather);

    })

    .then( data => {
        const day = data[0].message;
        const min = data[1].message;
        const max = data[2].message;
        const weather = data[3].message;

        getTableData(day, min, max, weather);
     })

  //Other Functions

  async function displayInfo(data) {  
    const response = await fetch(url);
    const dataReturn = await response.json();
    const {} = data;  //what names should I use? city, country?

  }

  async function getTableData(data) {
    const response = await fetch(url);
    const dataReturn = await response.json();
    const {min_temp, max_temp} = data;  // how to get data for the icons?
    for (let i = 0; i < data.length; i++) {
    const table_body = 
    '<tr>' 
        '<td>' + 'day' + data[i] + '</td>' +
        '<td>' + 'min' + data[i] + '</td>' +
        '<td>' + 'max' + data[i] + '</td>' +
        '<td>' + 'weather' + data[i] + '</td>'
     '</tr>'  
    table.innerHTML = table_body;
    }
  }

  async function noCity() {
    if (getCityData == 0) {
        alert('City not found!')
    }
}

function checkStatus(response) {
    if(response.ok) {
      return Promise.resolve(response);
    }else {
    return Promise.reject(new Error(response.statusText));
    }
  }





/* Questions
1. How to display the table data after click search button?
2. Am I using the correct urls?
3. How to display the weather icons? Do I need to create another function?
4. I am trying to create async functions but I am not sure where to write await

*/
