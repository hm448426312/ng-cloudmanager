import { ComponentFactory, ComponentFactoryResolver, ApplicationRef, Injector } from '@angular/core';
export declare class TipService {
    private resolver;
    private applicationRef;
    private injector;
    node: HTMLElement;
    promise: Promise<{}>;
    ref: any;
    component: ComponentFactory<{}>;
    constructor(resolver: ComponentFactoryResolver, applicationRef: ApplicationRef, injector: Injector);
    show(data: any): void;
    private close();
}
