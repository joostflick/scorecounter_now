const team1 = document.getElementById('scoreTeam1')
const team2 = document.getElementById('scoreTeam2')

const status = document.getElementById('status')
status.innerText = 'Currently online & offline supported'

const buttonTeam1Plus = document.getElementById('plusTeam1')
const buttonTeam1Minus = document.getElementById('minusTeam1')
const buttonTeam2Plus = document.getElementById('plusTeam2')
const buttonTeam2Minus = document.getElementById('minusTeam2')

var scoreTeam1 = document.getElementById('scoreTeam1').innerText
var scoreTeam2 = document.getElementById('scoreTeam2').innerText

// var formPlusTeam1 = document.getElementById('formPlusTeam1')
// var formMinusTeam1 = document.getElementById('formMinusTeam1')
// var formPlusTeam2 = document.getElementById('formPlusTeam2')
// var formMinusTeam2 = document.getElementById('formMinusTeam2')

function get(path, params) {
  method = 'get' // Set method to post by default if not specified.

  // The rest of this code assumes you are not using a library.
  // It can be made less wordy if you use one.
  var form = document.createElement('form')
  form.setAttribute('method', method)
  form.setAttribute('action', path)

  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      var hiddenField = document.createElement('input')
      hiddenField.setAttribute('type', 'hidden')
      hiddenField.setAttribute('name', key)
      hiddenField.setAttribute('value', params[key])

      form.appendChild(hiddenField)
    }
  }

  document.body.appendChild(form)
  form.submit()
}

function updateOffline() {
  status.innerText = 'Currently offline'
  console.log('offline')
  buttonTeam1Plus.type = 'button'
  buttonTeam1Minus.type = 'button'
  buttonTeam2Plus.type = 'button'
  buttonTeam2Minus.type = 'button'

  buttonTeam1Plus.addEventListener(
    'click',
    function() {
      team1Plus()
    },
    false
  )
  buttonTeam2Plus.addEventListener(
    'click',
    function() {
      team2Plus()
    },
    false
  )
  buttonTeam1Minus.addEventListener(
    'click',
    function() {
      team1Minus()
    },
    false
  )
  buttonTeam2Minus.addEventListener(
    'click',
    function() {
      team2Minus()
    },
    false
  )

  function team1Plus() {
    console.log('team1Plus-offline')
    scoreTeam1++
    team1.innerText = scoreTeam1
  }
  function team1Minus() {
    if (scoreTeam1 > 0) {
      scoreTeam1--
    } else {
      scoreTeam1 = scoreTeam1
    }
    team1.innerText = scoreTeam1
  }
  function team2Plus() {
    scoreTeam2++
    team2.innerText = scoreTeam2
  }
  function team2Minus() {
    if (scoreTeam2 > 0) {
      scoreTeam2--
    } else {
      scoreTeam2 = scoreTeam2
    }
    team2.innerText = scoreTeam2
  }
}

function updateOnline() {
  console.log('online')
  console.log('team 1:' + scoreTeam1)
  console.log('team 2:' + scoreTeam2)
  get('/', { scoreTeam1: scoreTeam1, scoreTeam2: scoreTeam2 })
  buttonTeam1Plus.type = 'submit'
  buttonTeam1Minus.type = 'submit'
  buttonTeam2Plus.type = 'submit'
  buttonTeam2Minus.type = 'submit'

  buttonTeam1Plus.removeEventListener(
    'click',
    function() {
      team1Plus()
    },
    false
  )
  buttonTeam2Plus.removeEventListener(
    'click',
    function() {
      team2Plus()
    },
    false
  )
  buttonTeam1Minus.removeEventListener(
    'click',
    function() {
      team1Minus()
    },
    false
  )
  buttonTeam2Minus.removeEventListener(
    'click',
    function() {
      team2Minus()
    },
    false
  )
}

// Update the online status icon based on connectivity
window.addEventListener('online', updateOnline)
window.addEventListener('offline', updateOffline)
