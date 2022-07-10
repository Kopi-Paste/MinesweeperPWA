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

  generate(widthStr : string, heightStr : string, minesStr : string) : void
  {
      this.width = parseInt(widthStr);
      this.height = parseInt(heightStr);
      this.mines = parseInt(minesStr);


      this.placeMines();
  }

  ngOnInit(): void {
  }

}
