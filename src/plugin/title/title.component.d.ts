import { EventEmitter, OnInit } from '@angular/core';
export declare class TitleComponent implements OnInit {
    _titleDatas: any;
    titleDatas: any;
    titleOption: any;
    hasBottomLine: boolean;
    titleChangeEvent: EventEmitter<{}>;
    nowSelectTab: any;
    constructor();
    ngOnInit(): void;
    init(): void;
    selectTitle(tab: any): void;
    changeTab(tab: any): void;
}
