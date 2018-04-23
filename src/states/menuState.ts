import { Gbl } from '../gbl';

export class MenuState extends Phaser.State {

  public create ():void {
    const title:Phaser.Sprite = this.game.add.sprite(
      this.world.centerX, 100, 'sprites', 'title');
    title.anchor.set(0.5);

    const snake:Phaser.Sprite = this.game.add.sprite(
      this.world.centerX, this.world.centerY, 'sprites', 'title_snake');
    snake.anchor.set(0.5);

    const instruction:Phaser.Sprite = this.game.add.sprite(
      this.world.centerX, 420, 'sprites', 'space_to_start');
    instruction.anchor.set(0.5);

    const name:Phaser.Sprite = this.game.add.sprite(
      this.world.width - 20, 580, 'sprites', 'my_name');
    name.anchor.set(1);

  } // create

  public update ():void {
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      this._startGame();
    }

  } // update

  private _startGame ():void {
    Gbl.currentLevel = 1;
    Gbl.currentDelay = 375;
    Gbl.currentTargets = 120;
    this.state.start('game');

  } // _startGame

} // MenuState
