import { OnInit, EventEmitter } from '@angular/core';
import { RadioDataClass, RadioOptionsClass } from '../../app/demo/demo-radio/radio.type';
export declare class RadioComponent implements OnInit {
    constructor();
    options: RadioOptionsClass;
    _radioData: Array<RadioDataClass>;
    radioData: RadioDataClass[];
    _defaultData: any;
    defaultData: any;
    checked: EventEmitter<any>;
    ngOnInit(): void;
    initCheck(): void;
    changeChecked(ev: any): void;
    checkedRadio(data: RadioDataClass): void;
    clearChecked(): void;
    getCheckedRadio(): RadioDataClass;
}
