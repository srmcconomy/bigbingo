const express = require('express')
const app = express();
require('ejs')

const bingoGenerator = require('./7x7gen')
const bingoList = require('./goal-list')

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/', (req, res) => {
  var size = +req.query.size;
  if (size > 200) res.send('size < 200 pls')
  if (size % 2 === 0) res.send('size must be odd')
  var seed = +req.query.seed;
  var board = bingoGenerator(bingoList.normal, {size, seed})
  res.render('index', {size, seed, board})
})

app.get('/bingo-popout', (req, res) => {
  var size = +req.query.size;
  var row = req.query.rowName;
  let goals = []
  for (let i = 0; i < size; i++) {
    goals[i] = req.query['goal' + i];
  }
  res.render('bingo-popout', {size, row, goals})
})

app.listen(80, () => console.log('listening'))
