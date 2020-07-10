
let inputCity = document.getElementById('city');
let tableBody = document.getElementById('table-body-content');
const search = document.getElementById('search');
const apiKey = 'd8273ff3fb899f65070a8154465cb75d'

//Initial request
search.addEventListener('click',(event) => {
  inputCity = document.getElementById('city').value.toLowerCase();
  document.getElementById('weather-info').style = 'display:none';
  document.getElementById('table-body-content').innerHTML = '';
    if (inputCity.length == 0) {
        alert("Please insert a city name");
    }else{
        getWeatherData()
    }
});

//Fecth function
function getWeatherData() {          
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&units=imperial&appid=${apiKey}`)
  .then(response => {
    if (response.status === 200) {
      return response.json()
    } else {
      alert('city not found')
      throw 'error';
    }
  })
  .then( cityData => {
          let lat = cityData.coord.lat;
          let lon = cityData.coord.lon;
          let city = cityData.name;
          let country = cityData.sys.country;
          let currentWeather = cityData.weather[0];
          document.getElementById('current-weather').innerHTML = currentWeather.description;
          document.getElementById('current-weather-icon').setAttribute('src', 'http://openweathermap.org/img/wn/' + currentWeather.icon + '@2x.png')
          document.getElementById('city-name').innerHTML = city + ', ' + country;
            
          fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
         
          .then( response => response.json())
          .then( weatherData => {     
            makeDataTable(weatherData);
            document.getElementById('weather-info').style = 'display:block';
            
           }) 
       
                 
        })
  }

  const makeDataTable = (weatherData) => {
    let firstDays = weatherData.daily.slice(0, 7);
    firstDays.forEach(weatherInfo => {
      var tr = document.createElement('tr');
      //populate each table row with the values of the properties
      tr.innerHTML = '<td>' + moment.unix(weatherInfo.dt).format('dddd, MMMM Do, YYYY') +  '</td>' + 
                      '<td>' + weatherInfo.temp.min + '</td>' +
                      '<td>' + weatherInfo.temp.max + '</td>' +
                     '<td>' + weatherInfo.weather[0].description + '<img src=http://openweathermap.org/img/wn/' + weatherInfo.weather[0].icon + '@2x.png>' + '</td>';
                                      
                     
      //add the row to the table body
      tableBody.appendChild(tr);
    });
  }
 
