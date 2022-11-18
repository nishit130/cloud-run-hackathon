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
//     "state": {
//       "https://A_PLAYERS_URL": {
//         "x": 0, // zero-based x position, where 0 = left
//         "y": 0, // zero-based y position, where 0 = top
//         "direction": "N", // N = North, W = West, S = South, E = East
//         "wasHit": false,
//         "score": 0
//       }
//       ... // also you and the other players
//     }
//   }
// }


app.post('/', function (req, res) {
  console.log(req.body);
  const data = req.body;
  const moves = ["F", "T", "L", "R"];

  if (personInFront(data)) {
    res.send(moves[1]);
  } else {
    // make random move
    res.send(moves[Math.floor(Math.random() * moves.length)]);
  }
});

app.listen(process.env.PORT || 8080);

function myState(data) {
  const link = data._links.self.href;
  const state = link;
  console.log(state);

  return state;
}

function personInFront(data) {
  const state = myState(data);
  const participants = data.arena.state;
  const myX = state.x;
  const myY = state.y;
  switch (state.direction) {
    case "N":
      participants.forEach(function (participant) {
        console.log(participant);
        if (myX === participant.x) {
          if (myY - participant.y >= 0 && myY - participant.y <= 3) {
            return true;
          }
        }
      });
      break;
    case "W":
      friends.forEach(function (participant) {
        console.log(participant);
        if (myY === participant.y) {
          if (myX - participant.x >= 0 && myX - participant.x <= 3) {
            return true;
          }
        }
      });
      break;
    case "S":
      friends.forEach(function (participant) {
        console.log(friend);
        if (myY === participant.y) {
          if (myX - participant.x <= 0 && myX - participant.x >= -3) {
            return true;
          }
        }
      });
      break;
    case "E":
      friends.forEach(function (participant) {
        console.log(participant);
        if (myX === participant.x) {
          if (myY - participant.y <= 0 && myX - participant.x >= -3) {
            return true;
          }
        }
      });
      break;
    default:
      return false;
  }
}