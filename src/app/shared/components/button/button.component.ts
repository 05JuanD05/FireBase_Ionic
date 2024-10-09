import { Component, EventEmitter, Input, Output, output } from '@angular/core';

type colorButtonType = "success" | "danger" | "warning" | "secondary" | "primary";
type ButtonType = "button" | "submit";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {

  @Input({required: true}) value = "";
  @Input() type: ButtonType = "button";
  @Input() color: colorButtonType = "danger";
  @Input() disable = false;

  @Output() doClick = new EventEmitter<boolean>();

  constructor() { }


  click(){
    this.doClick.emit(true);
  }

}
