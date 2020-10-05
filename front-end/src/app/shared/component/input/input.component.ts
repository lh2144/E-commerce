import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormControlDirective, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'my-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: InputComponent, multi: true }
  ]
})
export class InputComponent implements OnInit, ControlValueAccessor {

  @Input() control: FormControl;
  @Input() name: string;
  @Input() maxlength: number;
  @Input() minlength: number;
  @Input() min: number;
  @Input() max: number;
  @Input() model: string;
  @Input() type: string;
  @Input() label: string;
  @Input() labelClass: string;
  @Input() inputClass: string;
  @Output() modelChange: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild(FormControlDirective, { static: true }) formDirective: FormControlDirective;

  public constructor() { }

  public ngOnInit(): void {
  }
  public onChanges(value: string): void {
    this.modelChange.emit(value);
  }

  public writeValue(value: any): void {
    this.formDirective.valueAccessor.writeValue(value);
  }
  public registerOnChange(fn: any): void {
    this.formDirective.valueAccessor.registerOnChange(fn);
  }
  public registerOnTouched(fn: any): void {
    this.formDirective.valueAccessor.registerOnTouched(fn);
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.formDirective.valueAccessor.setDisabledState(isDisabled);
  }

}
