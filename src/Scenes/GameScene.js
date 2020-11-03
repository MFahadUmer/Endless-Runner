/* eslint-disable no-undef, class-methods-use-this */
import 'phaser';
import config from '../Config/config';
import playerScoresModule from '../Config/storage';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {}

  addCoin() {
    this.coins = this.physics.add.sprite(
      Phaser.Math.Between(400, 800),
      400,
      'coins',
    );
    this.coins.setScale(0.5);
    this.anims.create({
      key: 'coins_anim',
      frames: this.anims.generateFrameNumbers('coins'),
      frameRate: 15,
      repeat: -1,
    });
    this.coins.play('coins_anim');
    this.physics.add.collider(this.coins, this.ground);
  }

  collectCoin() {
    this.coins.disableBody(true, true);
    this.updateScores(50);
    this.addCoin();
  }

  create() {
    this.gameEndVar = false;
    this.scores = 0;
    this.background = this.add.tileSprite(
      0,
      0,
      config.width,
      config.height,
      'background',
    );
    this.background.setOrigin(0, 0);
    this.player = this.physics.add.sprite(40, 350, 'cat');
    this.player.setScale(0.3);
    this.player.setCollideWorldBounds(true);
    this.anims.create({
      key: 'cat_walk',
      frames: this.anims.generateFrameNumbers('cat'),
      frameRate: 15,
      repeat: -1,
    });
    this.fire = this.physics.add.sprite(800, 478, 'fire');
    this.fire.setScale(0.5);
    this.anims.create({
      key: 'fire_anim',
      frames: this.anims.generateFrameNumbers('fire'),
      frameRate: 15,
      repeat: -1,
    });
    const mainGround = this.add.tileSprite(
      400,
      550,
      config.width,
      100,
      'platform',
    );
    this.ground = this.physics.add.existing(mainGround, true);
    this.scoresText = this.add.text(16, 16, 'score: 0', {
      fontSize: '32px',
      fill: '#FFF',
    });
    this.jumpCount = 0;
    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.fire, this.ground);
    this.player.play('cat_walk');
    this.fire.play('fire_anim');
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.player, this.fire);
    this.addCoin();
    this.physics.add.collider(this.coins, this.ground);
    this.firePass = 0;
    this.fire2 = this.physics.add.sprite(810, 478, 'fire');
    this.fire2.setScale(0.5);
    this.fire2.play('fire_anim');
    this.physics.add.collider(this.fire2, this.ground);
  }

  resetJumpCount() {
    this.jumpCount = 0;
  }

  updateScores(value) {
    this.scores += value;
    this.scoresText.setText(`score: ${this.scores}`);
  }

  update() {
    if (this.gameEndVar) {
      playerScoresModule.addScores(this.scores);
      this.scene.start('GameEnd');
    }
    this.background.tilePositionX += 0.5;
    this.fire.x -= 3;
    if (this.fire.x < 0) {
      this.fire.x = 800;
      this.updateScores(10);
      this.firePass += 1;
    }
    if (this.fire2.x < 0) {
      this.fire2.x = 800;
      this.updateScores(10);
    }

    if (this.coins.x < 0) {
      this.coins.disableBody(true, true);
      this.addCoin();
    }

    this.coins.x -= 2;

    this.ground.tilePositionX += 3;
    this.physics.add.overlap(
      this.player,
      this.coins,
      this.collectCoin,
      null,
      this,
    );
    this.physics.add.overlap(this.player, this.fire, this.gameEnd, null, this);
    this.physics.add.overlap(this.player, this.fire2, this.gameEnd, null, this);
    if (this.firePass > 5) {
      this.background.tilePositionX += 0.8;
      this.ground.tilePositionX += 4;
      this.fire.x -= 4;
      this.fire2.x -= 4;
    } else if (this.firePass > 15) {
      this.background.tilePositionX += 1;
      this.ground.tilePositionX += 5;
      this.fire.x -= 5;
    }
    this.jump();
  }

  gameEnd() {
    this.gameEndVar = true;
  }

  jump() {
    const isJumpDown = Phaser.Input.Keyboard.JustDown(this.cursorKeys.space);
    if (isJumpDown && (this.player.body.touching.down || this.jumpCount < 1)) {
      this.jumpCount += 1;
      this.player.setVelocityY(-200);
    }
    if (this.player.body.touching.down) {
      this.resetJumpCount();
    }
  }
}
/* eslint-enable no-undef, class-methods-use-this */
