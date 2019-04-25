import { OnInit, ElementRef, Renderer } from '@angular/core';
export declare class WrapEllipsisComponent implements OnInit {
    private elm;
    private renderer;
    surplusContent: string;
    overContent: string;
    hasOverSurplusContent: boolean;
    hasOverContent: boolean;
    fontNum: number;
    originData: any;
    container: any;
    style: any;
    _weContent: string;
    reg: RegExp;
    wrapper: ElementRef;
    weWidth: string;
    weHeight: string;
    weFontSize: string;
    weLineHeight: string;
    weContent: string;
    constructor(elm: ElementRef, renderer: Renderer);
    ngOnInit(): void;
    setContent(): void;
    getContent(dom: any): void;
    getSurplusContent(dom: any): void;
    getMaxHeight(): number;
}
