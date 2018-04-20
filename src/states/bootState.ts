
export class BootState extends Phaser.State {

  public preload ():void {
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.time.advancedTiming = true;

  } // preload

  public create ():void {
    this.state.start('preload');

  } // create

} // BootState