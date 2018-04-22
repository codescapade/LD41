import { ActorType } from './actorType';
import { Gbl } from './gbl';
import { MatchColor } from './matchColor';

export class Actor extends Phaser.Sprite {

  public gridPosition:Phaser.Point;

  public color:MatchColor;

  public actoryType:ActorType;

  private _sheet:string;

  constructor (game:Phaser.Game, sheet:string) {
    super(game, 0, 0);
    this._sheet = sheet;
    this.loadTexture(this._sheet);
    this.gridPosition = new Phaser.Point();
    this.anchor.set(0.5);
    game.add.existing(this);
  }

  public init (x:number, y:number, color:MatchColor, actorType:ActorType, sprite:string):void {
    this.updatePosition(x, y);
    this.color = color;
    this.actoryType = actorType;
    this.updateFrame(sprite);
  }

  public updatePosition (x:number, y:number):void {
    this.gridPosition.x = x;
    this.gridPosition.y = y;
    const worldPos:Phaser.Point = Gbl.gridToWorld(x, y);
    this.x = worldPos.x;
    this.y = worldPos.y;
  }

  public updateFrame (sprite:string):void {
    this.frameName = this._getColorString(sprite);
  }

  public _getColorString (name:string):string {
    let stringName:string = name;

    switch (this.color) {
      case MatchColor.BLUE:
        stringName += '_blue';
        break;

      case MatchColor.GREEN:
        stringName += '_green';
        break;

      case MatchColor.RED:
        stringName += '_red';
        break;

      case MatchColor.YELLOW:
        stringName += '_yellow';
        break;
    }

    return stringName;
  }

}
