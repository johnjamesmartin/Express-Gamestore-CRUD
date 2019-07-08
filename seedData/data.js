/* NES
 *****************************************/
const nesGamesData = require('./games/nes');
const nesGames = nesGamesData;
let nesGamesArr = [];

for (let i = 0; i < nesGames.length; i++) {
  nesGamesArr.push({
    name: nesGames[i][0],
    developer: nesGames[i][1],
    genre: nesGames[i][2],
    releaseYear: nesGames[i][3]
  });
}

/* N64
 *****************************************/
const n64GamesData = require('./games/n64');
const n64Games = n64GamesData;
let n64GamesArr = [];

for (let i = 0; i < n64Games.length; i++) {
  n64GamesArr.push({
    name: n64Games[i][0],
    developer: n64Games[i][1],
    genre: n64Games[i][2],
    releaseYear: n64Games[i][3]
  });
}

/* Export
 *****************************************/
module.exports = {
  gameData: {
    nesGamesArr,
    n64GamesArr
  }
};
