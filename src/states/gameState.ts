import { Actor } from '../actor';
import { ActorType } from '../actorType';
import { Gbl } from '../gbl';
import { MatchColor } from '../matchColor';
import { Snake } from '../snake';

export class GameState extends Phaser.State {

  public actorGroup:Phaser.Group;

  private _gridWidth:number = 15;
  private _gridHeight:number = 24;

  private _moveDelay:number = 350;
  private _moveTimer:number = 0;

  private _fallDelay:number = 30;
  private _fallTimer:number = 0;

  private _newDirection:Phaser.Point;

  private _currentSnake:Snake;

  private _grid:MatchColor[][];

  private _targets:Actor[];
  private _deadSnakes:Snake[];

  private _nrOfTargets:number = 8;
  private _minSnakeLength:number = 2;
  private _maxSnakeLength:number = 5;

  private _startPos:Phaser.Point = new Phaser.Point(7, 0);

  private _handelingMatches:boolean = false;
  private _movingSnakes:boolean = false;

  private _gameOver:boolean = false;

  public create ():void {
    Gbl.init(this._gridWidth, this._gridHeight,
      new Phaser.Point(this.game.world.centerX, this.game.world.centerY));
    
    const background:Phaser.Sprite = this.game.add.sprite(
      this.game.world.centerX, this.game.world.centerY, 'grid');
    background.anchor.set(0.5);

    this.actorGroup = this.add.group();
    for (let i:number = 0; i < 300; i++) {
      const actor:Actor = new Actor(this.game, 'sprites');
      this.actorGroup.add(actor);
      actor.kill();
    }

    const border:Phaser.Sprite = this.game.add.sprite(
      this.game.world.centerX, this.game.world.centerY, 'border');
    border.anchor.set(0.5);

    this._grid = [];
    for (let y:number = 0; y < this._gridHeight; y++) {
      const row:MatchColor[] = [];
      for (let x:number = 0; x < this._gridWidth; x++) {
        row.push(MatchColor.NONE);
      }
      this._grid.push(row);
    }

    this._deadSnakes = [];
    this._setTargets(this._nrOfTargets);

    this._newDirection = new Phaser.Point(0, 1);

    this._createSnake();

  } // create

  public update ():void {
    if (this._gameOver) {
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        // load menu here
      }
      return;
    }
    if (this._movingSnakes) {
      if (this._fallTimer < this._fallDelay) {
        this._fallTimer += this.game.time.elapsed;
      } else {
        this._fallTimer = 0;
        this._moveSnakesDown();
      }
    }
    if (this._handelingMatches) {
      return;
    }

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
      let nextPos:Phaser.Point;
      if (this._currentSnake.validDirection(this._newDirection)) {
        nextPos = Phaser.Point.add(this._currentSnake.body[0].gridPosition, this._newDirection);
      } else {
        nextPos = Phaser.Point.add(this._currentSnake.body[0].gridPosition, this._currentSnake.currentDirection);
      }
      
      if (!this._hitBounds(nextPos.x, nextPos.y) && this._positionFree(nextPos.x, nextPos.y) &&
        !this._currentSnake.hit(nextPos.x, nextPos.y)) {

        this._currentSnake.updateSnake(this._newDirection);
      } else {
        for (const part of this._currentSnake.body) {
          if (part.gridPosition.y < 0) {
            this._gameOver = true;
          }
        }
        this._deadSnakes.push(this._currentSnake);
        this._currentSnake = null;
        this._handelingMatches = true;
        this._movingSnakes = true;
        this._fallTimer = 0;
      }
    }
  } // update

  public render ():void {
    this.game.debug.text(this.time.fps.toString() || '--', 2, 14, '#00ff00');

  } // render

  private _createSnake ():void {
    if (this._grid[this._startPos.y][this._startPos.x] !== MatchColor.NONE) {
      this._gameOver = true;
    }
    this._moveTimer = 0;
    this._newDirection.set(0, 1);
    this._currentSnake = new Snake(this, this._startPos.x, this._startPos.y,
      this.rnd.between(this._minSnakeLength, this._maxSnakeLength));
  }

  private _clearGrid ():void {
    for (let y:number = 0; y < this._gridHeight; y++) {
      for (let x:number = 0; x < this._gridWidth; x++) {
        this._grid[y][x] = MatchColor.NONE;
      }
    }

  } // _clearGrid

  private _hitBounds (x:number, y:number):boolean {
    return x < 0 || x >= this._gridWidth || y < 0 || y >= this._gridHeight;

  } // _hitBounds

  private _positionFree (x:number, y:number):boolean {
    return this._grid[y][x] === MatchColor.NONE;

  } // _positionFree

  private _setTargets (nrOfTargets:number):void {
    this._targets = [];
    for (let i:number = 0; i < nrOfTargets; i++) {
      let foundPos:boolean = false;
      let rndX:number;
      let rndY:number;
      while (!foundPos) {
        rndX = this.rnd.between(0, this._gridWidth - 1);
        rndY = this.rnd.between(7, this._gridHeight - 1);
        if (this._grid[rndY][rndX] === MatchColor.NONE) {
          foundPos = true;
          const color:MatchColor = this.rnd.between(0, 3);
          const target:Actor = this.actorGroup.getFirstExists(false);
          target.reset(0, 0);
          target.init(rndX, rndY, color, ActorType.TARGET, 'target');
          this._grid[rndY][rndX] = color;
          this._targets.push(target);
        }
      }
    }

  } // _setTargets

  private _moveSnakesDown ():void {
    let foundSnakeToMove:boolean = false;
    for (const snake of this._deadSnakes) {
      const body:Actor[] = snake.body;
      const lowPositions:Phaser.Point[] = [];
      for (const part of body) {
        const x:number = part.gridPosition.x;
        const y:number = part.gridPosition.y + 1;
        if (!snake.hit(x, y)) {
          lowPositions.push(new Phaser.Point(x, y));
        }
      }

      let canMove:boolean = true;
      for (const pos of lowPositions) {
        if (pos.y >= this._gridHeight || this._grid[pos.y][pos.x] !== MatchColor.NONE) {
          canMove = false;
          break;
        }
      }

      if (canMove) {
        for (const part of body) {
          const pos:Phaser.Point = part.gridPosition;
          this._grid[pos.y][pos.x] = MatchColor.NONE;
        }
        snake.moveDown();
        foundSnakeToMove = true;
      }
      for (const part of body) {
        const pos:Phaser.Point = part.gridPosition;
        this._grid[pos.y][pos.x] = part.color;
      }
    }

    if (!foundSnakeToMove) {
      if (this._getMatches()) {
        this._moveSnakesDown();
      } else {
        this._handelingMatches = false;
        this._movingSnakes = false;
        this._createSnake();
      }
    }
  }

  private _getMatches ():boolean {
    let colorPositions:Phaser.Point[] = [];
    let currentColor:MatchColor;
    const positionsMatched:Phaser.Point[] = [];

    for (let y:number = 0; y < this._gridHeight; y++) {
      colorPositions = [new Phaser.Point(0, y)];
      currentColor = this._grid[y][0];
      for (let x:number = 1; x < this._gridWidth; x++) {
        const color:MatchColor = this._grid[y][x];
        if (color === MatchColor.NONE || color !== currentColor) {
          if (colorPositions.length >= 4) {
            for (const c of colorPositions) {
              positionsMatched.push(new Phaser.Point(c.x, c.y));
            }
          }
          colorPositions = [new Phaser.Point(x, y)];
          currentColor = color;
        } else if (x === this._gridWidth - 1) {
          colorPositions.push(new Phaser.Point(x, y));
          if (colorPositions.length >= 4) {
            for (const c of colorPositions) {
              positionsMatched.push(new Phaser.Point(c.x, c.y));
            }
          }
        } else {
          colorPositions.push(new Phaser.Point(x, y));
        }
      }
    }

    for (let x:number = 0; x < this._gridWidth; x++) {
      colorPositions = [new Phaser.Point(x, 0)];
      currentColor = this._grid[0][x];
      for (let y:number = 1; y < this._gridHeight; y++) {
        const color:MatchColor = this._grid[y][x];
        if (color === MatchColor.NONE || color !== currentColor) {
          if (colorPositions.length >= 4) {
            for (const c of colorPositions) {
              positionsMatched.push(new Phaser.Point(c.x, c.y));
            }
          }
          colorPositions = [new Phaser.Point(x, y)];
          currentColor = color;
        } else if (y === this._gridHeight - 1) {
          colorPositions.push(new Phaser.Point(x, y));
          if (colorPositions.length >= 4) {
            for (const c of colorPositions) {
              positionsMatched.push(new Phaser.Point(c.x, c.y));
            }
          }
        } else {
          colorPositions.push(new Phaser.Point(x, y));
        }
      }
    }

    this._removeMatches(positionsMatched);

    return positionsMatched.length > 0;

  } // _handleMatches

  private _removeMatches (positionsMatched:Phaser.Point[]):void {
    for (const pos of positionsMatched) {
      let hitTarget:boolean = false;
      for (const target of this._targets) {
        if (pos.equals(target.gridPosition)) {
          hitTarget = true;
          target.kill();
          this._targets.splice(this._targets.indexOf(target), 1);
          this._grid[pos.y][pos.x] = MatchColor.NONE;
          break;
        }
      }

      if (!hitTarget) {
        for (const snake of this._deadSnakes) {
          for (const part of snake.body) {
            if (part) {
              if (pos.equals(part.gridPosition)) {
                part.kill();
                this._grid[pos.y][pos.x] = MatchColor.NONE;
                break;
              }
            }
            
          }
        }
      }
    }

    const newSnakes:Actor[][] = [];
    for (const snake of this._deadSnakes) {
      let parts:Actor[] = [];
      for (let i:number = 0; i < snake.body.length; i++) {
        const part:Actor = snake.body[i];
        if (!part.alive) {
          if (parts.length > 0) {
            newSnakes.push(parts);
            parts = [];
          }
        } else if (i === snake.body.length - 1) {
          parts.push(part);
          newSnakes.push(parts);
        } else {
          parts.push(part);
        }
      }
    }
    this._deadSnakes = [];
    for (const newSnake of newSnakes) {
      const snake:Snake = new Snake(this, 0, 0, 0, newSnake);
      this._deadSnakes.push(snake);
    }
  }

} // GameState
