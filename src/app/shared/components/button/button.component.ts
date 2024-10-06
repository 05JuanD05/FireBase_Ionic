import { Component, Input } from '@angular/core';

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
  @Input() color: colorButtonType = "success";
  @Input() disable = false;

  constructor() { }

}
