import { ElementRef, EventEmitter, OnInit } from '@angular/core';
export declare class CheckboxComponent implements OnInit {
    checkboxId: string;
    options: {
        key?: string;
        text?: string;
        disabled?: boolean;
        width?: string;
    };
    _checkModel: {
        checked: boolean;
    };
    checkModel: {
        checked: boolean;
    };
    labelInput: ElementRef;
    checkboxChangeEvent: EventEmitter<any>;
    constructor();
    ngOnInit(): void;
    checkModelChange(ev: any): void;
}
