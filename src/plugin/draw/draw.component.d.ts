import { OnChanges, OnInit, DoCheck, OnDestroy, SimpleChanges, ComponentFactoryResolver, ViewContainerRef, ElementRef, Injector, ApplicationRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
export interface CanDraw {
    beforeLeave(): boolean | Promise<boolean>;
    beforeClose(): void;
}
export declare class DrawComponent implements OnChanges, OnInit, DoCheck, OnDestroy, AfterViewInit {
    private router;
    private resolver;
    private elementRef;
    private injector;
    private applicationRef;
    instance: any;
    show: any;
    injectComponet: any;
    data: any;
    handler: any;
    padding: any;
    title: string;
    iconCls: any;
    width: any;
    mark: boolean;
    hiddenScroll: boolean;
    top: string;
    componentRef: any;
    beforeLeave: any;
    firstInit: any;
    closeResolve: any;
    routerChangeEvent: any;
    container: ViewContainerRef;
    constructor(router: Router, resolver: ComponentFactoryResolver, elementRef: ElementRef, injector: Injector, applicationRef: ApplicationRef);
    onClick(event: any): void;
    calcHeight(): string;
    closeComponent(): void;
    getOverFlow(): "auto" | "hidden";
    onHidden(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngDoCheck(): void;
    isScrollY(): boolean;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
}
