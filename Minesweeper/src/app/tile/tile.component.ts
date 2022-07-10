import { ReturnStatement } from '@angular/compiler';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {

  @Input() mine : boolean

  @Input() minesAround : number


  uncovered : boolean;

  flagState : number;

  display : string;

  @Output() messageEvent = new EventEmitter<string>();

  constructor() {
    this.mine = false;
    this.minesAround = 0;
    this.uncovered = false;
    this.flagState = 0;
    this.display = "_";
   }

   updateDisplay()
   {
      if (this.uncovered)
        this.display = this.minesAround != 0 ? this.minesAround.toString() : "=";
      else
        switch (this.flagState)
        {
          case 0:
            this.display = "_";
            break;
          case 1:
            this.display = "F";
            break;
          case 2:
            this.display = "?";
            break;
        }
   }

  sendMessage()
  {
    this.messageEvent.emit("Hey");
  }

  handleLeftClick()
  {
    if (this.uncovered || this.flagState == 1)
      return;
    this.flagState = 0;
    this.uncovered = true;

    if (this.mine)
      alert("Lost");

    // if (this.minesAround == 0)

    this.updateDisplay();
  }

  handleRightClick(event : any)
  {
    event.preventDefault();
    if (this.uncovered)
      return;
    this.flagState = (this.flagState + 1) % 3;
    this.updateDisplay();
  }

  ngOnInit(): void {
  }

}
