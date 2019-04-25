import { OnChanges, OnInit, DoCheck, OnDestroy, SimpleChanges, ComponentFactoryResolver, ElementRef, Injector, ApplicationRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
export interface CanDraw {
    beforeLeave(): boolean | Promise<boolean>;
    beforeClose(): void;
}
export declare class TipComponent implements OnChanges, OnInit, DoCheck, AfterViewInit, OnDestroy {
    private router;
    private resolver;
    private elementRef;
    private injector;
    private applicationRef;
    show: boolean;
    tipTop: string;
    message: string;
    title: string;
    data: any;
    type: string;
    closeResolve: any;
    constructor(router: Router, resolver: ComponentFactoryResolver, elementRef: ElementRef, injector: Injector, applicationRef: ApplicationRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngDoCheck(): void;
    ngAfterViewInit(): void;
    private closeComponent();
    ngOnChanges(changes: SimpleChanges): void;
}
