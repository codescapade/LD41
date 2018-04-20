
export class PreloadState extends Phaser.State {

  public preload ():void {

  } // preload

  public create ():void {
    this.state.start('game');

  } // create

} // PreloadState