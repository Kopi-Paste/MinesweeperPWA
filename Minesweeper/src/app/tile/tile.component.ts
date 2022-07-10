import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {

  // @Input() minesAround : number;

  @Output() messageEvent = new EventEmitter<string>();

  constructor() { }

  sendMessage()
  {
    this.messageEvent.emit("Hey");
  }

  ngOnInit(): void {
  }

}
