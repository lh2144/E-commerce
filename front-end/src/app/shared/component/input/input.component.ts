import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import {
    ControlValueAccessor,
    FormControl,
    FormControlDirective,
    NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
    selector: 'my-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: InputComponent,
            multi: true,
        },
    ],
})
export class InputComponent implements OnInit, ControlValueAccessor {
    @Input() public control: FormControl;
    @Input() public name: string;
    @Input() public maxlength: number;
    @Input() public minlength: number;
    @Input() public min: number;
    @Input() public max: number;
    @Input() public model: string;
    @Input() public value: string;
    @Input() public type: string;
    @Input() public label: string;
    @Input() public labelClass: string;
    @Input() public inputClass: string;
    @Output() public modelChange: EventEmitter<string> = new EventEmitter<
        string
    >();
    @ViewChild(FormControlDirective, { static: true })
    public formDirective: FormControlDirective;
    private change: (value) => {};

    public constructor() {}

    public ngOnInit(): void {}
    public onChanges(value: Event): void {
        this.modelChange.emit(value.target['value']);
        if (this.type === 'radio') {
            this.change(this.value);
        }
    }

    public writeValue(value: any): void {
        this.formDirective.valueAccessor.writeValue(value);
    }
    public registerOnChange(fn: any): void {
        this.change = fn;
        this.formDirective.valueAccessor.registerOnChange(fn);
    }
    public registerOnTouched(fn: any): void {
        this.formDirective.valueAccessor.registerOnTouched(fn);
    }

    public setDisabledState?(isDisabled: boolean): void {
        this.formDirective.valueAccessor.setDisabledState(isDisabled);
    }

    public clickBehavior(e: any): void {
        if (this.type === 'radio') {
            // this.control.setValue(this.value);
            e.stopPropagation();
        }
    }
}
