import { Actor } from './actor';
import { ActorType } from './actorType';
import { MatchColor } from './matchColor';
import { GameState } from './states/gameState';

export class Snake {

  public body:Actor[];
  public alive:boolean = true;

  public currentDirection:Phaser.Point;

  private readonly ZERO:Phaser.Point = new Phaser.Point(0, 0);

  private _state:GameState;

  constructor (state:GameState, x:number, y:number, colors:MatchColor[], prevBody:Actor[] = null) {
    this._state = state;
    this.body = [];
    this.currentDirection = new Phaser.Point(0, 1);
    
    if (prevBody) {
      this.body = prevBody;
      this.updateSprites();
    } else {
      for (let i:number = 0; i < colors.length; i++) {
        const part:Actor = state.actorGroup.getFirstExists(false);
        part.reset(0, 0);
        const color:MatchColor = colors[i];
        if (i === 0) {
          part.init(x, y - i, color, ActorType.HEAD, 'head_end');
          part.angle = 180;
        } else if (i === length - 1) {
          part.init(x, y - i, color, ActorType.BODY, 'body_end');
        } else {
          part.init(x, y - i, color, ActorType.BODY, 'body_middle');
        }
        this.body.push(part);
      }
    }
    
  } // constructor

  public updateSnake (newDirection:Phaser.Point):void {
    if (this.validDirection(newDirection)) {
      this.currentDirection.set(newDirection.x, newDirection.y);
    }

    const oldPos:Phaser.Point = new Phaser.Point();
    const newPos:Phaser.Point = Phaser.Point.add(this.body[0].gridPosition, this.currentDirection);
    
    for (const part of this.body) {
      oldPos.x = part.gridPosition.x;
      oldPos.y = part.gridPosition.y;
      part.updatePosition(newPos.x, newPos.y);
      newPos.x = oldPos.x;
      newPos.y = oldPos.y;
    }
    this.updateSprites();

  } // updateSnake

  public hit (x:number, y:number):boolean {
    let hit:boolean = false;
    for (const part of this.body) {
      if (part.gridPosition.x === x && part.gridPosition.y === y) {
        hit = true;
      }
    }

    return hit;

  } // hit

  public updateSprites ():void {
    for (let i:number = 0; i < this.body.length; i++) {
      const part:Actor = this.body[i];
      this._setSprite(i, part);
    }

  } // updateSprites

  public moveDown ():void {
    for (const part of this.body) {
      part.updatePosition(part.gridPosition.x, part.gridPosition.y + 1);
    }

  } // moveDown

  public validDirection (direction:Phaser.Point):boolean {
    return !Phaser.Point.add(this.currentDirection, direction).equals(this.ZERO);

  } // _validDirection

  private _setSprite (index:number, part:Actor):void {
    const pos:Phaser.Point = this.body[index].gridPosition;
    let nextPos:Phaser.Point;
    let prevPos:Phaser.Point;
    if (index === 0) {
      if (this.body.length === 1) {
        if (part.actoryType === ActorType.HEAD) {
          part.updateFrame('head_single');
        } else {
          part.updateFrame('body_single');
        }
      } else {
        nextPos = this.body[index + 1].gridPosition;
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
    } else if (index === this.body.length - 1) {
      prevPos = this.body[index - 1].gridPosition;
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
      nextPos = this.body[index + 1].gridPosition;
      prevPos = this.body[index - 1].gridPosition;
      if (nextPos.x === prevPos.x || nextPos.y === prevPos.y) {
        part.updateFrame('body_middle');
        part.angle = 0;
      } else {
        part.updateFrame('body_corner');
        if ((pos.x - nextPos.x === 1 && pos.y - prevPos.y === 1) ||
          (pos.x - prevPos.x === 1 && pos.y - nextPos.y === 1)) {
          part.angle = 180;
        } else if ((pos.x - nextPos.x === -1 && pos.y - prevPos.y === 1) ||
          (pos.x - prevPos.x === -1 && pos.y - nextPos.y === 1)) {
          part.angle = 270;
        } else if ((pos.x - nextPos.x === -1 && pos.y - prevPos.y === -1) ||
          (pos.x - prevPos.x === -1 && pos.y - nextPos.y === -1)) {
          part.angle = 0;
        } else if ((pos.x - nextPos.x === 1 && pos.y - prevPos.y === -1) ||
          (pos.x - prevPos.x === 1 && pos.y - nextPos.y === -1)) {
          part.angle = 90;
        }
      }
    }

  } // _setSprite

  private _getRndColor ():MatchColor {
    const nr:number = this._state.rnd.between(0, 3);
    
    return nr;
  }

} // _getRndColor
