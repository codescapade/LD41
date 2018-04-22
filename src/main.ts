
import { BootState } from './states/bootState';
import { GameState } from './states/gameState';
import { PreloadState } from './states/preloadState';

class Main extends Phaser.Game {

  constructor () {
    super(800, 600, Phaser.AUTO, 'container');

    this.state.add('boot', BootState);
    this.state.add('preload', PreloadState);
    this.state.add('game', GameState);

    this.state.start('boot');
  
  } // constructor

} // Main

window.onload = () => {
  new Main();
};
