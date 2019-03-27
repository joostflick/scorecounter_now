var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var app = express()

// view engine setup.
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

let team1Points = 0
let team2Points = 0

app.get('/update'),
  (req, res) => {
    console.log(req)
    res.render('index', { team1Points: team1Points, team2Points: team2Points })
  }

app.get('/', (req, res) => {
  if (req.query.scoreTeam1) {
    team1Points = req.query.scoreTeam1
    team2Points = req.query.scoreTeam2
  } else {
    console.log('No offline data retrieved')
  }

  res.render('index', { team1Points: team1Points, team2Points: team2Points })
})

app.post('/plus-team1', (req, res) => {
  team1Points++
  res.render('index', { team1Points: team1Points, team2Points: team2Points })
})
app.post('/minus-team1', (req, res) => {
  if (team1Points > 0) {
    team1Points--
  } else {
    team1Points = team1Points
  }
  res.render('index', { team1Points: team1Points, team2Points: team2Points })
})
app.post('/plus-team2', (req, res) => {
  team2Points++
  res.render('index', { team2Points: team2Points, team1Points: team1Points })
})
app.post('/minus-team2', (req, res) => {
  if (team2Points > 0) {
    team2Points--
  } else {
    team2Points = team2Points
  }
  res.render('index', { team2Points: team2Points, team1Points: team1Points })
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
