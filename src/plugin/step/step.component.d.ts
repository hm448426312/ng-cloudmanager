import { AfterViewInit, ElementRef, OnDestroy, OnInit } from '@angular/core';
export declare class StepComponent implements OnInit, AfterViewInit, OnDestroy {
    stepUl: ElementRef;
    stepUlP: ElementRef;
    stepData: Array<any>;
    showKey: string;
    idKey: string;
    currentData: any;
    newStep: boolean;
    currentIndex: number;
    showActionFlag: boolean;
    resizeEvent: any;
    hoverMoveTimer: any;
    itemWidth: number;
    constructor();
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngAfterViewInit(): void;
    showActionItem(): void;
    calcIsShowStepAction(): boolean;
    findCurrentIndex(): void;
    stepActionHout(): void;
    stepActionHover(offset: string): void;
    stepActionDown(offset: string): void;
    stepActionUp(offset: string): void;
    stepUlMove(offset: string, step: number): void;
}
