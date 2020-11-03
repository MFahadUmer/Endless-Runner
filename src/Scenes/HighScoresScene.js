import 'phaser';
import config from '../Config/config';
import scoreApi from "../Config/scoreStorageApi";
import Button from '../Objects/Button';

export default class HighScoresScene extends Phaser.Scene {
  constructor () {
    super('HighScores');
  }

  create () {
    this.creditsText = this.add.text(350, 100, 'High Scores', { fontSize: '32px', fill: '#fff' });
    let getScores = scoreApi.getScores();
    this.data = getScores.then(data => {
      this.y = 150;
      data.result.forEach(value => {
        this.add.text(300, this.y, `${value.user} : ${value.score}`, { fontSize: '26px', fill: 'white' });
        this.y += 25;
      })
    }
    );
    this.gameButton = new Button(this, config.width/2, 550, 'blueButton1', 'blueButton2', 'Menu', 'Title');
  }
};