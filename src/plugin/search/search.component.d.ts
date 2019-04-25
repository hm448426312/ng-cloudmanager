import { EventEmitter, OnInit } from '@angular/core';
export declare class SearchComponent implements OnInit {
    keyword: string;
    placeholder: string;
    width: string;
    realTime: boolean;
    search: EventEmitter<{}>;
    constructor();
    ngOnInit(): void;
    modelChange(): void;
    sendSearchResult(): void;
    setSearchText(text?: string): void;
    clearValue(dom: any): void;
}
