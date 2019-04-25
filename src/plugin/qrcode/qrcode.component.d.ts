import { OnInit, ElementRef, Renderer2 } from '@angular/core';
import { ModalService } from '../modal/modal.service';
export declare class QrcodeComponent implements OnInit {
    private el;
    private renderer;
    private modal;
    showImg: string;
    data: string;
    size: number;
    constructor(el: ElementRef, renderer: Renderer2, modal: ModalService);
    ngOnInit(): void;
    expandSize(): void;
}
