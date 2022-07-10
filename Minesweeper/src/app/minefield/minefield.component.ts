import { Component, OnInit } from '@angular/core';
import { TileComponent } from '../tile/tile.component';

@Component({
  selector: 'app-minefield',
  templateUrl: './minefield.component.html',
  styleUrls: ['./minefield.component.css']
})
export class MinefieldComponent implements OnInit {


  tiles: Array<Array<string>>;


  constructor() { 
    this.tiles = new Array<Array<string>>();

  }

  generate(widthStr : string, heightStr : string, minesStr : string) : void
  {
      let width = parseInt(widthStr);
      let height = parseInt(heightStr);
      let mines = parseInt(minesStr);

      this.tiles = new Array<Array<string>>(height);
      this.tiles.fill(new Array<string>(width).fill("&"));
  }

  ngOnInit(): void {
  }

}
