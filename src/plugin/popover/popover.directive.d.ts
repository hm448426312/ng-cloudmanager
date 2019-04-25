import { ElementRef } from '@angular/core';
export declare class PopoverDirective {
    private el;
    dcPopover: string;
    dcTitle: string;
    showDir: string;
    titleBox: any;
    constructor(el: ElementRef);
    onMouseEnter(): void;
    onMouseLeave(): void;
    showTitle(): void;
    hideTitle(): void;
}
