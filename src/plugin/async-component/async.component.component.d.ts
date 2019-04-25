import { OnInit, EventEmitter, ElementRef } from '@angular/core';
export declare class AsyncComponentComponent implements OnInit {
    firstLoad: boolean;
    asyncInput: ElementRef;
    showContainer: boolean;
    text: string;
    required: boolean;
    asyncTimer: any;
    hideTimer: any;
    options: {
        asyncFilter: any;
        asyncSpace?: number;
    };
    width: string;
    _source: Array<{
        title: string;
        index?: number;
    }>;
    source: Array<any>;
    selectItem: EventEmitter<{}>;
    constructor();
    ngOnInit(): void;
    hideDrop(): void;
    focus(): void;
    onDocumentClick(ev: any): void;
    selectText(ev: any, item: any): void;
    changeText(): void;
    clearValue(dom: any): void;
    setInputValid(valid?: boolean): void;
}
