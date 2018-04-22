
export class Gbl {
  public static readonly TILESIZE:number = 24;
  
  public static gridWidth:number;
  public static gridHeight:number;

  private static _minX:number;
  private static _minY:number;

  public static init (gridWidth:number, gridHeight:number, center:Phaser.Point):void {
    Gbl.gridWidth = gridWidth;
    Gbl.gridHeight = gridHeight;

    Gbl._minX = center.x - gridWidth * Gbl.TILESIZE * 0.5 + Gbl.TILESIZE * 0.5;
    Gbl._minY = center.y - gridHeight * Gbl.TILESIZE * 0.5 + Gbl.TILESIZE * 0.5;
  }

  public static gridToWorld (x:number, y:number):Phaser.Point {
    return new Phaser.Point(Gbl._minX + x * Gbl.TILESIZE, Gbl._minY + y * Gbl.TILESIZE);
  }

  public static worldToGrid (x:number, y:number):Phaser.Point {
    return new Phaser.Point(Math.floor((x - Gbl._minX) / Gbl.TILESIZE), Math.floor((y - Gbl._minY) / Gbl.TILESIZE));
  }
}
