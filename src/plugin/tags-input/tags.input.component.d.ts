import { ElementRef, OnInit } from '@angular/core';
import { DcTagsOptions } from './tags.option.type';
export declare class TagsInputComponent implements OnInit {
    dropList: any;
    showList: any;
    showDropFlag: boolean;
    inputValue: string;
    defaultNameKey: string;
    defaultCheckedKey: string;
    hideDropListTimer: any;
    options: DcTagsOptions;
    _tagDatas: any;
    tagDatas: any;
    tagsInput: ElementRef;
    constructor();
    ngOnInit(): void;
    tagsInputFocus(ev: any): void;
    tagInputChange(): void;
    removeTag(item: any, index: number): void;
    addTag(selectItem?: any): void;
    showDropList(ev: any): void;
    hideDropList(): void;
    onDocumentClick(ev: any): void;
    getCheckedTags(): any;
}
