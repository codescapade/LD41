
export class Gbl {
  public static readonly TILESIZE:number = 24;
  
  public static currentLevel:number = 1;
  public static currentDelay:number = 380;
  public static currentTargets:number = 8;

  public static gridWidth:number;
  public static gridHeight:number;

  public static muted:boolean = false;

  private static _minX:number;
  private static _minY:number;

  private static _minDelay:number = 140;
  private static _delayStep:number = 20;

  private static _maxTargets:number = 120;
  private static _minTargetStep:number = 5;
  private static _maxTargetStep:number = 8;

  public static init (gridWidth:number, gridHeight:number, center:Phaser.Point):void {
    Gbl.gridWidth = gridWidth;
    Gbl.gridHeight = gridHeight;

    Gbl._minX = center.x - gridWidth * Gbl.TILESIZE * 0.5 + Gbl.TILESIZE * 0.5;
    Gbl._minY = center.y - gridHeight * Gbl.TILESIZE * 0.5 + Gbl.TILESIZE * 0.5;

  } // init

  public static gridToWorld (x:number, y:number):Phaser.Point {
    return new Phaser.Point(Gbl._minX + x * Gbl.TILESIZE, Gbl._minY + y * Gbl.TILESIZE);

  } // gridToWorld

  public static worldToGrid (x:number, y:number):Phaser.Point {
    return new Phaser.Point(Math.floor((x - Gbl._minX) / Gbl.TILESIZE), Math.floor((y - Gbl._minY) / Gbl.TILESIZE));

  } // worldToGrid

  public static nextLevel ():void {
    Gbl.currentLevel++;
    if (Gbl.currentDelay > Gbl._minDelay) {
      Gbl.currentDelay -= Gbl._delayStep;
    }
    if (Gbl.currentTargets < Gbl._maxTargets) {
      Gbl.currentTargets += Math.floor(Math.random() * (Gbl._maxTargetStep - Gbl._minTargetStep) + Gbl._minTargetStep);
      if (Gbl.currentTargets > Gbl._maxTargets) {
        Gbl.currentTargets = Gbl._maxTargets;
      }
    }

  } // nextLevel

} // Gbl
