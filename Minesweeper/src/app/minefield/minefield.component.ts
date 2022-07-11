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

  gameActive: boolean;
  gameInteractive: boolean;

  startTime: Date;

  uncoveredTiles: number;
  flaggedTiles: number;

  minesMap: Array<Array<boolean>>;
  minesAround: Array<Array<number>>;
  flagsMap: Array<Array<number>>;
  uncoveredMap: Array<Array<boolean>>;
  specialHighlightMap: Array<Array<boolean>>;
  bordersMap: Array<Array<number>>

  constructor() { 
    this.width = 0;
    this.height = 0;
    this.mines = 0;

    this.gameActive = false;
    this.gameInteractive = true;

    this.startTime = new Date();

    this.uncoveredTiles = 0;
    this.flaggedTiles = 0;

    this.minesMap = new Array<Array<boolean>>();
    this.minesAround = new Array<Array<number>>();
    this.flagsMap = new Array<Array<number>>();
    this.uncoveredMap = new Array<Array<boolean>>();
    this.specialHighlightMap = new Array<Array<boolean>>();
    this.bordersMap = new Array<Array<number>>();
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

      this.gameActive = true;
      this.gameInteractive = true;

      this.placeMines();
      this.countMines();

      this.uncoveredTiles = 0;
      this.flaggedTiles = 0;

      this.flagsMap = new Array<Array<number>>(this.height);
      for (let i = 0; i < this.height; ++i)
        this.flagsMap[i] = new Array<number>(this.width).fill(0);

      this.uncoveredMap = new Array<Array<boolean>>(this.height);
      for (let i = 0; i < this.height; ++i)
        this.uncoveredMap[i] = new Array<boolean>(this.width).fill(false);

      this.specialHighlightMap = new Array<Array<boolean>>(this.height);
      for (let i = 0; i < this.height; ++i)
        this.specialHighlightMap[i] = new Array<boolean>(this.width).fill(false);

      this.bordersMap = new Array<Array<number>>(this.height);

      for (let i = 0; i < this.height; ++i)
      {
        this.bordersMap[i] = new Array<number>(this.width);
        for (let j = 0; j < this.width; ++j)
        {
          let borders = 0;
          if (j == 0)
            borders |= 1;
          if (i == 0)
            borders |= 2;
          if (j == this.width - 1)
            borders |= 4;
          if (i == this.height - 1)
            borders |= 8;
          this.bordersMap[i][j] = borders;
        }
      }

      this.startTime = new Date();
  }

  uncoverDeleteFlag(vertical : number, horizontal : number) : void
  {
    if (this.uncoveredMap[vertical][horizontal])
      return;
    if (this.flagsMap[vertical][horizontal] == 1)
      this.flaggedTiles -= 1;
    this.flagsMap[vertical][horizontal] = 0;
    this.uncoveredMap[vertical][horizontal] = true;
    this.uncoveredTiles += 1;
    if (this.minesAround[vertical][horizontal] == 0)
      this.uncoverAround(vertical, horizontal);
  }

  uncoverAround(vertical : number, horizontal : number)
  {
    if (vertical != 0 && horizontal != 0)
      this.uncoverDeleteFlag(vertical - 1, horizontal - 1);
    if (vertical != 0)
      this.uncoverDeleteFlag(vertical - 1, horizontal);
    if (vertical != 0 && horizontal != this.width - 1)
      this.uncoverDeleteFlag(vertical - 1, horizontal + 1);
    if (horizontal != 0)
      this.uncoverDeleteFlag(vertical, horizontal - 1);
    if (horizontal != this.width - 1)
      this.uncoverDeleteFlag(vertical, horizontal + 1);
    if (vertical != this.height - 1 && horizontal != 0)
      this.uncoverDeleteFlag(vertical + 1, horizontal - 1);
    if (vertical != this.height - 1)
      this.uncoverDeleteFlag(vertical + 1, horizontal);
    if (vertical != this.height - 1 && horizontal != this.width - 1)
      this.uncoverDeleteFlag(vertical + 1, horizontal + 1);
  }

  gameWon() : void
  {
    this.gameInteractive = false;
    alert("Congratulations! You have swept the mines. Your time: " + (new Date().valueOf() - this.startTime.valueOf()) / 1000 + " seconds");
  }

  handleUncover(coordinates: string) : void
  {
      let coordinatesArr = coordinates.split(" ");
      let vertical = parseInt(coordinatesArr[0]);
      let horizontal = parseInt(coordinatesArr[1]);
      this.uncoveredMap[vertical][horizontal] = true;
      this.uncoveredTiles += 1;
      if (this.minesAround[vertical][horizontal] == 0)
        this.uncoverAround(vertical, horizontal);
      if (this.uncoveredTiles == this.width * this.height - this.mines)
        this.gameWon();
  }

  handleFlag(coordinates: string) : void
  {
      let coordinatesArr = coordinates.split(" ");
      let vertical = parseInt(coordinatesArr[0]);
      let horizontal = parseInt(coordinatesArr[1]);
      this.flagsMap[vertical][horizontal] = (this.flagsMap[vertical][horizontal] + 1) % 3;
      if (this.flagsMap[vertical][horizontal] == 1)
        this.flaggedTiles += 1;
      if (this.flagsMap[vertical][horizontal] == 2)
        this.flaggedTiles -= 1;
  }

  handleLoss(coordinates: string) : void
  {
    this.gameInteractive = false;
    let coordinatesArr = coordinates.split(" ");
    let vertical = parseInt(coordinatesArr[0]);
    let horizontal = parseInt(coordinatesArr[1]);
    this.specialHighlightMap[vertical][horizontal] = true;
    alert("Mines are victorious!");
  }

  ngOnInit(): void {
  }

}
