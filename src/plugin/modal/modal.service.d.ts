import { ComponentFactoryResolver, ComponentFactory, Injector, ComponentRef, ViewRef, ApplicationRef } from '@angular/core';
import { ModalComponent } from './modal.component';
import { DocumentRef } from '../document-ref/document-ref.service';
import { DcModalOptions } from './modal.type';
export declare class ModalService {
    private cfr;
    private appRef;
    private doc;
    private injector;
    constructor(cfr: ComponentFactoryResolver, appRef: ApplicationRef, doc: DocumentRef, injector: Injector);
    insert(viewRef: ViewRef): ViewRef;
    createComponent<C>(cf: ComponentFactory<C>): ComponentRef<C>;
    open({id, title, component, width, data, handler, noHeaderShadow, iconCls, backdropCloseable, onClose, hideClose, hideTitle, beforeHidden}: DcModalOptions): {
        modalInstance: ModalComponent;
        modalContentInstance: any;
    };
}
