/* eslint-disable no-undef, import/no-unresolved */
import 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('logo', 'assets/studioLogo.png');
  }

  create() {
    this.scene.start('Preloader');
  }
}
/* eslint-enable no-undef, import/no-unresolved */
