import { Actor } from './actor';
import { ActorType } from './actorType';
import { MatchColor } from './matchColor';
import { GameState } from './states/gameState';

export class Snake {

  private _body:Actor[];

  private _currentDirection:Phaser.Point;

  private readonly ZERO:Phaser.Point = new Phaser.Point(0, 0);

  private _state:GameState;

  constructor (state:GameState, x:number, y:number, length:number) {
    this._state = state;
    this._body = [];
    this._currentDirection = new Phaser.Point(0, 1);
    
    for (let i:number = 0; i < length; i++) {
      const part:Actor = new Actor(state.game, 'sprites');
      const color:MatchColor = this._getRndColor();
      if (i === 0) {
        part.init(x, y - i, color, ActorType.HEAD, 'head_end');
        part.angle = 180;
      } else if (i === length - 1) {
        part.init(x, y - i, color, ActorType.BODY, 'body_end');
      } else {
        part.init(x, y - i, color, ActorType.BODY, 'body_middle');
      }
      this._body.push(part);
    }
  }

  public updateSnake (newDirection:Phaser.Point):void {
    if (this._validDirection(newDirection)) {
      this._currentDirection.set(newDirection.x, newDirection.y);
    }

    const oldPos:Phaser.Point = new Phaser.Point();
    const newPos:Phaser.Point = Phaser.Point.add(this._body[0].gridPosition, this._currentDirection);
    
    for (const part of this._body) {
      oldPos.x = part.gridPosition.x;
      oldPos.y = part.gridPosition.y;
      part.updatePosition(newPos.x, newPos.y);
      newPos.x = oldPos.x;
      newPos.y = oldPos.y;
    }
    this.updateSprites();
  }

  public updateSprites ():void {
    for (let i:number = 0; i < this._body.length; i++) {
      const part:Actor = this._body[i];
      this._setSprite(i, part);
    }
  }

  private _setSprite (index:number, part:Actor):void {
    const pos:Phaser.Point = this._body[index].gridPosition;
    let nextPos:Phaser.Point;
    let prevPos:Phaser.Point;
    if (index === 0) {
      if (this._body.length === 1) {
        if (part.actoryType === ActorType.HEAD) {
          part.updateFrame('head_single');
        } else {
          part.updateFrame('body_single');
        }
      } else {
        nextPos = this._body[index + 1].gridPosition;
        if (part.actoryType === ActorType.HEAD) {
          part.updateFrame('head_end');
        } else {
          part.updateFrame('body_end');
        }
        if (nextPos.x > pos.x) {
          part.angle = 270;
        } else if (nextPos.x < pos.x) {
          part.angle = 90;
        } else if (nextPos.y > pos.y) {
          part.angle = 0;
        } else if (nextPos.y < pos.y) {
          part.angle = 180;
        }
      }
    } else if (index === this._body.length - 1) {
      prevPos = this._body[index - 1].gridPosition;
      part.updateFrame('body_end');
      if (prevPos.x > pos.x) {
        part.angle = 270;
      } else if (prevPos.x < pos.x) {
        part.angle = 90;
      } else if (prevPos.y > pos.y) {
        part.angle = 0;
      } else if (prevPos.y < pos.y) {
        part.angle = 180;
      }
    } else {
      nextPos = this._body[index + 1].gridPosition;
      prevPos = this._body[index - 1].gridPosition;
      if (nextPos.x === prevPos.x) {
        part.updateFrame('body_middle');
        part.angle = 90;
      } else if (nextPos.y === prevPos.y) {
        part.updateFrame('body_middle');
        part.angle = 0;
      } else {
        part.updateFrame('body_corner');
        if ((nextPos.x === 1 && prevPos.y === 1) || (prevPos.x === 1 && nextPos.y === 1)) {
          part.angle = 270;
        } else if ((nextPos.x === -1 && prevPos.y === 1) || (prevPos.x === -1 && nextPos.y === 1)) {
          part.angle = 0;
        } else if ((nextPos.x === -1 && prevPos.y === -1) || (prevPos.x === -1 && nextPos.y === -1)) {
          part.angle = 90;
        } else if ((nextPos.x === 1 && prevPos.y === -1) || (prevPos.x === 1 && nextPos.y === -1)) {
          part.angle = 180;
        }
      }
    }
  }

  private _validDirection (direction:Phaser.Point):boolean {
    return !Phaser.Point.add(this._currentDirection, direction).equals(this.ZERO);
  }

  private _getRndColor ():MatchColor {
    const nr:number = this._state.rnd.between(0, 3);
    console.log(nr);
    return nr;
  }
}
