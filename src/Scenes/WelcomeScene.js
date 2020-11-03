/* eslint-disable no-undef */
import 'phaser';
import config from '../Config/config';
import playerScoresModule from '../Config/storage';

export default class WelcomeScene extends Phaser.Scene {
  constructor() {
    super('Welcome');
  }

  preload() {
    localStorage.clear();
    this.load.image(
      'bluebuttonForWelcome1',
      '../../assets/ui/blue_button02.png'
    );
    this.load.image(
      'bluebuttonForWelcome2',
      '../../assets/ui/blue_button03.png'
    );
    this.welcomeCatImage = this.load.image(
      'welcomeCat',
      'assets/welcomecat.jpg'
    );
  }

  create() {
    const input = document.getElementById('uText');
    input.style.display = 'block';
    this.add.image(400, 200, 'welcomeCat');
    this.add.text(100, 350, 'Cat Name: ', {
      fontSize: '30px',
      fill: '#12B290',
    });

    this.gameButton = this.add
      .sprite(325, 425, 'bluebuttonForWelcome1')
      .setInteractive();

    this.gameText = this.add.text(0, 0, 'Play', {
      fontSize: '32px',
      fill: '#fff',
    });
    this.centerButtonText(this.gameText, this.gameButton);

    this.gameButton.on(
      'pointerdown',
      function (pointer) {
        const username = input.value;
        if (username !== '') {
          input.style.display = 'none';
          playerScoresModule.addPlayerName(username);
          this.scene.start('Boot');
        } else {
          this.add.text(150, 100, 'Please Enter Your Cat Name...', {
            fontSize: '30px',
            fill: 'red',
          });
        }
      }.bind(this)
    );

    this.input.on('pointerover', function (event, gameObjects) {
      gameObjects[0].setTexture('bluebuttonForWelcome2');
    });

    this.input.on('pointerout', function (event, gameObjects) {
      gameObjects[0].setTexture('bluebuttonForWelcome1');
    });
  }

  centerButtonText(gameText, gameButton) {
    Phaser.Display.Align.In.Center(gameText, gameButton);
  }

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(
        config.width / 2,
        config.height / 2 - offset * 100,
        config.width,
        config.height
      )
    );
  }
}
/* eslint-enable no-undef */
