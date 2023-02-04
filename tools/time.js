/* CLOCK */
const digiclock = document.getElementById('digitime')
var digits = document.getElementById('digitime').getElementsByTagName('span')
var digi_secs = document.getElementById('digi_sec').getElementsByTagName('span')

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
var weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

let wday = document.getElementById('wday')
let day = document.getElementById('day')
let month = document.getElementById('month')

setInterval(() => {
  var d = new Date()
  var hours = d.getHours()
  var minutes = d.getMinutes()
  var seconds = d.getSeconds()

  //digital
  if (hours < 10) {
    var hours = '0' + hours
  }
  if (minutes < 10) {
    var minutes = '0' + minutes
  }
  if (seconds < 10) {
    var seconds = '0' + seconds
  }

  var a = (hours.toString() + minutes.toString()).split('')

  //adding seperatr into array
  a.splice(2, 0, ':')
  for (i = 0; i < a.length; i++) {
    digits[i].innerHTML = a[i]
  }

  var b = seconds.toString().split('')
  for (i = 0; i < b.length; i++) {
    digi_secs[i].innerHTML = b[i]
  }

  //date
  var c = d.getDate()
  if (c < 10) {
    var c = '0' + c
  }
  day.innerHTML = c

  month.innerHTML = months[d.getMonth()]
  wday.innerHTML = weekdays[d.getDay()]
  //console.log(digits[2])
})
