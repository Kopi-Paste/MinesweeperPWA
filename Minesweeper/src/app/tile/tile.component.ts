import { ReturnStatement } from '@angular/compiler';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit, OnChanges {

  static flag = "<i class='material-icons'>flag</i>"

  @Input() gameInteractive : boolean

  @Input() horizontal : number

  @Input() vertical : number

  @Input() mine : boolean

  @Input() minesAround : number

  @Input() uncovered : boolean;

  @Input() flagState : number;

  @Input() specialHighlight : boolean;

  @Input() borders : number;

  display : string;

  @Output() uncoverEvent = new EventEmitter<string>();

  @Output() flagEvent = new EventEmitter<string>();

  @Output() lossEvent = new EventEmitter<string>();

  constructor() {
    this.gameInteractive = true;
    this.horizontal = 0;
    this.vertical = 0;
    this.mine = false;
    this.minesAround = 0;
    this.uncovered = false;
    this.flagState = 0;
    this.specialHighlight = false;
    this.borders = 0;
    this.display = " ";
   }

   checkFlag(flag: number) : boolean
   {
      return (this.borders & flag) != 0;
   }

   updateDisplay()
   {
      if (this.uncovered)
        this.display = this.minesAround != 0 ? this.minesAround.toString() : " ";
      else
        switch (this.flagState)
        {
          case 0:
            this.display = " ";
            break;
          case 1:
            this.display = TileComponent.flag;
            break;
          case 2:
            this.display = "?";
            break;
        }
   }

  handleLeftClick()
  {
    if (this.uncovered || this.flagState == 1)
      return;

    if (this.mine)
      this.lossEvent.emit(this.vertical + " " + this.horizontal);
    else
      this.uncoverEvent.emit(this.vertical + " " + this.horizontal);
  }

  handleRightClick(event : any)
  {
    event.preventDefault();
    if (this.uncovered)
      return;
    this.flagEvent.emit(this.vertical + " " + this.horizontal);
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.updateDisplay();
  }

}
