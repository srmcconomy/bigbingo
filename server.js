const express = require('express')
const app = express();
require('ejs')

const bingoGenerator = require('./7x7gen')

const defaults = {
  game: 'oot',
  mode: 'normal',
  size: 7
}

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/', (req, res) => {
  let size = +req.query.size || defaults.size;
  if (size > 200) res.send('size < 200 pls')
  if (size % 2 === 0) res.send('size must be odd')
  let seed = +req.query.seed || Math.ceil(999999 * Math.random());
  let mode = req.query.mode || defaults.mode;
  let game = req.query.game || defaults.game;
  let bingoList = require(`./${game}/goal-list`)[mode];
  let board = bingoGenerator(bingoList, {size, seed})
  res.render('index', {size, seed, board})
})

app.get('/bingo-popout', (req, res) => {
  let size = +req.query.size || defaults.size;
  let row = req.query.rowName;
  let goals = []
  for (let i = 0; i < size; i++) {
    goals[i] = req.query['goal' + i];
  }
  res.render('bingo-popout', {size, row, goals})
})

const port = process.env.PORT || 8081;
app.listen(port, () => console.log('listening on ' + port))
