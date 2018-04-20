
export class GameState extends Phaser.State {

  public create ():void {

  } // create

  public update ():void {
    
  }

  public render ():void {
    this.game.debug.text(this.time.fps.toString() || '--', 2, 14, '#00ff00');
  }

} // GameState