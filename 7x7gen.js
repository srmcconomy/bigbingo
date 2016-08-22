(function(j, i, g, m, k, n, o) {
    function q(b) {
        var e, f, a = this,
            c = b.length,
            d = 0,
            h = a.i = a.j = a.m = 0;
        a.S = [];
        a.c = [];
        for (c || (b = [c++]); d < g;) a.S[d] = d++;
        for (d = 0; d < g; d++) e = a.S[d], h = h + e + b[d % c] & g - 1, f = a.S[h], a.S[d] = f, a.S[h] = e;
        a.g = function(b) {
            var c = a.S,
                d = a.i + 1 & g - 1,
                e = c[d],
                f = a.j + e & g - 1,
                h = c[f];
            c[d] = h;
            c[f] = e;
            for (var i = c[e + h & g - 1]; --b;) d = d + 1 & g - 1, e = c[d], f = f + e & g - 1, h = c[f], c[d] = h, c[f] = e, i = i * g + c[e + h & g - 1];
            a.i = d;
            a.j = f;
            return i
        };
        a.g(g)
    }

    function p(b, e, f, a, c) {
        f = [];
        c = typeof b;
        if (e && c == "object")
            for (a in b)
                if (a.indexOf("S") < 5) try {
                    f.push(p(b[a], e - 1))
                } catch (d) {}
                return f.length ? f : b + (c != "string" ? "\0" : "")
    }

    function l(b, e, f, a) {
        b += "";
        for (a = f = 0; a < b.length; a++) {
            var c = e,
                d = a & g - 1,
                h = (f ^= e[a & g - 1] * 19) + b.charCodeAt(a);
            c[d] = h & g - 1
        }
        b = "";
        for (a in e) b += String.fromCharCode(e[a]);
        return b
    }
    i.seedrandom = function(b, e) {
        var f = [],
            a;
        b = l(p(e ? [b, j] : arguments.length ? b : [(new Date).getTime(), j, window], 3), f);
        a = new q(f);
        l(a.S, j);
        i.random = function() {
            for (var c = a.g(m), d = o, b = 0; c < k;) c = (c + b) * g, d *= g, b = a.g(1);
            for (; c >= n;) c /= 2, d /= 2, b >>>= 1;
            return (c + b) / d
        };
        return b
    };
    o = i.pow(g, m);
    k = i.pow(2, k);
    n = k * 2;
    l(i.random(), j)
})([], Math, 256, 6, 52);
module.exports = function bingoGenerator(list, opts) {
    var SIZE = opts.size || 5;
    if (!opts) opts = {};
    var LANG = opts.lang || 'name';
    var SEED = opts.seed || Math.ceil(999999 * Math.random()).toString();
    Math.seedrandom(SEED);
    var MODE = opts.mode || 'normal';
    var rowElements = {};
    for (var i = 0; i < SIZE; i++) {
      rowElements['row'+(i+1)] = [];
      rowElements['col'+(i+1)] = [];
      for (var j = 0; j < SIZE; j++) {
        rowElements['row'+(i+1)].push(SIZE*i+1+j)
        rowElements['col'+(i+1)].push(i+1+j*SIZE)
      }
    }
    rowElements["tlbr"] = [];
    rowElements["bltr"] = [];
    for (var i = 0; i < SIZE; i++) {
      rowElements["tlbr"].push(i+1+i*SIZE)
      rowElements["bltr"].push(i+1+(SIZE-i-1)*SIZE)
    }

    function invertObject(obj) {
        var ret = {};
        Object.keys(obj).forEach(function(key) {
            obj[key].forEach(function(item) {
                if (!ret[item]) ret[item] = [];
                ret[item].push(key);
            });
        });
        return ret;
    }
    rowCheckList = invertObject(rowElements);

    function makeCard() {
      function difficulty(i) {
          var Rem = [];
          var Table = [[0],[0]];
          for (var j = 0; j < 2; j++) {
            for (var k = 2; k <= SIZE; k++) {
              rem = SEED % k;
              SEED = Math.floor(SEED / k);
              Table[j].splice(rem, 0, k - 1);
            }
          }
          i--;
          SEED = SEED % SIZE;
          x = (i + SEED) % SIZE;
          y = Math.floor(i / SIZE);
          var e5 = Table[0][(x + (SIZE + 1)/2 * y) % SIZE];
          var e1 = Table[1][((SIZE + 1)/2 * x + y) % SIZE];
          value = SIZE * e5 + e1;
          let val = value / (SIZE * SIZE) * 24
          if (Math.random() > val % 1) {
            val = Math.floor(val)
          } else {
            val = Math.ceil(val)
          }
          return val + 1;
      }

      function shuffle(toShuffle) {
          for (var i = 0; i < toShuffle.length; i++) {
              var randElement = Math.floor(Math.random() * (i + 1));
              var temp = toShuffle[i];
              toShuffle[i] = toShuffle[randElement];
              toShuffle[randElement] = temp;
          }
      }

      function getShuffledGoals(difficulty) {
          var newArray = bingoList[difficulty].slice();
          shuffle(newArray);
          return newArray;
      }


        var bingoBoard = [];
        var populationOrder = [];
        let bingoList = {}
        for (var i = 0; i < SIZE*SIZE; i++) {
          populationOrder[i] = i + 1;
          bingoList[i + 1] = [];

        }
        shuffle(populationOrder)
        for (var i = 0; i < SIZE*SIZE; i++) {
            var sq = populationOrder[i];
            var getDifficulty = difficulty(sq);
            if (bingoList[getDifficulty].length === 0) bingoList[getDifficulty] = list[getDifficulty].slice();
            var index = Math.floor(Math.random() * bingoList[getDifficulty].length)
            var goal = bingoList[getDifficulty].splice(index, 1)[0]
            bingoBoard[sq] = goal.name;
        }
        return bingoBoard;






    }
    var card;
    var iterations = 0;
    while (true) {
        iterations++;
        card = makeCard();
        if (card === false) {
            continue;
        } else {
            break;
        }
    }
    return card;
};
