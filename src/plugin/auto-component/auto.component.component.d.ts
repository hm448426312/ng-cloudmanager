import { OnInit, EventEmitter, OnChanges, SimpleChanges, ComponentFactoryResolver, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { PinyinService } from '../pinyin.service';
export declare class AutoCompleteComponent implements OnInit, OnChanges {
    private resolver;
    private router;
    private pinyinService;
    firstLoad: boolean;
    autoInput: ElementRef;
    showContainer: boolean;
    required: boolean;
    _source: Array<any>;
    source: Array<any>;
    width: any;
    text: string;
    textChangeEvent: EventEmitter<{}>;
    preText: string;
    myIndex: number;
    show_source: Array<any>;
    blurTimer: any;
    constructor(resolver: ComponentFactoryResolver, router: Router, pinyinService: PinyinService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    changeSourceData(source: Array<any>): void;
    blur(): void;
    focus(): void;
    press(event: any): void;
    changeText(): void;
    selectText(t: any): void;
    clearValue(dom: any): void;
    setInputValid(valid?: boolean): void;
}