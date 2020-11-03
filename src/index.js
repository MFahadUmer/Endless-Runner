/* eslint-disable no-undef */
import 'phaser';
import config from './Config/config';
import GameScene from './Scenes/GameScene';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import OptionsScene from './Scenes/OptionsScene';
import CreditsScene from './Scenes/CreditsScene';
import Model from './Model';
import GameEndScene from './Scenes/GameEndScene';
import HighScoresScene from './Scenes/HighScoresScene';
import scoreApi from './Config/scoreStorageApi';
import WelcomeScene from './Scenes/WelcomeScene';
import './style.css';

console.log(scoreApi.getScores());
class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new Model();
    this.globals = { model, bgMusic: null };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', GameScene);
    this.scene.add('GameEnd', GameEndScene);
    this.scene.add('HighScores', HighScoresScene);
    this.scene.add('Welcome', WelcomeScene);
    this.scene.start('Welcome');
  }
}

window.game = new Game();
/* eslint-enable no-undef */
