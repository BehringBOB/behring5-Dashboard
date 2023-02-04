const weatherLocation = [52.467582, 13.489501] //Baume
const apiURL = 'https://api.openweathermap.org/data/2.5/'
const apiQuery = '?lat=' + weatherLocation[0] + '&lon=' + weatherLocation[1] + '&units=metric&lang=de&appid=' + weather_KEY
//console.log(apiURL + 'weather' + apiQuery)

loadWeather = (type) => {
  let url = apiURL + type + apiQuery
  //limit amount of timestamps if forcast in query
  if (type == 'forecast') {
    url += '&cnt=6'
  }

  fetch(url)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      //actual weather
      if (type == 'weather') {
        //console.log(data)
        //if actual weather
        const forcastDiv = document.getElementById('weatherCurrent')

        const img = new Image()
        img.src = './assets/weather/' + data.weather[0].icon + '.svg'
        forcastDiv.appendChild(img)

        const a = document.createElement('span')
        a.id = 'temp_now'
        a.innerHTML = Math.round(data.main.temp) + '°'
        forcastDiv.appendChild(a)

        const b = document.createElement('span')
        b.id = 'weatherDescription'
        b.innerHTML = data.weather[0].description
        forcastDiv.appendChild(b)

        const c = document.createElement('span')
        c.id = 'location'
        c.innerHTML = data.name
        forcastDiv.appendChild(c)

        // forcast weather
      } else if (type == 'forecast') {
        const forcast = data.list
        const forcastDiv = document.getElementById('forcast')

        //create the upcomming three forecast datablocks in #forcast
        for (i = 1; i < forcast.length; i++) {
          const a = document.createElement('span')
          a.classList.add('forcastBlock')

          const img = new Image()
          img.src = './assets/weather/' + forcast[i].weather[0].icon + '.svg'
          a.appendChild(img)

          const b = document.createElement('span')
          b.innerHTML = Math.round(forcast[i].main.temp) + '°'
          a.appendChild(b)

          const d = document.createElement('span')
          d.innerHTML = forcast[i].dt_txt.substr(11, 5)
          a.appendChild(d)

          const c = document.createElement('span')
          c.innerHTML = forcast[i].weather[0].description
          a.appendChild(c)

          forcastDiv.appendChild(a)

          //console.log(forcast[i])
        }
      }
      //console.log(data)
    })
    .catch((error) => {
      console.log("couldn't load weather data")
    })

  //console.log(url)
}

loadWeather('weather')
loadWeather('forecast')
setInterval(function () {
  document.getElementById('weatherCurrent').innerHTML = ''
  document.getElementById('forcast').innerHTML = ''
  loadWeather('weather')
  loadWeather('forecast')
}, 120000)
