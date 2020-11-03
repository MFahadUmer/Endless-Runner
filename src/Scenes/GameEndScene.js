/* eslint-disable no-undef, class-methods-use-this, prefer-arrow-callback */
/* eslint-disable func-names, no-unused-vars, no-extra-bind */
import 'phaser';
import playerScoresModule from '../Config/storage';
import scoreApi from '../Config/scoreStorageApi';
import config from '../Config/config';

export default class GameEndScene extends Phaser.Scene {
  constructor() {
    super('GameEnd');
  }

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(
        config.width / 2,
        config.height / 2 - offset * 100,
        config.width,
        config.height,
      ),
    );
  }

  centerButtonText(gameText, gameButton) {
    Phaser.Display.Align.In.Center(gameText, gameButton);
  }

  create() {
    const scores = playerScoresModule.displayScores();
    const realScores = scores.slice(1, scores.length - 1);
    const name = playerScoresModule.displayPlayerName();
    localStorage.clear();
    const realname = name.slice(2, name.length - 2);
    const realname2 = name.slice(1, name.length - 1);
    scoreApi.postScores(realname, realScores);
    this.gameEndText = this.add.text(250, 150, 'Game End.', {
      fontSize: '56px',
      fill: '#ff0000',
    });
    this.playerScores = this.add.text(
      50,
      250,
      `Your ${realname2} Scores: ${realScores}`,
      { fontSize: '40px', fill: '#FFF' },
    );
    this.gameButton = this.add
      .sprite(325, 425, 'bluebuttonForWelcome1')
      .setInteractive();
    this.gameText = this.add.text(0, 0, 'Play again', {
      fontSize: '32px',
      fill: '#fff',
    });
    this.centerButtonText(this.gameText, this.gameButton);
    this.gameButton.on(
      'pointerdown',
      function (pointer) {
        window.location.reload();
      }.bind(this),
    );
  }
}
/* eslint-enable no-undef, class-methods-use-this, prefer-arrow-callback */
/* eslint-enable func-names, no-unused-vars, no-extra-bind */
