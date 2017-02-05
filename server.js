const express = require('express')
const app = express();
require('ejs')

// const bingoGenerator = require('./7x7gen')
//
// const defaults = {
//   game: 'oot',
//   mode: 'normal',
//   size: 7
// }

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/bingo', (req, res) => {
  // let size = +req.query.size || defaults.size;
  // if (size > 200) res.send('size < 200 pls')
  // if (size % 2 === 0) res.send('size must be odd')
  // let seed = +req.query.seed || Math.ceil(999999 * Math.random());
  // let mode = req.query.mode || defaults.mode;
  // let game = req.query.game || defaults.game;
  // let bingoList = require(`./${game}/goal-list`)[mode];
  // let board = bingoGenerator(bingoList, {size, seed})
  const board = [
    '',
    'Beat Jabu-Jabu\'s Belly (no damage)',
    'Finish with no shields',
    'Shoot all 4 eye switches in Forest Temple',
    'Get the golden rupee in Fire Temple',
    'Defeat all 11 Re-Deads and Gibdos in Shadow Temple',
    'Get to the end of any trial',
    'Get Fairy Bow with Iron Boots equipped',
    'Talk to the owl in Desert Colossus',
    'Defeat four different Like-Likes',
    'Beat the Fire Temple no Goron Tunic',
    'Plant 6 Magic Beans',
    'Open the purple rupee chest in Haunted Wasteland',
    '8 unique unused keys in GTG (no damage)',
    'Finish by defeating Ganon',
    'Milk the cow in Link\'s house',
    'Defeat 4 Bosses',
    'Open all 16 chests in Ganon\'s Castle and Tower',
    'Buy 10 bombchus from the Bombchu shop',
    'Defeat all 4 Lizalfos in Spirit Temple',
    'Have the water level in Water Temple at the middle level',
    'Get 500 points from the guy that collects Big Poes',
    '20 unique Skulltulas',
    '6 unused keys in Water Temple',
    'Beat Shadow Temple no Hover Boots',
    'Break 6 walls in Dodongo\'s Cavern using Blue Fire'
  ];
  res.render('index', {size: 5, board})
})

app.get('/bingo-popout', (req, res) => {
  let size = 5;
  let row = req.query.rowName;
  let goals = []
  for (let i = 0; i < size; i++) {
    goals[i] = req.query['goal' + i];
  }
  res.render('bingo-popout', {size: 5, row, goals})
})

const port = process.env.PORT || 8081;
app.listen(port, () => console.log('listening on ' + port))
