import { EventEmitter } from '@angular/core';
export declare class DatePickerComponent {
    defaultShow: boolean;
    _date: any;
    date: any;
    dateChangeEvent: EventEmitter<{}>;
    DatePicker: any;
    _options: any;
    options: any;
    constructor();
    setDate(ev: any): void;
    clearDate(): void;
}
