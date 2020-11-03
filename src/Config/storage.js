const playerScores = localStorage.getItem('scores')
  ? JSON.parse(localStorage.getItem('scores'))
  : [];
localStorage.setItem('scores', JSON.stringify(playerScores));
JSON.parse(localStorage.getItem('scores'));

const playerName = localStorage.getItem('name')
  ? JSON.parse(localStorage.getItem('name'))
  : [];
localStorage.setItem('name', JSON.stringify(playerName));
JSON.parse(localStorage.getItem('name'));

const playerScoresModule = (() => {
  const addScores = scores => {
    playerScores.push(scores);
    localStorage.setItem('scores', JSON.stringify(playerScores));
  };

  const displayScores = () => {
    const playerCurrentScores = localStorage.getItem(
      'scores',
      JSON.stringify(playerScores),
    );
    localStorage.setItem('scores', JSON.stringify(playerScores));
    return playerCurrentScores;
  };

  const addPlayerName = name => {
    playerName.push(name);
    localStorage.setItem('name', JSON.stringify(playerName));
  };

  const displayPlayerName = () => {
    const currentPlayrName = localStorage.getItem(
      'name',
      JSON.stringify(playerName),
    );
    localStorage.setItem('name', JSON.stringify(playerName));
    return currentPlayrName;
  };

  return {
    addScores, displayScores, displayPlayerName, addPlayerName,
  };
})();

export default playerScoresModule;
/* eslint-enable no-underscore-dangle*/
