// TRANSPORTATION

const baumeID = 900191001 //station ID of baumschulenweg

const bvgURL = 'https://v5.bvg.transport.rest/stops/900191001/departures?duration=20&results=10&linesOfStops=false&remarks=false&language=de'

loadDeparture = (station) => {
  fetch(bvgURL)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      const allDepartures = [] //collecting all deartures in an array

      for (i = 0; i < data.length; i++) {
        allDepartures.push(data[i].destination.id)

        createDeparture(data[i])
      }
      console.log(allDepartures)
    })
    .catch((error) => {
      console.log("couldn't load transportation data")
    })
}

const list = document.getElementById('transportationList')

createDeparture = (data) => {
  console.log(data)
  const departure = document.createElement('div')
  departure.id = data.destination.id

  //departure time
  let a = document.createElement('div')
  a.innerHTML = data.plannedWhen.substr(11, 5)
  departure.appendChild(a)

  const delaytime = document.createElement('div')
  delaytime.classList.add('delay')

  // if there is a delay, calculate delay
  if (data.prognosisType == 'prognosed') {
    console.log(data.prognosisType)

    let verspätung = 1 //default verspätung (1 min)
    const wievielVerspätung = new Date(data.when.substr(0, 19)) - new Date(data.plannedWhen.substr(0, 19))

    if (wievielVerspätung >= 6000) {
      verspätung = wievielVerspätung / 60000
    }

    delaytime.innerHTML = '+' + verspätung
  }
  //appending delay time
  departure.appendChild(delaytime)

  const lineType = document.createElement('div')
  lineType.classList.add('lineType')

  let img = new Image()
  if (data.line.mode == 'bus') {
    img.src = './assets/transportation/bus.svg'
  } else if (data.line.mode == 'train') {
    img.src = './assets/transportation/sbahn.svg'
  }

  lineType.appendChild(img)
  departure.appendChild(lineType)

  /* transportation line */
  const line = document.createElement('div')
  line.classList.add('line')
  line.classList.add(data.line.mode)

  //console.log(data[i].line.mode)
  line.innerHTML = data.line.id

  //line.insertBefore(img)

  departure.appendChild(line)

  const b = document.createElement('div')
  b.innerHTML = data.direction
  departure.appendChild(b)

  list.appendChild(departure)
}

loadDeparture(baumeID)

setInterval(function () {
  document.getElementById('transportationList').innerHTML = ''
  loadDeparture(baumeID)
}, 60000)
