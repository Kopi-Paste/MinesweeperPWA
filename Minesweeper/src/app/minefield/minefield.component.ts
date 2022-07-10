import { Component, OnInit } from '@angular/core';
import { TileComponent } from '../tile/tile.component';

@Component({
  selector: 'app-minefield',
  templateUrl: './minefield.component.html',
  styleUrls: ['./minefield.component.css']
})
export class MinefieldComponent implements OnInit {


  width: number;
  height: number;
  mines: number;


  minesMap: Array<Array<boolean>>;
  minesAround: Array<Array<number>>;


  constructor() { 
    this.width = 0;
    this.height = 0;
    this.mines = 0;


    this.minesMap = new Array<Array<boolean>>();
    this.minesAround = new Array<Array<number>>();
  }

  static generateRandomNumber(min : number, max : number) : number
  {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  placeMines() : void
  {
      this.minesMap = new Array<Array<boolean>>(this.height);
      for (let i = 0; i < this.height; ++i)
        this.minesMap[i] = new Array<boolean>(this.width).fill(false);

      let remainingTiles = this.width * this.height;
      let remainingMines = this.mines;

      for (let i = 0; i < this.height; ++i)
      {
        for (let j = 0; j < this.width; ++j)
        {
            if(MinefieldComponent.generateRandomNumber(0, remainingTiles--) < remainingMines)
            {
              --remainingMines;
              this.minesMap[i][j] = true;
            }
        }
      }
  }

  countMines() : void
  {
    this.minesAround = new Array<Array<number>>(this.height);
    for (let i = 0; i < this.height; ++i)
      this.minesAround[i] = new Array<number>(this.width);

    for (let i = 0; i < this.height; ++i)
    {
      for (let j = 0; j < this.width; ++j)
      {
        let sum = 0;
        if (i != 0 && j != 0 && this.minesMap[i-1][j-1])
          sum += 1;
        if (j != 0 && this.minesMap[i][j-1])
          sum += 1;
        if (i != this.height - 1 && j != 0 && this.minesMap[i+1][j-1])
          sum += 1;
        if (i != 0 && this.minesMap[i-1][j])
          sum += 1;
        if (i != this.height - 1 && this.minesMap[i+1][j])
          sum += 1;
        if (i != 0 && j != this.width - 1 && this.minesMap[i-1][j+1])
          sum += 1;
        if (j != this.width - 1 && this.minesMap[i][j+1])
          sum += 1;
        if (i != this.height - 1 && j != this.width - 1 && this.minesMap[i+1][j+1])
          sum += 1;

        this.minesAround[i][j] = sum;
      }
    }
  }

  generate(widthStr : string, heightStr : string, minesStr : string) : void
  {
      this.width = parseInt(widthStr);
      this.height = parseInt(heightStr);
      this.mines = parseInt(minesStr);


      this.placeMines();
      this.countMines();
  }

  ngOnInit(): void {
  }

}
