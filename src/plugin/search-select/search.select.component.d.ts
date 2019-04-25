import { ChangeDetectorRef, ElementRef, EventEmitter, OnInit } from '@angular/core';
export declare class SearchSelectComponent implements OnInit {
    private changeDetectorRef;
    firstLoad: boolean;
    showDropFlag: boolean;
    keyword: string;
    disable: boolean;
    width: string;
    maxHeight: string;
    fieldKey: string;
    nameKey: string;
    currentValue: any;
    multiple: boolean;
    noSearch: boolean;
    required: boolean;
    noClear: boolean;
    /**
     * [{id,name,checked}]
     */
    _source: any;
    source: any;
    checkEvent: EventEmitter<{}>;
    dropList: ElementRef;
    selectContainer: ElementRef;
    checkOptions: any;
    constructor(changeDetectorRef: ChangeDetectorRef);
    ngOnInit(): void;
    onDocumentClick(ev: any): void;
    searchMe(ev: any): void;
    showCurrentTitle(): string;
    selectList(list: any, ev?: any): void;
    checkboxChangeEvent(ev: any): void;
    showDropList(ev: any): void;
    getCurrentVal(): any;
    filter(data: any, keyword: string): any;
    clearValue(ev: any): void;
    selectValue(item: any): void;
}
