import { AfterViewInit, ElementRef, EventEmitter, OnInit } from '@angular/core';
export declare class ListShowComponent implements OnInit, AfterViewInit {
    _data: Array<any>;
    data: any[];
    itemWidth: number;
    showKey: string;
    idKey: string;
    canDelete: boolean;
    listActionFlag: boolean;
    removeItemEmit: EventEmitter<any>;
    listBox: ElementRef;
    listBoxP: ElementRef;
    hoverMoveTimer: any;
    resizeEvent: any;
    constructor();
    ngOnInit(): void;
    ngAfterViewInit(): void;
    removeItemEvent(item: any, index: number, ev: any): void;
    removeItems(items: Array<any>): void;
    removeItem(item: any, unRecount?: boolean): void;
    addItem(item: any, unRecount?: boolean): void;
    addItems(items: Array<any>): void;
    getData(): any[];
    isResetPostion(): boolean;
    showLastItem(): boolean;
    calcIsShowAction(): boolean;
    listActionHout(): void;
    listActionHover(offset: string): void;
    listActionDown(offset: string): void;
    listActionUp(offset: string): void;
    listUlMove(offset: string, step: number): void;
}
