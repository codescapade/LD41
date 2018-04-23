
export class PreloadState extends Phaser.State {

  public preload ():void {
    this.load.image('grid', 'assets/images/grid.png');
    this.load.image('border', 'assets/images/border.png');

    this.load.atlasJSONArray('sprites', 'assets/images/sprites.png', 'assets/images/sprites.json');

    this.load.audio('move', 'assets/sounds/move.mp3');
    this.load.audio('match', 'assets/sounds/match.mp3');
    this.load.audio('hit', 'assets/sounds/hit.mp3');
    
  } // preload

  public create ():void {
    this.state.start('menu');
    
  } // create

} // PreloadState
