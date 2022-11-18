const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Let the battle begin!');
});


// {
//   "_links": {
//     "self": {
//       "href": "https://YOUR_SERVICE_URL"
//     }
//   },
//   "arena": {
//     "dims": [4,3], // width, height
    // "state": {
    //   "https://A_PLAYERS_URL": {
    //     "x": 0, // zero-based x position, where 0 = left
    //     "y": 0, // zero-based y position, where 0 = top
    //     "direction": "N", // N = North, W = West, S = South, E = East
    //     "wasHit": false,
    //     "score": 0
    //   }
    //   ... // also you and the other players
    // }
//   }
// }

var prevScore = 0;


app.post('/', function (req, res) {
  // console.log(req.body);
  const data = req.body;
  const moves = ["F", "T", "L", "R", "F", "F"];
  // findMeaningfulMove(data)

  const participants = data.arena.state;
  const myhref = findMyHref(data);
  var myState = participants[myhref]
  
  if (personInFront(data, myState, myhref) && myState.score >= prevScore) {
    console.log("Throw");
    prevScore = myState.score;
    res.send(moves[1]);
  } else {
    // make random move
    console.log("move");
    prevScore = myState.score;
    res.send(moves[Math.floor(Math.random() * moves.length)]);
  }
});

app.listen(process.env.PORT || 8080);

function findMyHref(data) {
  const link = data._links.self.href;
  const state = link;
  return state;
}

function countPeopleAttackingMe(data) {
  const myhref = findMyHref(data);
  const participants = data.arena.state;
  var myState = participants[myhref]
  const myX = myState.x;
  const myY = myState.y;
  var count = 0;
  for (var k in participants) {
    if (k == myhref) {
      continue
    }
    if (personInFront(data, participants[k], k)) {
      count++;
    }
  }
  console.log("People attacking: ", count);
  return count;
}

// function findMeaningfulMove (data) {
//   const participants = data.arena.state;
//   const myX = myState.x;
//   const myY = myState.y;
//   const X = data.arena.dims[0];
//   const Y = data.arena.dims[1];
//   const dir = myState.direction;

//   var


// }

function personInFront(data, myState, myhref) {
  
  const participants = data.arena.state;
  const myX = myState.x;
  const myY = myState.y;

  switch (myState.direction) {
    case "N":
      for(var k in participants) {
        if (k === myhref) {
          continue
        }
        if (myX === participants[k].x) {
          if (myY - participants[k].y <= 0 && myY - participants[k].y >= -3) {
            return true;
          }
        }
      }
      break;
    case "W":
      for(var k in participants) {
        if (k === myhref)
          continue
        if (myY === participants[k].y) {
          if (myX - participants[k].x >= 0 && myX - participants[k].x <= 3) {
            return true;
          }
        }
      }
      break;
    case "S":
      for(var k in participants) {
        if (k === myhref)
          continue
        if (myX === participants[k].x) {
          if (myY - participants[k].y >= 0 && myY - participants[k].y <= 3) {
            return true;
          }
        }
      }
      break;
    case "E":
      for(var k in participants) {
        if (k === myhref)
          continue
        if (myY === participants[k].y) {
          if (myX - participants[k].x <= 0 && myX - participants[k].x >= -3) {
            return true;
          }
        }
      }
      break;
    default:
      return false;
  }
}