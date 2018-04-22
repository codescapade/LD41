import { Actor } from '../actor';
import { Gbl } from '../gbl';
import { MatchColor } from '../matchColor';
import { Snake } from '../snake';

export class GameState extends Phaser.State {

  private _gridWidth:number = 15;
  private _gridHeight:number = 24;

  private _moveDelay:number = 1000;
  private _moveTimer:number = 0;

  private _newDirection:Phaser.Point;

  private _currentSnake:Snake;

  public create ():void {
    Gbl.init(this._gridWidth, this._gridHeight,
      new Phaser.Point(this.game.world.centerX, this.game.world.centerY));

    const background:Phaser.Sprite = this.game.add.sprite(
      this.game.world.centerX, this.game.world.centerY, 'grid');
    background.anchor.set(0.5);

    this._newDirection = new Phaser.Point(0, 1);

    this._currentSnake = new Snake(this, 7, 5, 5);
  } // create

  public update ():void {
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      this._newDirection.set(-1, 0);
    } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      this._newDirection.set(1, 0);
    } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      this._newDirection.set(0, -1);
    } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      this._newDirection.set(0, 1);
    }
    if (this._moveTimer < this._moveDelay) {
      this._moveTimer += this.game.time.elapsed;
    } else {
      this._moveTimer = 0;
      // console.log('move snake here');
      this._currentSnake.updateSnake(this._newDirection);
    }
  } // update

  public render ():void {
    this.game.debug.text(this.time.fps.toString() || '--', 2, 14, '#00ff00');

  } // render

} // GameState
